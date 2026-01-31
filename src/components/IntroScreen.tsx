import { useState } from 'react';
import { useGameStore } from '../store/gameStore';

export function IntroScreen() {
  const [hovered, setHovered] = useState(false);
  const { startGame } = useGameStore();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      
      zIndex: 9999,
    }}>
      {/* Title */}
      <div style={{
        fontSize: 'clamp(32px, 8vw, 64px)',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
        background: 'linear-gradient(90deg, #4ecca3, #3498db)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'glow 2s ease-in-out infinite alternate',
      }}>
        Hero's Trial
      </div>

      {/* Subtitle */}
      <div style={{
        fontSize: 'clamp(14px, 3vw, 18px)',
        color: '#aaa',
        marginBottom: '80px',
        textAlign: 'center',
        maxWidth: '600px',
        padding: '0 20px',
      }}>
        Prove Your Worth
      </div>

      {/* Start Button */}
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={startGame}
        style={{
          padding: '16px 48px',
          fontSize: 'clamp(16px, 3.5vw, 20px)',
          
          fontWeight: 'bold',
          background: hovered ? '#4ecca3' : 'transparent',
          color: hovered ? '#0a0a0a' : '#4ecca3',
          border: '3px solid #4ecca3',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          boxShadow: hovered ? '0 0 20px rgba(78, 204, 163, 0.5)' : 'none',
        }}
      >
        시작
      </button>

      {/* Glowing animation */}
      <style>{`
        @keyframes glow {
          from {
            filter: drop-shadow(0 0 10px rgba(78, 204, 163, 0.5));
          }
          to {
            filter: drop-shadow(0 0 20px rgba(78, 204, 163, 0.8));
          }
        }
      `}</style>
    </div>
  );
}
