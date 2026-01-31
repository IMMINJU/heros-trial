import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { getWarningMessage, getWarningInterval, getIdleMessage } from '../data/warnings';
import { soundManager } from '../utils/soundManager';

interface Warning {
  id: number;
  message: string;
  phase: number;
}

export function WarningBanner() {
  const { playTime, incrementWarningCount, narratorMessage, narratorQueue, clearNarratorMessage, setTimeWarningActive, lastActivityTime, queueNarratorMessage, gameEnded } = useGameStore();
  const [warnings, setWarnings] = useState<Warning[]>([]);
  const [lastWarningTime, setLastWarningTime] = useState(0);
  const [lastIdleCheck, setLastIdleCheck] = useState(0);

  useEffect(() => {
    // Don't show warnings if game has ended
    if (gameEnded) return;

    const interval = getWarningInterval(playTime);
    const timeSinceLastWarning = playTime - lastWarningTime;

    // Show time-based warnings at their scheduled time
    if (timeSinceLastWarning >= interval / 1000) {
      const message = getWarningMessage(playTime);
      const phase = playTime < 60 ? 1 : playTime < 180 ? 2 : 3;

      const newWarning: Warning = {
        id: Date.now(),
        message,
        phase,
      };

      setWarnings((prev) => [...prev, newWarning]);
      incrementWarningCount();
      setLastWarningTime(playTime);

      // Block interaction narrations while time warning is showing
      setTimeWarningActive(true);

      // Clear any existing narrator message and queue
      const state = useGameStore.getState();
      if (state.narratorMessage) {
        clearNarratorMessage();
      }
      // Clear the queue as well
      useGameStore.setState({ narratorQueue: [] });

      soundManager.playWarningSound(phase);

      setTimeout(() => {
        setWarnings((prev) => prev.filter((w) => w.id !== newWarning.id));
        // Re-enable interaction narrations after warning disappears
        setTimeWarningActive(false);
      }, 3000);
    }
  }, [playTime, lastWarningTime, incrementWarningCount, setTimeWarningActive, gameEnded]);

  // Handle narrator messages - display for 3 seconds, then clear
  useEffect(() => {
    if (narratorMessage) {
      const timer = setTimeout(() => {
        clearNarratorMessage();
      }, 3000); // 3 seconds display time

      return () => clearTimeout(timer);
    }
  }, [narratorMessage, clearNarratorMessage]);

  // Check for idle player (30 seconds of no activity)
  useEffect(() => {
    const idleDuration = playTime - lastActivityTime;

    // Check every 30 seconds, only if not showing warnings and player has been idle
    if (idleDuration >= 30 && playTime - lastIdleCheck >= 30 && !narratorMessage && narratorQueue.length === 0 && !useGameStore.getState().isTimeWarningActive) {
      const message = getIdleMessage(playTime);
      queueNarratorMessage(message);
      setLastIdleCheck(playTime);
    }
  }, [playTime, lastActivityTime, lastIdleCheck, narratorMessage, narratorQueue, queueNarratorMessage]);

  const getPhaseColor = (phase: number) => {
    if (phase === 1) return '#3498db';
    if (phase === 2) return '#e74c3c';
    return '#9b59b6';
  };

  return (
    <>
      {/* Narrator interaction messages - Game Log Style */}
      {narratorMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '10px',
            right: '10px',
            background: 'rgba(0, 0, 0, 0.95)',
            border: '1px solid #ffd700',
            borderLeft: '4px solid #ffd700',
            padding: '10px 14px',
            zIndex: 3000,
            color: '#e8e8e8',
            fontFamily: "'DotGothic16', sans-serif",
            fontSize: 'clamp(12px, 2.8vw, 14px)',
            animation: 'slideUp 0.3s ease-out, fadeOut 0.5s ease-in 2.5s forwards',
            maxWidth: '700px',
            margin: '0 auto',
            pointerEvents: 'none',
            boxShadow: '0 2px 10px rgba(255, 215, 0, 0.3)',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
          }}>
            <span style={{
              color: '#ffd700',
              fontSize: 'clamp(14px, 3vw, 16px)',
              flexShrink: 0,
            }}>
              ▶
            </span>
            <span style={{
              flex: 1,
              wordBreak: 'break-word',
              lineHeight: '1.5',
            }}>
              {narratorMessage}
            </span>
          </div>
        </div>
      )}

      {/* Time-based warnings - Game Log Style */}
      {warnings.map((warning, index) => (
        <div
          key={warning.id}
          style={{
            position: 'fixed',
            top: `${20 + index * 60}px`,
            left: '10px',
            right: '10px',
            background: 'rgba(0, 0, 0, 0.95)',
            border: `1px solid ${getPhaseColor(warning.phase)}`,
            borderLeft: `4px solid ${getPhaseColor(warning.phase)}`,
            padding: '12px 16px',
            zIndex: 2000 + index,
            color: '#e8e8e8',
            fontFamily: "'DotGothic16', sans-serif",
            fontSize: 'clamp(12px, 2.8vw, 14px)',
            animation: 'slideDown 0.3s ease-out, fadeOut 0.5s ease-in 2.5s forwards',
            maxWidth: '700px',
            margin: '0 auto',
            pointerEvents: 'none',
            boxShadow: `0 2px 10px ${getPhaseColor(warning.phase)}40`,
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
          }}>
            <span style={{
              color: getPhaseColor(warning.phase),
              fontSize: 'clamp(16px, 3.2vw, 18px)',
              flexShrink: 0,
            }}>
              {warning.phase === 1 && '○'}
              {warning.phase === 2 && '◉'}
              {warning.phase === 3 && '⬢'}
            </span>
            <span style={{
              flex: 1,
              wordBreak: 'break-word',
              lineHeight: '1.5',
            }}>
              {warning.message}
            </span>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>

      {warnings.length > 0 && warnings[warnings.length - 1].phase >= 2 && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1500,
          pointerEvents: 'none',
          animation: 'fadeIn 0.3s ease-out',
        }} />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
