import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { soundManager } from '../utils/soundManager';

export function EndingSequence() {
  const { playTime, warningCount, endGame } = useGameStore();
  const [stage, setStage] = useState(0);
  const [showRetry, setShowRetry] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (playTime >= 420 && !hasStarted) { // 7 minutes
      setHasStarted(true);
      endGame(); // Stop the game timer and warnings
      soundManager.playEndingSound();

      // Stage progression
      setTimeout(() => setStage(1), 3000);
      setTimeout(() => setStage(2), 5000);
      setTimeout(() => setStage(3), 7000);
      setTimeout(() => setStage(4), 9000);
      setTimeout(() => setStage(5), 11000);
      setTimeout(() => setStage(6), 13000);
      setTimeout(() => {
        setStage(7);
        setShowRetry(true);
      }, 15000);
    }
  }, [playTime, hasStarted]);

  if (playTime < 420) return null;

  const handleRetry = () => {
    setShowRetry(false);
    setTimeout(() => {
      setStage(8); // "Just kidding" stage
    }, 500);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.98)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: '#fff',
      
      animation: stage === 3 ? 'glitch 0.5s infinite' : 'fadeIn 1s',
    }}>
      {stage === 0 && (
        <div style={{ fontSize: '48px', animation: 'fadeIn 1s' }}>
          ...
        </div>
      )}

      {stage === 1 && (
        <div style={{ fontSize: '48px', animation: 'fadeIn 1s' }}>
          축하합니다!
        </div>
      )}

      {stage === 2 && (
        <div style={{ textAlign: 'center', animation: 'fadeIn 1s' }}>
          <div style={{ fontSize: '48px', marginBottom: '30px' }}>
            게임 클리어!
          </div>
          <div style={{ fontSize: '24px', color: '#4ecca3' }}>
            크레딧을 시작합니다...
          </div>
        </div>
      )}

      {stage === 3 && (
        <div style={{ textAlign: 'center', animation: 'glitch 0.3s infinite' }}>
          <div style={{ fontSize: '36px', marginBottom: '20px', color: '#e74c3c' }}>
            [시스템 오류]
          </div>
          <div style={{ fontSize: '24px' }}>
            잠깐...
          </div>
        </div>
      )}

      {stage === 4 && (
        <div style={{ textAlign: 'center', animation: 'fadeIn 1s' }}>
          <div style={{ fontSize: '32px', marginBottom: '30px' }}>
            당신은 정말로 7분 동안...
          </div>
        </div>
      )}

      {stage === 5 && (
        <div style={{ textAlign: 'center', animation: 'fadeIn 1s' }}>
          <div style={{ fontSize: '32px', marginBottom: '30px' }}>
            사각형을 움직이셨군요
          </div>
          <div style={{ fontSize: '20px', color: '#888' }}>
            대단합니다. 정말로.
          </div>
        </div>
      )}

      {stage >= 6 && (
        <div style={{
          textAlign: 'center',
          animation: 'fadeIn 1s',
          maxWidth: '600px',
          padding: '40px',
        }}>
          <div style={{ fontSize: '36px', marginBottom: '40px', color: '#9b59b6' }}>
            통계
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '8px',
            border: '2px solid #4ecca3',
            marginBottom: '30px',
          }}>
            <div style={{ fontSize: '20px', marginBottom: '20px' }}>
              <span style={{ color: '#aaa' }}>경고 무시 횟수:</span>{' '}
              <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>{warningCount}회</span>
            </div>
            <div style={{ fontSize: '20px', marginBottom: '20px' }}>
              <span style={{ color: '#aaa' }}>낭비한 인생:</span>{' '}
              <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>7분 0초</span>
            </div>
            <div style={{ fontSize: '20px' }}>
              <span style={{ color: '#aaa' }}>생산성:</span>{' '}
              <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>0%</span>
            </div>
          </div>

          {showRetry && stage === 7 && (
            <div style={{ animation: 'fadeIn 1s' }}>
              <div style={{ fontSize: '24px', marginBottom: '20px' }}>
                다시 하시겠습니까?
              </div>
              <button
                onClick={handleRetry}
                style={{
                  background: '#4ecca3',
                  border: 'none',
                  color: '#000',
                  padding: '15px 40px',
                  fontSize: '20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  
                  fontWeight: 'bold',
                }}
              >
                네
              </button>
            </div>
          )}

          {stage === 8 && (
            <div style={{ fontSize: '32px', color: '#e74c3c', animation: 'fadeIn 1s' }}>
              농담입니다.
              <div style={{ fontSize: '18px', marginTop: '20px', color: '#aaa' }}>
                (페이지를 새로고침하세요)
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
};
