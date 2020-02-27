import './assets/styles.css';
import State from './state';
import { render } from './render';
import { config } from './config';

const state = new State();

console.log(state);

render(state);

state.render = () => render(state);

window.setInterval(() => state.addRandomPlant(), 10000);

window.setInterval(() => state.spendCreatureEnergy('c1'), config.creatureExpenditureSpeed.c1);
window.setInterval(() => state.spendCreatureEnergy('c2'), config.creatureExpenditureSpeed.c2);
window.setInterval(() => state.spendCreatureEnergy('c3'), config.creatureExpenditureSpeed.c3);
window.setInterval(() => state.spendCreatureEnergy('c4'), config.creatureExpenditureSpeed.c4);
