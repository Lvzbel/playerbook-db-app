let currentPlaybook;
let currentReports;

class FetchData {

  static async fetchPlaybook(playbook) {
    let response = await fetch(`${window.location}api/playbook/campaign/${playbook}`);

    let data = await response.json();
  
    let requestedPlaybook = data[0].objects

    //   // Render all playbook static info
//   // playbookDescription(requestedPlaybook)
//   // playbookIntrusion(playbook)
//   // playbookCampaigns(requestedPlaybook)
//   // playbookIndicator(requestedPlaybook)
//   // playbookAttacks(requestedPlaybook)
//   // addReportLinks(requestedPlaybook);

//   // currentPlaybook = requestedPlaybook;

    console.log(requestedPlaybook);
  }
}

export { FetchData as default };