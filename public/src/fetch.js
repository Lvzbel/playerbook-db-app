import StaticRender from './static-render';

let currentPlaybook;

// Need to figure where to set this variable
let currentReports;

class FetchData {
  static async fetchPlaybook(playbook) {
    let response = await fetch(
      `${window.location}api/playbook/campaign/${playbook}`
    );

    let data = await response.json();

    let requestedPlaybook = data[0].objects;

    // Render all playbook static info
    StaticRender.playbookDescription(requestedPlaybook);
    StaticRender.playbookIntrusion(playbook);
    StaticRender.playbookCampaigns(requestedPlaybook);
    StaticRender.playbookIndicator(requestedPlaybook);
    StaticRender.playbookAttacks(requestedPlaybook);
    StaticRender.addReportLinks(requestedPlaybook);

      currentPlaybook = requestedPlaybook;
  }
}

export { FetchData, currentPlaybook };