import "@babel/polyfill";
import Data from './fetch';

const playbooks = document.querySelector('.playbooks-list');

playbooks.addEventListener('click', (event) => {
  const clickedPlaybook = event.originalTarget.id
  // Fetch selected playbook
  Data.fetchPlaybook(clickedPlaybook);
});