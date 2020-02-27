import { CreatureType, HatType, PlantType } from './entities';

export const config = {
  starters: {
    c: [16, 0, 0, 0],
    p: [16, 8, 4, 2],
    h: [4, 0, 0, 0],
  },
  plantEnergyValues: {
    p1: 1,
    p2: 2,
    p3: 4,
    p4: 8,
  },
  plantProbabilities: [8, 4, 2, 1],
  nextCreatureTypes: {
    c1: 'c2',
    c2: 'c3',
    c3: 'c4',
    c4: undefined,
  } as { [key in CreatureType]?: CreatureType | undefined },
  creatureMakesHatType: {
    c1: 'h1',
    c2: 'h2',
    c3: 'h3',
    c4: 'h4',
  } as { [key in CreatureType]?: HatType | undefined },
  creatureMakesPlantType: {
    c1: undefined,
    c2: 'p1',
    c3: 'p2',
    c4: 'p3',
  } as { [key in CreatureType]?: PlantType | undefined },
  creatureEnergyCosts: {
    c1: {
      reproduce: 3,
      makePlant: Infinity,
      makeHat: 1,
      makeBaby: Infinity,
    },
    c2: {
      reproduce: 6,
      makePlant: 1,
      makeHat: 2,
      makeBaby: 16,
    },
    c3: {
      reproduce: 12,
      makePlant: 2,
      makeHat: 3,
      makeBaby: 8,
    },
    c4: {
      reproduce: Infinity,
      makePlant: 4,
      makeHat: 4,
      makeBaby: 4,
    },
  } as { [key in CreatureType]?: { reproduce: number; makePlant: number; makeHat: number; makeBaby: number } },
  creatureExpenditureSpeed: {
    c1: 10000 * 0.5,
    c2: 16666 * 0.5,
    c3: 22222 * 0.5,
    c4: 28888 * 0.5,
  },
};
