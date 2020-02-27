export type ActionType = 'eat' | 'reproduce' | 'wear hat' | 'remove hat' | 'make plant' | 'make hat' | 'make baby';
export const actionTypes = [
  'eat',
  'reproduce',
  'wear hat',
  'remove hat',
  'make plant',
  'make hat',
  'make baby',
] as ActionType[];

export type CreatureType = 'c1' | 'c2' | 'c3' | 'c4';
export type HatType = 'h1' | 'h2' | 'h3' | 'h4';
export type PlantType = 'p1' | 'p2' | 'p3' | 'p4';

export interface Creature {
  id: string;
  type: CreatureType;
  energy: number;
  actions: ActionType[];
  hat?: HatType;
  food: PlantType[];
  onAction: (actionType: ActionType, id: string) => void;
  onSelect?: () => void;
  dead: boolean;
}

export interface Hat {
  id: string;
  type: HatType;
  onSelect?: () => void;
}

export interface Plant {
  id: string;
  type: PlantType;
  energy: number;
  onSelect?: () => void;
}
