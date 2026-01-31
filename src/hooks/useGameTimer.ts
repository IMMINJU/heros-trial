import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

export function useGameTimer() {
  const incrementPlayTime = useGameStore((state) => state.incrementPlayTime);
  const gameStarted = useGameStore((state) => state.gameStarted);
  const isActive = useRef(true);

  useEffect(() => {
    // Only start timer after game has started
    if (!gameStarted) return;

    // Handle visibility change (tab switching)
    const handleVisibilityChange = () => {
      isActive.current = !document.hidden;
    };

    // Handle window focus/blur
    const handleFocus = () => {
      isActive.current = true;
    };

    const handleBlur = () => {
      isActive.current = false;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    // Timer interval - increment every second
    const timer = setInterval(() => {
      if (isActive.current) {
        incrementPlayTime();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [incrementPlayTime, gameStarted]);
}
