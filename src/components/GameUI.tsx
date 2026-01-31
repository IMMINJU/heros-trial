import { useGameStore } from '../store/gameStore';

export function GameUI() {
  const { player, quests } = useGameStore();

  const healthPercent = (player.health / player.maxHealth) * 100;
  const manaPercent = (player.mana / player.maxMana) * 100;
  const expPercent = (player.exp % 100);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      color: '#fff',
      
    }}>
      {/* Top right status bar - compact */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.95)',
        padding: '10px',
        borderRadius: '0',
        border: '3px solid #4ecca3',
        boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.5)',
        minWidth: '180px',
        maxWidth: '220px',
        imageRendering: 'pixelated',
      }}>
        <div style={{ marginBottom: '8px', fontSize: 'clamp(12px, 2.5vw, 14px)', fontWeight: 'bold' }}>
          Lv.{player.level}
        </div>

        {/* Health bar */}
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: 'clamp(9px, 1.8vw, 10px)', marginBottom: '2px', color: '#e74c3c' }}>HP</div>
          <div style={{
            width: '100%',
            height: '14px',
            background: '#1a1a1a',
            borderRadius: '0',
            overflow: 'hidden',
            border: '2px solid #2c2c2c',
            boxShadow: 'inset 2px 2px 0 rgba(0, 0, 0, 0.5)',
          }}>
            <div style={{
              width: `${healthPercent}%`,
              height: '100%',
              background: '#e74c3c',
              boxShadow: 'inset 0 -2px 0 rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)',
              transition: 'width 0.1s steps(20)',
              imageRendering: 'pixelated',
            }} />
          </div>
        </div>

        {/* Mana bar */}
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: 'clamp(9px, 1.8vw, 10px)', marginBottom: '2px', color: '#3498db' }}>MP</div>
          <div style={{
            width: '100%',
            height: '14px',
            background: '#1a1a1a',
            borderRadius: '0',
            overflow: 'hidden',
            border: '2px solid #2c2c2c',
            boxShadow: 'inset 2px 2px 0 rgba(0, 0, 0, 0.5)',
          }}>
            <div style={{
              width: `${manaPercent}%`,
              height: '100%',
              background: '#3498db',
              boxShadow: 'inset 0 -2px 0 rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)',
              transition: 'width 0.1s steps(20)',
              imageRendering: 'pixelated',
            }} />
          </div>
        </div>

        {/* EXP bar */}
        <div>
          <div style={{ fontSize: 'clamp(9px, 1.8vw, 10px)', marginBottom: '2px', color: '#f39c12' }}>EXP</div>
          <div style={{
            width: '100%',
            height: '12px',
            background: '#1a1a1a',
            borderRadius: '0',
            overflow: 'hidden',
            border: '2px solid #2c2c2c',
            boxShadow: 'inset 2px 2px 0 rgba(0, 0, 0, 0.5)',
          }}>
            <div style={{
              width: `${expPercent}%`,
              height: '100%',
              background: '#f39c12',
              boxShadow: 'inset 0 -2px 0 rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)',
              transition: 'width 0.1s steps(20)',
              imageRendering: 'pixelated',
            }} />
          </div>
        </div>
      </div>

      {/* Quest log */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: 'rgba(0, 0, 0, 0.95)',
        padding: '10px',
        borderRadius: '0',
        border: '3px solid #4ecca3',
        boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.5)',
        maxWidth: '250px',
        imageRendering: 'pixelated',
      }}>
        <div style={{ fontSize: 'clamp(12px, 2.5vw, 16px)', fontWeight: 'bold', marginBottom: '8px' }}>
          Quest Log
        </div>
        {quests.map((quest) => (
          <div key={quest.id} style={{
            marginBottom: '6px',
            padding: '6px',
            background: quest.completed ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 255, 255, 0.1)',
            borderRadius: '0',
            border: `2px solid ${quest.completed ? '#4caf50' : '#f39c12'}`,
            boxShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)',
          }}>
            <div style={{ fontSize: 'clamp(11px, 2.2vw, 14px)', fontWeight: 'bold' }}>
              {quest.completed ? '✓ ' : '○ '}{quest.title}
            </div>
            <div style={{ fontSize: 'clamp(9px, 1.8vw, 11px)', color: '#aaa', marginTop: '4px' }}>
              {quest.description}
            </div>
            {quest.progress && (
              <div style={{
                width: '100%',
                height: '8px',
                background: '#1a1a1a',
                borderRadius: '0',
                marginTop: '6px',
                overflow: 'hidden',
                border: '2px solid #2c2c2c',
                boxShadow: 'inset 2px 2px 0 rgba(0, 0, 0, 0.5)',
              }}>
                <div style={{
                  width: `${(quest.progress.current / quest.progress.max) * 100}%`,
                  height: '100%',
                  background: quest.completed ? '#4caf50' : '#f39c12',
                  boxShadow: 'inset 0 -2px 0 rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)',
                  transition: 'width 0.1s steps(20)',
                  imageRendering: 'pixelated',
                }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Controls hint */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.95)',
        padding: '10px',
        borderRadius: '0',
        border: '3px solid #4ecca3',
        boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.5)',
        fontSize: 'clamp(10px, 2vw, 12px)',
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>조작법</div>
        <div>WASD / 방향키 - 이동</div>
        <div>I - 인벤토리</div>
      </div>
    </div>
  );
};
