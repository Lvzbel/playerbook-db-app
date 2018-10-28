import { findById, getTypeFromReport } from './utilities';
import { buildPhaseContainer } from './dynamic-render';
import { currentPlaybook } from './fetch';

const descriptionElement = document.querySelector("#description-text");
const intrusionElement = document.querySelector("#intrusion");
const campaignsElement = document.querySelector("#campaign");
const indicatorsElement = document.querySelector("#indicators");
const attacksElement = document.querySelector("#attacks");
const timeLineElement = document.querySelector("#timeline");



class StaticRender {
  static playbookDescription(data) {
    const report = data.find(o => o.type === "report");

    let description = report.description;
    let descWithBreaks = description.replace(/\r\n/g, "</br>");

    descriptionElement.innerHTML = descWithBreaks;
  }

  static playbookIntrusion(playbookName) {
    intrusionElement.innerHTML = playbookName;
  }

  static playbookCampaigns(data) {
    const campaigns = data.filter(o => o.type === "campaign");
    const campaignsQuantity = campaigns.length;

    campaignsElement.innerHTML = campaignsQuantity.toString();
  }

  static playbookIndicator(data) {
    const indicators = data.filter(o => o.type === "indicator");
    const indicatorsQuantity = indicators.length;

    indicatorsElement.innerHTML = indicatorsQuantity.toString();
  }

  static playbookAttacks(data) {
    const attacks = data.filter(o => o.type === "attack-pattern");
    const attacksQuantity = attacks.length;

    attacksElement.innerHTML = attacksQuantity.toString();
  }

  static addReportLinks(playbook) {
    //For now this just lists the plays, by name, at the bottom, and makes them Buttons
    let reports = playbook.filter(o => o.type === "report");
    // Clear old dates
    timeLineElement.innerHTML = "";
    //The Main report is only going to contain other reports
    //The other reports contain a campaign object with a date inside it.
    let parsed_reports = [];

    reports.forEach(r => {
      const { labels } = r;
      if (labels.includes("intrusion-set")) {
        // Check this variable
        let current_intrusion_set = getTypeFromReport(
          "intrusion-set",
          r,
          playbook
        )[0].name;
      } else {
        let campaign = getTypeFromReport("campaign", r, playbook);
        const first_seen = new Date(campaign[0]["first_seen"]);
        const last_seen = new Date(campaign[0]["last_seen"]);
        let campaign_length_in_days = Math.floor(
          (last_seen - first_seen) / 86400000
        );
        parsed_reports.push({
          id: r.id,
          first_seen: first_seen,
          last_seen: last_seen,
          campaign_length: campaign_length_in_days,
          name: r["name"]
        });
      }
    });

    parsed_reports
      .sort((a, b) => a.first_seen.getTime() - b.first_seen.getTime())
      .reverse();

    parsed_reports.forEach(r => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const start_text =
        months[r.first_seen.getMonth()] + " " + r.first_seen.getFullYear();
      const end_text =
        months[r.last_seen.getMonth()] + " " + r.last_seen.getFullYear();
      const date_text = start_text + " to " + end_text;
      // const debug_text = date_text + " (" + r['name'] + ")";

      const li = document.createElement("li");
      li.setAttribute("report_id", `${r.id}`);
      li.innerHTML = date_text;
      li.addEventListener("click", event => {
        const reportId = li.getAttribute("report_id");
        const report = findById(currentPlaybook, reportId);
        buildPhaseContainer(report, currentPlaybook);
      });
      timeLineElement.appendChild(li);
    });
  }
}

export { StaticRender as default };