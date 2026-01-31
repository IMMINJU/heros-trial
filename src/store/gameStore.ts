import { create } from 'zustand';
import type { Player, Item, Quest, MapItem, Obstacle } from '../types/game';
import { generateRandomItems, generateObstacles } from '../data/items';
import { getInteractionMessage } from '../data/warnings';

const initialPlayer: Player = {
  x: 400,
  y: 300,
  width: 40,
  height: 40,
  speed: 3,
  health: 100,
  maxHealth: 100,
  mana: 50,
  maxMana: 50,
  level: 1,
  exp: 0,
};

interface GameStore {
  player: Player;
  inventory: Item[];
  quests: Quest[];
  mapItems: MapItem[];
  obstacles: Obstacle[];
  isInventoryOpen: boolean;
  playTime: number;
  warningCount: number;
  narratorMessage: string | null;
  narratorQueue: string[];
  isTimeWarningActive: boolean;
  lastActivityTime: number;
  gameStarted: boolean;
  updatePlayer: (updates: Partial<Player>) => void;
  addItem: (item: Item) => void;
  addExp: (amount: number) => void;
  removeItem: (itemId: string) => void;
  collectMapItem: (itemId: string) => void;
  toggleInventory: () => void;
  updateQuest: (questId: string, completed: boolean) => void;
  incrementPlayTime: () => void;
  incrementWarningCount: () => void;
  queueNarratorMessage: (message: string) => void;
  showNextNarratorMessage: () => void;
  clearNarratorMessage: () => void;
  setTimeWarningActive: (active: boolean) => void;
  recordActivity: () => void;
  respawnItems: () => void;
  startGame: () => void;
  reset: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  player: initialPlayer,
  inventory: [],
  mapItems: generateRandomItems(5),
  obstacles: generateObstacles(),
  quests: [
    {
      id: 'quest1',
      title: 'Chapter 1: 모험의 시작',
      description: '3개의 고대 유물을 수집하세요.',
      completed: false,
      progress: { current: 0, max: 3 },
    },
  ],
  isInventoryOpen: false,
  playTime: 0,
  warningCount: 0,
  narratorMessage: null,
  narratorQueue: [],
  isTimeWarningActive: false,
  lastActivityTime: 0,
  gameStarted: false,

  updatePlayer: (updates) =>
    set((state) => {
      const newPlayer = { ...state.player, ...updates };
      const oldLevel = state.player.level;

      if (newPlayer.exp >= 100 && newPlayer.level < 10) {
        const levelsGained = Math.floor(newPlayer.exp / 100);
        newPlayer.level = Math.min(state.player.level + levelsGained, 10);
        newPlayer.exp = newPlayer.exp % 100;

        // Level up bonuses
        if (newPlayer.level > oldLevel) {
          newPlayer.maxHealth += 10;
          newPlayer.health = newPlayer.maxHealth; // Full heal on level up
          newPlayer.maxMana += 5;
          newPlayer.mana = newPlayer.maxMana; // Full mana on level up
          newPlayer.speed = Math.min(3 + (newPlayer.level - 1) * 0.2, 5); // Increase speed slightly

          // Queue level up narrator message
          const currentState = useGameStore.getState();
          const message = getInteractionMessage('level_up', currentState.playTime);
          useGameStore.getState().queueNarratorMessage(message);
        }
      }

      return { player: newPlayer };
    }),

  addItem: (item) =>
    set((state) => ({
      inventory: [...state.inventory, item],
    })),

  addExp: (amount) =>
    set((state) => ({
      player: { ...state.player, exp: state.player.exp + amount },
    })),

  removeItem: (itemId) =>
    set((state) => ({
      inventory: state.inventory.filter((item) => item.id !== itemId),
    })),

  collectMapItem: (itemId) =>
    set((state) => {
      const mapItem = state.mapItems.find(item => item.id === itemId);
      if (!mapItem || mapItem.collected) return state;

      const newInventory = [...state.inventory, mapItem.item];
      const newMapItems = state.mapItems.map(item =>
        item.id === itemId ? { ...item, collected: true } : item
      );

      const newPlayer = { ...state.player, exp: state.player.exp + 10 };
      const oldLevel = state.player.level;

      if (newPlayer.exp >= 100 && newPlayer.level < 10) {
        newPlayer.level = Math.min(newPlayer.level + 1, 10);
        newPlayer.exp = newPlayer.exp % 100;

        // Apply level up bonuses
        newPlayer.maxHealth += 10;
        newPlayer.health = newPlayer.maxHealth;
        newPlayer.maxMana += 5;
        newPlayer.mana = newPlayer.maxMana;
        newPlayer.speed = Math.min(3 + (newPlayer.level - 1) * 0.2, 5);
      }

      let newQuests = state.quests.map(quest => {
        if (quest.id === 'quest1') {
          // Update progress
          const updatedQuest = {
            ...quest,
            progress: { current: newInventory.length, max: 3 }
          };

          // Check if quest just completed
          if (newInventory.length >= 3 && !quest.completed) {
            const message = getInteractionMessage('quest_complete', state.playTime);
            useGameStore.getState().queueNarratorMessage(message);

            // Remove quest1 after 3 seconds, add quest2 after 3.5 seconds
            setTimeout(() => {
              useGameStore.setState((s) => ({
                quests: s.quests.filter(q => q.id !== 'quest1')
              }));
            }, 3000);
            setTimeout(() => {
              useGameStore.setState((s) => ({
                quests: [...s.quests, {
                  id: 'quest2',
                  title: 'Chapter 2: 계속하기',
                  description: '계속 플레이하세요. 이유는 묻지 마세요.',
                  completed: false,
                }]
              }));
            }, 3500);

            return { ...updatedQuest, completed: true };
          }

          return updatedQuest;
        }
        return quest;
      });

      // Queue item collect message
      const itemMessage = getInteractionMessage('item_collect', state.playTime);
      useGameStore.getState().queueNarratorMessage(itemMessage);

      // Queue level up message if leveled up
      if (newPlayer.level > oldLevel) {
        const levelMessage = getInteractionMessage('level_up', state.playTime);
        useGameStore.getState().queueNarratorMessage(levelMessage);
      }

      // Respawn items if all collected
      const allCollected = newMapItems.every(item => item.collected);
      if (allCollected) {
        setTimeout(() => {
          useGameStore.getState().respawnItems();
        }, 3000);
      }

      return {
        inventory: newInventory,
        mapItems: newMapItems,
        player: newPlayer,
        quests: newQuests,
      };
    }),

  toggleInventory: () =>
    set((state) => {
      const willOpen = !state.isInventoryOpen;
      if (willOpen) {
        const message = getInteractionMessage('inventory_open', state.playTime);
        useGameStore.getState().queueNarratorMessage(message);
      }
      return { isInventoryOpen: willOpen };
    }),

  updateQuest: (questId, completed) =>
    set((state) => ({
      quests: state.quests.map((quest) =>
        quest.id === questId ? { ...quest, completed } : quest
      ),
    })),

  incrementPlayTime: () =>
    set((state) => {
      const newPlayTime = state.playTime + 1;
      let newQuests = [...state.quests];

      // Complete quest2 at 60 seconds
      if (newPlayTime === 60) {
        newQuests = newQuests.map(q =>
          q.id === 'quest2' ? { ...q, completed: true } : q
        );
        // Remove quest2 and add quest3 after delays
        setTimeout(() => {
          useGameStore.setState((s) => ({
            quests: s.quests.filter(q => q.id !== 'quest2')
          }));
        }, 3000);
        setTimeout(() => {
          useGameStore.setState((s) => ({
            quests: [...s.quests, {
              id: 'quest3',
              title: 'Chapter 3: 진짜로?',
              description: '아직도 하고 계시네요. 놀랍습니다.',
              completed: false,
              progress: { current: s.playTime, max: 420 },
            }]
          }));
        }, 3500);
      }

      // Complete quest3 at 180 seconds
      if (newPlayTime === 180) {
        newQuests = newQuests.map(q =>
          q.id === 'quest3' ? { ...q, completed: true } : q
        );
        // Remove quest3 and add quest4 after delays
        setTimeout(() => {
          useGameStore.setState((s) => ({
            quests: s.quests.filter(q => q.id !== 'quest3')
          }));
        }, 3000);
        setTimeout(() => {
          useGameStore.setState((s) => ({
            quests: [...s.quests, {
              id: 'quest4',
              title: 'Chapter 4: 끝내세요',
              description: '제발 게임을 종료해주세요.',
              completed: false,
              progress: { current: s.playTime, max: 420 },
            }]
          }));
        }, 3500);
      }

      // Complete quest4 at 300 seconds
      if (newPlayTime === 300) {
        newQuests = newQuests.map(q =>
          q.id === 'quest4' ? { ...q, completed: true } : q
        );
        // Remove quest4 and add quest5 after delays
        setTimeout(() => {
          useGameStore.setState((s) => ({
            quests: s.quests.filter(q => q.id !== 'quest4')
          }));
        }, 3000);
        setTimeout(() => {
          useGameStore.setState((s) => ({
            quests: [...s.quests, {
              id: 'quest5',
              title: 'Final Chapter: 해냈습니다',
              description: '7분을 채웠습니다. 이제 만족하시나요?',
              completed: false,
              progress: { current: s.playTime, max: 420 },
            }]
          }));
        }, 3500);
      }

      // Complete quest5 at 420 seconds
      if (newPlayTime === 420) {
        newQuests = newQuests.map(q =>
          q.id === 'quest5' ? { ...q, completed: true } : q
        );
      }

      // Update progress for time-based quests
      newQuests = newQuests.map(quest => {
        if (quest.id === 'quest3' || quest.id === 'quest4' || quest.id === 'quest5') {
          return {
            ...quest,
            progress: { current: Math.min(newPlayTime, 420), max: 420 }
          };
        }
        return quest;
      });

      return {
        playTime: newPlayTime,
        quests: newQuests,
      };
    }),

  incrementWarningCount: () =>
    set((state) => ({
      warningCount: state.warningCount + 1,
    })),

  queueNarratorMessage: (message) =>
    set((state) => {
      // Don't queue interaction messages when time warning is active
      if (state.isTimeWarningActive) {
        return state;
      }

      const newQueue = [...state.narratorQueue, message];
      // If no message is currently showing, show the next one immediately
      if (!state.narratorMessage) {
        setTimeout(() => {
          useGameStore.getState().showNextNarratorMessage();
        }, 200);
      }
      return { narratorQueue: newQueue };
    }),

  showNextNarratorMessage: () =>
    set((state) => {
      if (state.narratorQueue.length === 0) {
        return { narratorMessage: null };
      }
      const [nextMessage, ...remainingQueue] = state.narratorQueue;
      return {
        narratorMessage: nextMessage,
        narratorQueue: remainingQueue,
      };
    }),

  clearNarratorMessage: () =>
    set((state) => {
      // When clearing, check if there are more messages in queue
      if (state.narratorQueue.length > 0) {
        setTimeout(() => {
          useGameStore.getState().showNextNarratorMessage();
        }, 800); // 0.8 second delay between messages
      }
      return { narratorMessage: null };
    }),

  setTimeWarningActive: (active) =>
    set({ isTimeWarningActive: active }),

  recordActivity: () =>
    set((state) => ({
      lastActivityTime: state.playTime,
    })),

  respawnItems: () =>
    set({
      mapItems: generateRandomItems(5),
    }),

  startGame: () =>
    set({
      gameStarted: true,
    }),

  reset: () =>
    set({
      player: initialPlayer,
      inventory: [],
      mapItems: generateRandomItems(5),
      obstacles: generateObstacles(),
      quests: [],
      isInventoryOpen: false,
      playTime: 0,
      warningCount: 0,
      narratorMessage: null,
      narratorQueue: [],
      isTimeWarningActive: false,
      lastActivityTime: 0,
      gameStarted: false,
    }),
}));
