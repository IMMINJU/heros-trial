import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../store/gameStore';

export function VirtualJoystick() {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const baseRef = useRef<HTMLDivElement>(null);
  const touchIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Only activate on the left side of screen for joystick
      const touch = e.touches[0];
      if (touch.clientX < window.innerWidth / 2) {
        e.preventDefault();
        touchIdRef.current = touch.identifier;
        setIsActive(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isActive || touchIdRef.current === null) return;

      const touch = Array.from(e.touches).find(
        (t) => t.identifier === touchIdRef.current
      );
      if (!touch || !baseRef.current) return;

      e.preventDefault();

      const rect = baseRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = touch.clientX - centerX;
      const deltaY = touch.clientY - centerY;

      // Limit joystick movement to circle radius
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 50;

      let x = deltaX;
      let y = deltaY;

      if (distance > maxDistance) {
        x = (deltaX / distance) * maxDistance;
        y = (deltaY / distance) * maxDistance;
      }

      setPosition({ x, y });

      // Update player position based on joystick
      const { player, updatePlayer } = useGameStore.getState();
      const speed = player.speed;
      const normalizedX = x / maxDistance;
      const normalizedY = y / maxDistance;

      updatePlayer({
        x: player.x + normalizedX * speed,
        y: player.y + normalizedY * speed,
      });

      // Record activity
      useGameStore.getState().recordActivity();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touches = Array.from(e.changedTouches);
      if (touches.some((t) => t.identifier === touchIdRef.current)) {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
        touchIdRef.current = null;
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isActive]);

  // Only show on mobile/touch devices
  if (!('ontouchstart' in window)) {
    return null;
  }

  const { toggleInventory } = useGameStore();

  return (
    <>
      {/* Virtual Joystick */}
      <div
        ref={baseRef}
        style={{
          position: 'fixed',
          bottom: '80px',
          left: '30px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(78, 204, 163, 0.2)',
          border: '2px solid rgba(78, 204, 163, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          touchAction: 'none',
          opacity: isActive ? 1 : 0.6,
          transition: 'opacity 0.2s',
        }}
      >
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(78, 204, 163, 0.7)',
            border: '2px solid #4ecca3',
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isActive ? 'none' : 'transform 0.2s',
          }}
        />
      </div>

      {/* Inventory Button */}
      <button
        onClick={toggleInventory}
        onTouchStart={(e) => {
          e.currentTarget.style.transform = 'translate(2px, 2px)';
          e.currentTarget.style.boxShadow = '2px 2px 0 rgba(0, 0, 0, 0.5)';
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.transform = 'translate(0, 0)';
          e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0, 0, 0, 0.5)';
        }}
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '0',
          background: '#4ecca3',
          border: '3px solid #3ba682',
          boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.5)',
          color: '#000',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          cursor: 'pointer',
          fontWeight: 'bold',
          touchAction: 'manipulation',
          transition: 'transform 0.1s, box-shadow 0.1s',
        }}
      >
        I
      </button>
    </>
  );
}
