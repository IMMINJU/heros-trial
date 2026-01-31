export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  level: number;
  exp: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress?: {
    current: number;
    max: number;
  };
}

export interface MapItem {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  item: Item;
  collected: boolean;
}

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}
