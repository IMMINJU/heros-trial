import { GameCanvas } from './components/GameCanvas';
import { GameUI } from './components/GameUI';
import { Inventory } from './components/Inventory';
import { WarningBanner } from './components/WarningBanner';
import { EndingSequence } from './components/EndingSequence';
import { VirtualJoystick } from './components/VirtualJoystick';
import { IntroScreen } from './components/IntroScreen';
import { useGameStore } from './store/gameStore';
import { useGameTimer } from './hooks/useGameTimer';
import './App.css';

export default function App() {
  const { gameStarted } = useGameStore();
  useGameTimer();

  if (!gameStarted) {
    return <IntroScreen />;
  }

  return (
    <div style={{
      width: '100vw',
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0a',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      position: 'fixed',
      top: 0,
      left: 0,
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        height: '100%',
        maxHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <GameCanvas />
        <GameUI />
        <Inventory />
        <WarningBanner />
        <EndingSequence />
        <VirtualJoystick />
      </div>
    </div>
  );
}
