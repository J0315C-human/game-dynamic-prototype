import { getStarterCreatures, getCreatureInitialByType, getUpdatedCreatureActions } from './creatures';
import { Creature, Plant, Hat, ActionType, PlantType, CreatureType } from './entities';
import { getStarterHats, getStarterPlants, makeNewPlant } from './items';
import { config } from './config';
import { makeId } from './util';

class State {
  creatures: Creature[];
  plants: Plant[];
  hats: Hat[];
  curCreatureFocusedId?: string;
  curActionType?: ActionType;
  render?: () => void;

  constructor() {
    this.creatures = getStarterCreatures(config.starters.c, this.processCreatureAction);
    this.plants = getStarterPlants(config.starters.p);
    this.hats = getStarterHats(config.starters.h);
    this.update();
  }

  onActionComplete = () => {
    this.curCreatureFocusedId = undefined;
    this.curActionType = undefined;
  };

  update = () => {
    this.updateCreatureActions();
    if (this.render) this.render();
  };

  updateCurrentAction = () => {
    console.log(this.curCreatureFocusedId, this.curActionType);
    if (this.curCreatureFocusedId && this.curActionType) {
      this.processCreatureAction(this.curActionType, this.curCreatureFocusedId);
    }
  };

  clearAllSelectable = () => {
    this.creatures.forEach(c => {
      c.onSelect = undefined;
    });
    this.plants.forEach(p => {
      p.onSelect = undefined;
    });
    this.hats.forEach(h => {
      h.onSelect = undefined;
    });
  };

  updateCreatureActions = () => {
    this.creatures.forEach(c => {
      c.actions = getUpdatedCreatureActions(c);
    });
  };

  processCreatureAction = (actionType: ActionType, entityId: string) => {
    const creature = this.creatures.find(c => c.id === entityId);
    this.clearAllSelectable();
    if (!creature || creature.dead) return;
    this.curCreatureFocusedId = creature.id;
    this.curActionType = actionType;
    switch (actionType) {
      case 'eat':
        this.beginEatAction(creature);
        break;
      case 'wear hat':
        this.beginWearAction(creature);
        break;
      case 'remove hat':
        this.completeRemoveHatAction(creature);
        break;
      case 'reproduce':
        this.beginReproduceAction(creature);
        break;
      case 'make hat':
        this.completeMakeHatAction(creature);
        break;
      case 'make plant':
        this.completeMakePlantAction(creature);
        break;
      case 'make baby':
        this.completeMakeBabyAction(creature);
        break;
    }
    this.update();
  };

  beginEatAction = (creature: Creature) => {
    this.plants.forEach(plant => {
      if (creature.food.includes(plant.type)) {
        plant.onSelect = () => this.completeEatAction(plant, creature);
      } else {
        plant.onSelect = undefined;
      }
    });
  };

  beginReproduceAction = (creature: Creature) => {
    const reproductionCost = config.creatureEnergyCosts[creature.type].reproduce;
    if (creature.energy < reproductionCost) return;
    const validMates = this.creatures.filter(
      other =>
        other.id !== creature.id &&
        other.type === creature.type &&
        other.hat === creature.hat &&
        other.energy >= reproductionCost &&
        !other.dead,
    );
    validMates.forEach(other => {
      other.onSelect = () => this.completeReproduceAction(creature, other);
    });
  };

  beginWearAction = (creature: Creature) => {
    this.hats.forEach(hat => {
      hat.onSelect = () => this.completeWearAction(hat, creature);
    });
  };

  completeMakeBabyAction = (creature: Creature) => {
    const baby = getCreatureInitialByType('c1', this.processCreatureAction);
    baby.hat = creature.hat;
    this.creatures.push(baby);
    creature.energy -= config.creatureEnergyCosts[creature.type].makeBaby;
    this.onActionComplete();
    this.update();
  };

  completeRemoveHatAction = (creature: Creature) => {
    if (!creature.hat) return;
    this.hats.push({
      id: makeId(),
      type: creature.hat,
    });
    creature.hat = undefined;
    this.onActionComplete();
    this.update();
  };

  completeMakeHatAction = (creature: Creature) => {
    const newHat: Hat = {
      type: config.creatureMakesHatType[creature.type],
      id: makeId(),
    };
    this.hats.push(newHat);
    const hatCost = config.creatureEnergyCosts[creature.type].makeHat;
    creature.energy -= hatCost;
    this.onActionComplete();
    this.update();
  };

  completeMakePlantAction = (creature: Creature) => {
    const newPlantType = config.creatureMakesPlantType[creature.type];
    const newPlant: Plant = {
      type: newPlantType,
      id: makeId(),
      energy: config.plantEnergyValues[newPlantType],
    };
    this.plants.push(newPlant);
    const plantCost = config.creatureEnergyCosts[creature.type].makePlant;
    creature.energy -= plantCost;
    this.onActionComplete();
    this.update();
  };

  completeEatAction = (plant: Plant, creature: Creature) => {
    if (!creature.food.includes(plant.type)) return;

    creature.energy += plant.energy;

    this.plants = this.plants.filter(p => p.id !== plant.id);
    this.clearAllSelectable();
    this.onActionComplete();
    this.update();
  };

  completeWearAction = (hat: Hat, creature: Creature) => {
    if (creature.hat) return;

    creature.hat = hat.type;

    this.hats = this.hats.filter(h => h.id !== hat.id);
    this.clearAllSelectable();
    this.onActionComplete();
    this.update();
  };

  completeReproduceAction = (creatureA: Creature, creatureB: Creature) => {
    const nextCreatureType = config.nextCreatureTypes[creatureA.type];
    if (!nextCreatureType) return;
    const newCreature = getCreatureInitialByType(nextCreatureType, this.processCreatureAction);

    const reproductionCost = config.creatureEnergyCosts[creatureA.type].reproduce;
    newCreature.energy = creatureA.energy + creatureB.energy - 2 * reproductionCost;
    newCreature.hat = creatureA.hat;
    const newCreatures = [] as Creature[];
    this.creatures.forEach(c => {
      if (c.id === creatureA.id) {
        newCreatures.push(newCreature);
      } else if (c.id !== creatureB.id) {
        newCreatures.push(c);
      }
    });
    this.creatures = newCreatures;
    this.clearAllSelectable();
    this.onActionComplete();
    this.update();
  };

  addRandomPlant = () => {
    const probs = config.plantProbabilities;
    const total = probs.reduce((prev, cur) => prev + cur, 0);
    const r = Math.random() * total;
    let cutoff = 0;
    for (let i = 0; i < probs.length; i++) {
      cutoff += probs[i];
      if (r <= cutoff) {
        const plantType = `p${i + 1}` as PlantType;
        this.plants.push(makeNewPlant(plantType));
        this.update();
        return;
      }
    }
  };

  spendCreatureEnergy = (creatureType: CreatureType) => {
    this.creatures.forEach(c => {
      if (c.dead) return;
      if (c.type === creatureType) {
        c.energy -= 0.25;
      }
    });
    this.killOffCreaturesWithNegativeEnergy();
    this.updateCurrentAction();
    this.update();
  };

  killOffCreaturesWithNegativeEnergy = () => {
    this.creatures.forEach(c => {
      const creatureDies = c.energy < 0;
      if (creatureDies) {
        c.dead = true;
        c.onSelect = undefined;
        if (c.id === this.curCreatureFocusedId) {
          this.clearAllSelectable();
          this.curCreatureFocusedId = undefined;
        }
      }
    });
  };
}

export default State;
