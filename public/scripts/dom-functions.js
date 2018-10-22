const descriptionElement = document.querySelector("#description-text");
const intrusionElement = document.querySelector("#intrusion");
const campaignsElement = document.querySelector("#campaign");
const indicatorsElement = document.querySelector("#indicators");
const attacksElement = document.querySelector("#attacks");
const timeLineElement = document.querySelector("#timeline");

const playbookDescription = data => {
  const report = data.find(o => o.type === "report");

  let description = report.description
  let descWithBreaks = description.replace(/\r\n/g, "</br>")

  descriptionElement.innerHTML = descWithBreaks;
};

const playbookIntrusion = data => {
  intrusionElement.innerHTML = data;
};

const playbookCampaigns = data => {
  const campaigns = data.filter(o => o.type === "campaign");
  campaignsQuantity = campaigns.length;

  campaignsElement.innerHTML = campaignsQuantity.toString();
};

const playbookIndicator = data => {
  const indicators = data.filter(o => o.type === "indicator");
  indicatorsQuantity = indicators.length;

  indicatorsElement.innerHTML = indicatorsQuantity.toString();
};

const playbookAttacks = data => {
  const attacks = data.filter(o => o.type === "attack-pattern");
  attacksQuantity = attacks.length;

  attacksElement.innerHTML = attacksQuantity.toString();
};

const campaignDuration = data => {
  const campaigns = data.filter(o => o.type === "campaign");

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

  // Clear old dates
  timeLineElement.innerHTML = ''

  campaigns.forEach(element => {
    const li = document.createElement("li");

    const first_seen = new Date(element.first_seen);
    const last_seen = new Date(element.last_seen);

    const liDateContent = `${
      months[first_seen.getMonth()]
    } ${first_seen.getFullYear()} to ${
      months[last_seen.getMonth()]
    } ${last_seen.getFullYear()}`;

    li.innerHTML = liDateContent;

    timeLineElement.appendChild(li);
  });
};
