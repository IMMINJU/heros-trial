import { useGameStore } from '../store/gameStore';

export function Inventory() {
  const { isInventoryOpen, inventory, removeItem, toggleInventory } = useGameStore();

  if (!isInventoryOpen) return null;

  return (
    <div
      data-inventory
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0, 0, 0, 0.95)',
        border: '4px solid #4ecca3',
        borderRadius: '0',
        boxShadow: '8px 8px 0 rgba(0, 0, 0, 0.5)',
        padding: 'clamp(10px, 3vw, 20px)',
        minWidth: 'min(90vw, 500px)',
        maxWidth: 'min(95vw, 600px)',
        maxHeight: '70vh',
        overflow: 'auto',
        zIndex: 2000,
        pointerEvents: 'auto',
        color: '#fff',
        imageRendering: 'pixelated',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'clamp(10px, 3vw, 20px)',
      }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(18px, 4vw, 24px)' }}>인벤토리</h2>
        <button
          onClick={toggleInventory}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translate(2px, 2px)';
            e.currentTarget.style.boxShadow = '2px 2px 0 rgba(0, 0, 0, 0.3)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0, 0, 0, 0.3)';
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.transform = 'translate(2px, 2px)';
            e.currentTarget.style.boxShadow = '2px 2px 0 rgba(0, 0, 0, 0.3)';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0, 0, 0, 0.3)';
          }}
          style={{
            background: '#e74c3c',
            border: '3px solid #c0392b',
            borderRadius: '0',
            boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.3)',
            color: '#fff',
            padding: 'clamp(6px, 2vw, 10px) clamp(12px, 3vw, 20px)',
            cursor: 'pointer',
            fontSize: 'clamp(12px, 2.5vw, 14px)',
            fontWeight: 'bold',
          }}
        >
          {'ontouchstart' in window ? '닫기' : '닫기 (I)'}
        </button>
      </div>

      {inventory.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: 'clamp(20px, 5vw, 40px) clamp(10px, 3vw, 20px)',
          color: '#888',
          fontSize: 'clamp(12px, 3vw, 16px)',
        }}>
          인벤토리가 비어있습니다.
          <br />
          아직 쓸모없는 물건을 하나도 주우지 않으셨네요.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(120px, 45vw), 1fr))',
          gap: 'clamp(10px, 2vw, 15px)',
        }}>
          {inventory.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'rgba(78, 204, 163, 0.1)',
                border: '3px solid #4ecca3',
                borderRadius: '0',
                boxShadow: '3px 3px 0 rgba(0, 0, 0, 0.3)',
                padding: 'clamp(10px, 2.5vw, 15px)',
                cursor: 'pointer',
                transition: 'all 0.1s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(78, 204, 163, 0.2)';
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '5px 5px 0 rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(78, 204, 163, 0.1)';
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '3px 3px 0 rgba(0, 0, 0, 0.3)';
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.background = 'rgba(78, 204, 163, 0.2)';
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '5px 5px 0 rgba(0, 0, 0, 0.3)';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.background = 'rgba(78, 204, 163, 0.1)';
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '3px 3px 0 rgba(0, 0, 0, 0.3)';
              }}
              onClick={() => removeItem(item.id)}
            >
              <div style={{
                fontSize: 'clamp(24px, 5vw, 32px)',
                textAlign: 'center',
                marginBottom: 'clamp(5px, 1.5vw, 10px)',
              }}>
                {item.icon}
              </div>
              <div style={{
                fontWeight: 'bold',
                marginBottom: '5px',
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                textAlign: 'center',
              }}>
                {item.name}
              </div>
              <div style={{
                fontSize: 'clamp(10px, 2vw, 11px)',
                color: '#aaa',
                textAlign: 'center',
              }}>
                {item.description}
              </div>
            </div>
          ))}
        </div>
      )}

      {inventory.length > 0 && (
        <div style={{
          marginTop: 'clamp(10px, 3vw, 20px)',
          padding: 'clamp(8px, 2vw, 10px)',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '0',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          fontSize: 'clamp(10px, 2.5vw, 12px)',
          color: '#aaa',
          textAlign: 'center',
        }}>
          아이템을 클릭하면 버릴 수 있습니다. 하지만 왜 버리시려고요?
        </div>
      )}
    </div>
  );
};
