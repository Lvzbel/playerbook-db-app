
const playbooks = document.getElementsByClassName('playbooks');

document.addEventListener('click', (event) => {
  const clickedPlaybook = event.originalTarget.id
  fetchPlaybook(clickedPlaybook);
})

const fetchPlaybook = async (playbook) => {
  let response = await fetch(`${window.location}api/playbook/campaign/${playbook}`);

  let data = await response.json();

  let requestedPlaybook = data[0].objects

  // Render all playbook static info
  playbookDescription(requestedPlaybook)
  playbookIntrusion(playbook)
  playbookCampaigns(requestedPlaybook)
  playbookIndicator(requestedPlaybook)
  playbookAttacks(requestedPlaybook)
  campaignDuration(requestedPlaybook)
}