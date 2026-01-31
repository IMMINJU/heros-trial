import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysPressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());

      // Toggle inventory with 'I' key
      if (e.key.toLowerCase() === 'i') {
        useGameStore.getState().toggleInventory();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const gameLoop = () => {
      const { player, updatePlayer, mapItems, obstacles, collectMapItem } = useGameStore.getState();

      // Handle movement
      let newX = player.x;
      let newY = player.y;

      if (keysPressed.current.has('w') || keysPressed.current.has('arrowup')) {
        newY -= player.speed;
      }
      if (keysPressed.current.has('s') || keysPressed.current.has('arrowdown')) {
        newY += player.speed;
      }
      if (keysPressed.current.has('a') || keysPressed.current.has('arrowleft')) {
        newX -= player.speed;
      }
      if (keysPressed.current.has('d') || keysPressed.current.has('arrowright')) {
        newX += player.speed;
      }

      // Boundary checks
      newX = Math.max(0, Math.min(CANVAS_WIDTH - player.width, newX));
      newY = Math.max(0, Math.min(CANVAS_HEIGHT - player.height, newY));

      // Record activity if player moved
      if (newX !== player.x || newY !== player.y) {
        useGameStore.getState().recordActivity();
      }

      // Obstacle collision check
      let collided = false;
      for (const obstacle of obstacles) {
        if (
          newX < obstacle.x + obstacle.width &&
          newX + player.width > obstacle.x &&
          newY < obstacle.y + obstacle.height &&
          newY + player.height > obstacle.y
        ) {
          collided = true;
          break;
        }
      }

      // Only update position if no collision
      if (!collided && (newX !== player.x || newY !== player.y)) {
        updatePlayer({ x: newX, y: newY });
      }

      // Check item collision
      const currentPlayer = useGameStore.getState().player;
      mapItems.forEach(item => {
        if (!item.collected &&
            currentPlayer.x < item.x + item.width &&
            currentPlayer.x + currentPlayer.width > item.x &&
            currentPlayer.y < item.y + item.height &&
            currentPlayer.y + currentPlayer.height > item.y) {
          collectMapItem(item.id);
        }
      });

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw pixel art grass pattern
      const grassSize = 8;
      for (let x = 0; x < CANVAS_WIDTH; x += grassSize * 2) {
        for (let y = 0; y < CANVAS_HEIGHT; y += grassSize * 2) {
          if (Math.random() > 0.8) {
            ctx.fillStyle = 'rgba(76, 175, 80, 0.1)';
            ctx.fillRect(x, y, grassSize, grassSize);
          }
        }
      }

      // Draw grid pattern (lighter)
      ctx.strokeStyle = '#16213e66';
      ctx.lineWidth = 1;
      for (let x = 0; x < CANVAS_WIDTH; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y < CANVAS_HEIGHT; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_WIDTH, y);
        ctx.stroke();
      }

      // Draw obstacles with pixel art style
      obstacles.forEach(obstacle => {
        // Stone/brick texture effect
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Add pixel art detail
        const pixelSize = 8;
        for (let i = 0; i < obstacle.width; i += pixelSize) {
          for (let j = 0; j < obstacle.height; j += pixelSize) {
            if (Math.random() > 0.7) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
              ctx.fillRect(obstacle.x + i, obstacle.y + j, pixelSize, pixelSize);
            }
          }
        }

        // Border
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 2;
        ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });

      // Draw items with animated glow
      const time = Date.now() / 1000;
      mapItems.forEach(item => {
        if (!item.collected) {
          // Pulsating glow effect
          const pulse = Math.sin(time * 2) * 0.5 + 0.5;
          ctx.shadowBlur = 20 + pulse * 10;
          ctx.shadowColor = '#f39c12';

          // Golden background
          ctx.fillStyle = '#f39c12';
          ctx.fillRect(item.x, item.y, item.width, item.height);

          // Shine effect
          ctx.fillStyle = `rgba(255, 255, 200, ${0.3 + pulse * 0.3})`;
          ctx.fillRect(item.x, item.y, item.width / 2, item.height / 2);

          ctx.shadowBlur = 0;

          // Item icon (emoji) - larger and centered
          ctx.font = 'bold 28px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#fff';
          ctx.fillText(item.item.icon, item.x + item.width / 2, item.y + item.height / 2);
        }
      });

      // Draw player with pixel art character
      const px = currentPlayer.x;
      const py = currentPlayer.y;
      const pw = currentPlayer.width;
      const ph = currentPlayer.height;

      // Simple pixel art character
      // Body
      ctx.fillStyle = '#4ecca3';
      ctx.fillRect(px + 8, py + 8, pw - 16, ph - 16);

      // Head
      ctx.fillStyle = '#f39c12';
      ctx.fillRect(px + 12, py + 4, pw - 24, 12);

      // Eyes
      ctx.fillStyle = '#2c3e50';
      ctx.fillRect(px + 14, py + 7, 4, 4);
      ctx.fillRect(px + 22, py + 7, 4, 4);

      // Legs (simple animation based on position)
      const legOffset = Math.floor(px + py) % 8 < 4 ? 2 : -2;
      ctx.fillStyle = '#34495e';
      ctx.fillRect(px + 10, py + ph - 8, 8, 8);
      ctx.fillRect(px + 22, py + ph - 8 + legOffset, 8, 8);

      // Outline
      ctx.strokeStyle = '#2c3e50';
      ctx.lineWidth = 2;
      ctx.strokeRect(px, py, pw, ph);

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{
        border: '2px solid #4ecca3',
        display: 'block',
        width: '100%',
        height: '100%',
        maxWidth: '800px',
        maxHeight: '600px',
        objectFit: 'contain',
        touchAction: 'none',
      }}
    />
  );
}
