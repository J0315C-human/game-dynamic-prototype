import { Plant, PlantType, Hat, HatType } from './entities';
import { config } from './config';
import { makeId } from './util';

export const makeNewPlant = (plantType: PlantType): Plant => ({
  type: plantType,
  energy: config.plantEnergyValues[plantType],
  id: makeId(),
});

export const getStarterPlants = (amounts: number[]): Plant[] => {
  const result = [] as Plant[];
  for (let pType = 0; pType < 4; pType++) {
    for (let i = 0; i < amounts[pType]; i++) {
      const type = ('p' + (pType + 1)) as PlantType;
      result.push(makeNewPlant(type));
    }
  }

  return result;
};

export const getStarterHats = (amounts: number[]): Hat[] => {
  const result = [] as Hat[];
  for (let hType = 0; hType < 4; hType++) {
    for (let i = 0; i < amounts[hType]; i++) {
      result.push({
        type: ('h' + (hType + 1)) as HatType,
        id: makeId(),
      });
    }
  }
  return result;
};
