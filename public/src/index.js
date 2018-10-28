import "@babel/polyfill";
import { FetchData } from './fetch'


const playbooks = document.querySelector('.playbooks-list');

playbooks.addEventListener('click', (event) => {
  const clickedPlaybook = event.originalTarget.id
  // Fetch selected playbook
  FetchData.fetchPlaybook(clickedPlaybook);
});