const oilrig = document.getElementById('oilrig');
const sofacy = document.getElementById('sofacy');
const description = document.getElementsByClassName('description-text');


const playbooks = document.getElementsByClassName('playbooks');

document.addEventListener('click', (event) => {
  const clickedPlaybook = event.target.attributes.id.nodeValue
  fetchPlaybook(clickedPlaybook);
})

const fetchPlaybook = async (playbook) => {
  let response = await fetch(`${window.location}api/playbook/campaign/${playbook}`);

  let data = await response.json();

  let requestedPlaybook = data[0].objects

  description.innerHTML = staticInfo(requestedPlaybook)
}