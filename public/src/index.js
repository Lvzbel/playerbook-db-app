require('./mystyles.scss');
import "@babel/polyfill";
import { FetchData } from './fetch'


const playbooks = document.querySelector('.playbooks-list');

playbooks.addEventListener('click', (event) => {
  const clickedPlaybook = event.srcElement.id
  // Fetch selected playbook
  FetchData.fetchPlaybook(clickedPlaybook);
});