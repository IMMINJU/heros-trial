import type { Item, MapItem, Obstacle } from '../types/game';

export const ITEM_TEMPLATES: Item[] = [
  { id: 'relic1', name: '고대의 유물', description: '오래된 힘이 깃든 물건', icon: '🏺' },
  { id: 'potion1', name: '신비한 물약', description: '알 수 없는 액체', icon: '🧪' },
  { id: 'scroll1', name: '낡은 두루마리', description: '고대 문자가 적혀있다', icon: '📜' },
  { id: 'crystal1', name: '빛나는 수정', description: '은은한 빛을 발한다', icon: '💎' },
  { id: 'key1', name: '녹슨 열쇠', description: '무언가를 열 수 있을 것 같다', icon: '🔑' },
];

export function generateRandomItems(count: number = 5): MapItem[] {
  const items: MapItem[] = [];
  const usedPositions: { x: number; y: number }[] = [];
  const obstacles = generateObstacles();

  for (let i = 0; i < count; i++) {
    const template = ITEM_TEMPLATES[i % ITEM_TEMPLATES.length];

    let x: number, y: number;
    let attempts = 0;
    let validPosition = false;

    do {
      // 왼쪽 절반 영역에만 아이템 생성 (오른쪽 UI 피하기)
      x = Math.random() * (500 - 60) + 30;
      y = Math.random() * (600 - 60) + 30;
      attempts++;

      // Check if position overlaps with other items
      const overlapsWithItem = usedPositions.some(pos =>
        Math.abs(pos.x - x) < 80 && Math.abs(pos.y - y) < 80
      );

      // Check if position overlaps with obstacles
      const overlapsWithObstacle = obstacles.some(obstacle =>
        x < obstacle.x + obstacle.width + 20 &&
        x + 30 > obstacle.x - 20 &&
        y < obstacle.y + obstacle.height + 20 &&
        y + 30 > obstacle.y - 20
      );

      validPosition = !overlapsWithItem && !overlapsWithObstacle;
    } while (!validPosition && attempts < 100);

    usedPositions.push({ x, y });

    items.push({
      id: `item_${i}`,
      x,
      y,
      width: 30,
      height: 30,
      item: { ...template, id: `${template.id}_${i}` },
      collected: false,
    });
  }

  return items;
}

export function generateObstacles(): Obstacle[] {
  return [
    { x: 150, y: 150, width: 80, height: 80, color: '#2c3e50' },
    { x: 500, y: 200, width: 100, height: 60, color: '#34495e' },
    { x: 300, y: 400, width: 120, height: 40, color: '#2c3e50' },
    { x: 600, y: 450, width: 60, height: 100, color: '#34495e' },
  ];
}
