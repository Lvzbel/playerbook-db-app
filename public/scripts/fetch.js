const oilrig = document.getElementById('oilrig');
const sofacy = document.getElementById('sofacy');


const playbooks = document.getElementsByClassName('playbooks');

document.addEventListener('click', (event) => {
  const clickedPlaybook = event.target.attributes.id.nodeValue
  fetch(`${window.location}api/playbook/campaign/${clickedPlaybook}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
})