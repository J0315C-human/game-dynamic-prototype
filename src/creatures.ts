import { Creature, ActionType, CreatureType } from './entities';
import { makeId } from './util';
import { config } from './config';

type ActionHandler = (actionType: ActionType, entityId: string) => void;
const getCreature1Initial = (actionHandler: ActionHandler): Creature => ({
  type: 'c1',
  energy: 4,
  actions: [],
  food: ['p1'],
  id: makeId(),
  onAction: actionHandler,
  dead: false,
});

const getCreature2Initial = (actionHandler: ActionHandler): Creature => ({
  type: 'c2',
  energy: 0,
  actions: [],
  food: ['p1', 'p2'],
  id: makeId(),
  onAction: actionHandler,
  dead: false,
});

const getCreature3Initial = (actionHandler: ActionHandler): Creature => ({
  type: 'c3',
  energy: 0,
  actions: [],
  food: ['p1', 'p2', 'p3'],
  id: makeId(),
  onAction: actionHandler,
  dead: false,
});

const getCreature4Initial = (actionHandler: ActionHandler): Creature => ({
  type: 'c4',
  energy: 0,
  actions: [],
  food: ['p1', 'p2', 'p3', 'p4'],
  id: makeId(),
  onAction: actionHandler,
  dead: false,
});

export const getCreatureInitial = (cType: number, actionHandler: ActionHandler) => {
  switch (cType) {
    case 0:
      return getCreature1Initial(actionHandler);
    case 1:
      return getCreature2Initial(actionHandler);
    case 2:
      return getCreature3Initial(actionHandler);
    case 3:
      return getCreature4Initial(actionHandler);
    default:
      throw new Error('creature type not valid: ' + cType);
  }
};

export const getCreatureInitialByType = (creatureType: CreatureType, actionHandler: ActionHandler) => {
  const cTypeIndex = ['c1', 'c2', 'c3', 'c4'].findIndex(t => t === creatureType);
  return getCreatureInitial(cTypeIndex, actionHandler);
};

export const getStarterCreatures = (amounts: number[], actionHandler: ActionHandler) => {
  const result = [] as Creature[];
  for (let cType = 0; cType < 4; cType++) {
    for (let i = 0; i < amounts[cType]; i++) {
      result.push(getCreatureInitial(cType, actionHandler));
    }
  }

  return result;
};

export const getUpdatedCreatureActions = (c: Creature) => {
  if (c.dead) return [];
  const energyCosts = config.creatureEnergyCosts[c.type];
  // can always eat
  const actions: ActionType[] = ['eat'];

  // can remove hat if it has a hat
  if (c.hat) {
    actions.push('remove hat');
  }
  // can wear hat if it is a baby and has no hat
  if (c.type === 'c1' && !c.hat) {
    actions.push('wear hat');
  }
  // can reproduce if it has a hat and enough energy
  if (c.hat && c.energy >= energyCosts.reproduce) {
    actions.push('reproduce');
  }
  // can make a plant if it has enough energy
  if (c.energy >= energyCosts.makePlant) {
    actions.push('make plant');
  }
  // can make a hat if it has enough energy
  if (c.energy >= energyCosts.makeHat) {
    actions.push('make hat');
  }
  // can make baby if it has enough energy
  if (c.energy >= energyCosts.makeBaby) {
    actions.push('make baby');
  }
  return actions;
};
