import State from './state';
import { Creature, Plant, Hat, ActionType, actionTypes } from './entities';

let _added = [] as HTMLElement[];

const creaturesEl = document.getElementById('creatures') as HTMLDivElement;
const plantsEl = document.getElementById('plants') as HTMLDivElement;
const hatsEl = document.getElementById('hats') as HTMLDivElement;

const _el = (type: string, className?: string, text?: string) => {
  const div = document.createElement(type) as HTMLElement;
  div.textContent = text || '';
  div.className = className || '';
  return div;
};

const makeSelectable = (el: HTMLElement, onSelect: () => void) => {
  el.classList.add('selectable');
  el.onclick = onSelect;
};

const addCreatureActionButtons = (c: Creature, outer: HTMLElement) => {
  const addAction = (action: ActionType, disabled: boolean) => {
    const button = _el('button', '', action) as HTMLButtonElement;
    button.onclick = () => {
      c.onAction(action, c.id);
    };
    button.disabled = disabled || c.dead;
    outer.appendChild(button);
  };

  actionTypes.forEach(action => {
    if (c.actions.includes(action)) {
      addAction(action, false);
    } else {
      addAction(action, true);
    }
  });
};

function addCreature(c: Creature) {
  const outer = _el('div', 'entity');
  const title = _el('h3', '', c.type);
  outer.appendChild(title);

  if (c.dead) {
    outer.appendChild(_el('div', '', 'DEAD'));
    outer.appendChild(_el('div', '', ''));
    outer.style.opacity = '0.5';
  } else {
    outer.appendChild(_el('div', '', 'energy: ' + c.energy));
    outer.appendChild(_el('div', '', c.hat ? `hat: ${c.hat}` : ''));
  }

  addCreatureActionButtons(c, outer);
  if (c.onSelect) {
    makeSelectable(outer, c.onSelect);
  }
  _added.push(outer);
  creaturesEl.appendChild(outer);
}

function renderCreatures(creatures: Creature[]) {
  creatures.forEach(creature => {
    addCreature(creature);
  });
}

function renderPlants(plants: Plant[]) {
  plants.forEach(plant => {
    const plantEntity = _el('div', 'entity');
    const title = _el('h3', '', plant.type);
    plantEntity.appendChild(title);

    if (plant.onSelect) {
      makeSelectable(plantEntity, plant.onSelect);
    }
    _added.push(plantEntity);
    plantsEl.appendChild(plantEntity);
  });
}

function renderHats(hats: Hat[]) {
  hats.forEach(hat => {
    const hatEntity = _el('div', 'entity');
    const title = _el('h3', '', hat.type);
    hatEntity.appendChild(title);

    if (hat.onSelect) {
      makeSelectable(hatEntity, hat.onSelect);
    }
    _added.push(hatEntity);
    hatsEl.appendChild(hatEntity);
  });
}

export const render = (s: State) => {
  _added.forEach(el => el.remove());
  _added = [];
  renderCreatures(s.creatures);
  renderPlants(s.plants);
  renderHats(s.hats);
};
