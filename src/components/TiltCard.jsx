import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * Hyper-responsive 3D Physics Tilt & Magnetic Card Component
 * Strictly interactive:
 * - Remains completely stationary and flat when untouched/unhovered.
 * - Moves and tilts in 3D in real time ONLY when the cursor touches/moves over it (desktop).
 * - Reacts dynamically to finger touch & drag interactions (phone/tablet).
 * - Smooth spring lerp physics with realistic perspective depth and specular glare.
 * - Smoothly returns to flat rest when the cursor or finger leaves.
 */
const TiltCard = ({
  children,
  className = '',
  maxTilt = 12,
  glare = true,
  scale = 1.025,
  perspective = 1000,
  idleFloat = false,
  onClick,
  style = {},
  ...props
}) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const innerRef = useRef(null);
  const rafId = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // Physics state
  const state = useRef({
    targetX: 0,
    targetY: 0,
    targetZ: 0,
    targetScale: 1,
    currentX: 0,
    currentY: 0,
    currentZ: 0,
    currentScale: 1,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    targetGlareOpacity: 0,
    currentGlareOpacity: 0,
    isHovered: false,
    bounds: null,
  });

  // Smooth animation loop using spring interpolation (lerp)
  const animate = useCallback(() => {
    const s = state.current;
    const card = cardRef.current;
    const glareEl = glareRef.current;
    const innerEl = innerRef.current;

    if (!card) return;

    if (!s.isHovered) {
      s.targetX = 0;
      s.targetY = 0;
      s.targetZ = 0;
      s.targetScale = 1;
      s.targetGlareOpacity = 0;
    }

    // Dynamic responsive lerp factor: snappier on entry, smooth on release
    const lerp = s.isHovered ? 0.16 : 0.1;
    s.currentX += (s.targetX - s.currentX) * lerp;
    s.currentY += (s.targetY - s.currentY) * lerp;
    s.currentZ += (s.targetZ - s.currentZ) * lerp;
    s.currentScale += (s.targetScale - s.currentScale) * lerp;
    s.currentGlareOpacity += (s.targetGlareOpacity - s.currentGlareOpacity) * lerp;

    // Check if close to zero at rest to snap cleanly
    if (!s.isHovered && Math.abs(s.currentX) < 0.01 && Math.abs(s.currentY) < 0.01 && Math.abs(s.currentZ) < 0.01) {
      s.currentX = 0;
      s.currentY = 0;
      s.currentZ = 0;
      s.currentScale = 1;
      s.currentGlareOpacity = 0;
    }

    // Calculate dynamic shadow displacement based on tilt
    const shadowX = (-s.currentY * 2).toFixed(1);
    const shadowY = (Math.abs(s.currentX) * 2.2 + 12).toFixed(1);
    const shadowBlur = (Math.abs(s.currentX) * 1.5 + Math.abs(s.currentY) * 1.5 + 30).toFixed(1);
    const glowAlpha = s.isHovered ? '0.35' : '0.08';

    // Apply 3D transform to card
    card.style.transform = `perspective(${perspective}px) rotateX(${s.currentX.toFixed(2)}deg) rotateY(${s.currentY.toFixed(2)}deg) translateZ(${s.currentZ.toFixed(1)}px) scale3d(${s.currentScale.toFixed(3)}, ${s.currentScale.toFixed(3)}, 1)`;
    card.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.85), 0 0 ${(Math.abs(s.currentX) + 15).toFixed(0)}px rgba(255, 215, 0, ${glowAlpha})`;

    // Apply specular glare overlay
    if (glareEl && glare) {
      glareEl.style.background = `radial-gradient(circle 260px at ${s.glareX.toFixed(1)}% ${s.glareY.toFixed(1)}%, rgba(255, 235, 150, 0.35), rgba(255, 215, 0, 0.12) 40%, transparent 75%)`;
      glareEl.style.opacity = `${s.currentGlareOpacity.toFixed(3)}`;
    }

    // Parallax lift for inner content
    if (innerEl) {
      const innerLift = s.isHovered ? 14 : 0;
      innerEl.style.transform = `translateZ(${innerLift}px)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, [glare, perspective]);

  // Start physics loop on mount
  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  // Position calculation helper for pointer & touch
  const handleMove = (clientX, clientY) => {
    const card = cardRef.current;
    if (!card) return;

    if (!state.current.bounds) {
      state.current.bounds = card.getBoundingClientRect();
    }
    const bounds = state.current.bounds;

    const x = clientX - bounds.left;
    const y = clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    // Normalised offset (-1 to +1)
    const normX = Math.max(-1, Math.min(1, (x - centerX) / centerX));
    const normY = Math.max(-1, Math.min(1, (y - centerY) / centerY));

    state.current.targetX = -normY * maxTilt;
    state.current.targetY = normX * maxTilt;
    state.current.targetZ = 16;
    state.current.targetScale = scale;
    state.current.glareX = (x / bounds.width) * 100;
    state.current.glareY = (y / bounds.height) * 100;
    state.current.targetGlareOpacity = 0.85;
    state.current.isHovered = true;
  };

  const handlePointerEnter = (e) => {
    const card = cardRef.current;
    if (card) state.current.bounds = card.getBoundingClientRect();
    state.current.isHovered = true;
    setIsInteracting(true);
    handleMove(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const handlePointerLeave = () => {
    state.current.bounds = null;
    state.current.isHovered = false;
    setIsInteracting(false);
    state.current.targetX = 0;
    state.current.targetY = 0;
    state.current.targetZ = 0;
    state.current.targetScale = 1;
    state.current.targetGlareOpacity = 0;
  };

  // Touch Handlers for mobile / tablet drag interaction
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      const card = cardRef.current;
      if (card) state.current.bounds = card.getBoundingClientRect();
      state.current.isHovered = true;
      setIsInteracting(true);
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    handlePointerLeave();
  };

  return (
    <div
      ref={cardRef}
      className={`glass-card-tilt ${isInteracting ? 'is-tilt-active' : ''} ${className}`}
      onClick={onClick}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{
        ...style,
        position: 'relative',
        transformStyle: 'preserve-3d',
        willChange: 'transform, box-shadow',
        touchAction: 'pan-y',
        WebkitTapHighlightColor: 'transparent',
      }}
      {...props}
    >
      {glare && (
        <div
          ref={glareRef}
          className="card-glare-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            opacity: 0,
            zIndex: 4,
            mixBlendMode: 'screen',
            transition: 'opacity 0.2s ease',
          }}
        />
      )}
      <div
        ref={innerRef}
        className="tilt-inner-content"
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
