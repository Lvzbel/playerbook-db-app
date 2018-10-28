const descriptionElement = document.querySelector("#description-text");
const intrusionElement = document.querySelector("#intrusion");
const campaignsElement = document.querySelector("#campaign");
const indicatorsElement = document.querySelector("#indicators");
const attacksElement = document.querySelector("#attacks");
const timeLineElement = document.querySelector("#timeline");

const reconElement = document.querySelector('#recon');
const weapElement = document.querySelector('#weaponization');
const deliveryElement = document.querySelector('#delivery');
const exploidElement = document.querySelector('#exploit');
const installElement = document.querySelector('#install');
const commandElement = document.querySelector('#command');
const objectiveElement = document.querySelector('#objective');

const findById = (data, id) => {
  const report = data.find(o => o.id === id);
  return report
}

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

function addReportLinks(playbook) {
  //For now this just lists the plays, by name, at the bottom, and makes them Buttons
  let reports = playbook.filter(o => o.type === 'report');
  // Clear old dates
  timeLineElement.innerHTML = ''
  //The Main report is only going to contain other reports
  //The other reports contain a campaign object with a date inside it.
  let parsed_reports = [];

  reports.forEach(r => {
      const {labels} = r;
      if (labels.includes('intrusion-set')) {
          current_intrusion_set = getTypeFromReport("intrusion-set", r, playbook)[0].name;
      } else {
          let campaign = getTypeFromReport("campaign", r, playbook);
          const first_seen = new Date(campaign[0]['first_seen']);
          const last_seen = new Date(campaign[0]['last_seen']);
          let campaign_length_in_days = Math.floor((last_seen - first_seen) / 86400000);
          parsed_reports.push({
              "id": r.id,
              "first_seen": first_seen,
              "last_seen": last_seen,
              "campaign_length": campaign_length_in_days,
              "name": r['name']
          })
      }
  });

  parsed_reports.sort((a, b) => a.first_seen.getTime() - b.first_seen.getTime()).reverse();

  parsed_reports.forEach(r => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const start_text = (months[r.first_seen.getMonth()]) + " " + r.first_seen.getFullYear();
      const end_text = (months[r.last_seen.getMonth()]) + " " + r.last_seen.getFullYear();
      const date_text = start_text + " to " + end_text;
      // const debug_text = date_text + " (" + r['name'] + ")";

      const li = document.createElement("li");
      li.setAttribute("report_id", `${r.id}`)
      li.innerHTML = date_text;
      li.addEventListener('click', (event) => {
        const reportId = li.getAttribute("report_id");
        const report = findById(currentPlaybook, reportId)
        buildPhaseContainer(report, currentPlaybook)
        
      })
      timeLineElement.appendChild(li);
  });
}

function filterByKCP(phase, attack_patterns) {
  return attack_patterns.filter(ap => {
      let item;
      for (item in ap.kill_chain_phases) {
          let kc = ap.kill_chain_phases[item];
          if (kc.kill_chain_name === "lockheed" && kc.phase_name === phase) {
              return ap;
          }
      }
  });
}

// Build Dynamic Information
function buildPhaseContainer(report, playbook) {
  let attack_patterns = getTypeFromReport("attack-pattern", report, playbook);
  let campaign = getTypeFromReport("campaign", report, playbook)[0];

  let recon = filterByKCP("recon", attack_patterns);
  let weap = filterByKCP("weaponization", attack_patterns);
  let delivery = filterByKCP("delivery", attack_patterns);
  let exploit = filterByKCP("exploitation", attack_patterns);
  let install = filterByKCP("installation", attack_patterns);
  let command = filterByKCP("command-and-control", attack_patterns);
  let objective = filterByKCP("act-on-objectives", attack_patterns);

  let table_length = Math.max(
      recon.length, weap.length, delivery.length, exploit.length, install.length, command.length, objective.length
  );
  
  const dataTest = {
    recon: recon,
    weap: weap,
    delivery: delivery,
    exploit: exploit,
    install: install,
    command: command,
    objective: objective
  }

  Object.entries(dataTest).forEach(entry => {
    let key = entry[0];
    let value = entry[1];
    let element;

    // The key determines which element to use
    switch(key) {
      case 'recon':
        element = reconElement;
        break
      case 'weap':
        element = weapElement;
        break
      case 'delivery':
        element = deliveryElement;
        break
      case 'exploit':
        element = exploidElement;
        break
      case 'install':
        element = installElement;
        break
      case 'command':
        element = commandElement;
        break
      case 'objective':
        element = objectiveElement;
        break
    }

    // Clear older HTML content
    element.innerHTML = '';

    // Iterate and build and insert HTML
    if (value.length !== 0) {
      value.forEach(object => {
        const div = document.createElement('div');
        div.setAttribute("id", `${object.id}`)
        div.className = 'dynamic-info'
        div.innerHTML = object.name
        element.appendChild(div);
      })
    }
  });
}

let intersection = function () {
  return Array.from(arguments).reduce((previous, current) => {
      return previous.filter(element => {
          return current.indexOf(element) > -1;
      });
  });
};

function getTypeFromReport(type, report, playbook) {
  return report.object_refs.filter(o => o.startsWith(type)).map(o => getObjectFromPlaybook(o, playbook));
}

function getObjectFromPlaybook(id_in, playbook) {
  return playbook.find(o => o.id === id_in);
}