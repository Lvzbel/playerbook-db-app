import { filterByKCP, getTypeFromReport } from "./utilities";

const reconElement = document.querySelector("#recon");
const weapElement = document.querySelector("#weaponization");
const deliveryElement = document.querySelector("#delivery");
const exploidElement = document.querySelector("#exploit");
const installElement = document.querySelector("#install");
const commandElement = document.querySelector("#command");
const objectiveElement = document.querySelector("#objective");

const buildPhaseContainer = (report, playbook) => {
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
    recon.length,
    weap.length,
    delivery.length,
    exploit.length,
    install.length,
    command.length,
    objective.length
  );

  const dataTest = {
    recon: recon,
    weap: weap,
    delivery: delivery,
    exploit: exploit,
    install: install,
    command: command,
    objective: objective
  };

  Object.entries(dataTest).forEach(entry => {
    let key = entry[0];
    let value = entry[1];
    let element;

    // The key determines which element to use
    switch (key) {
      case "recon":
        element = reconElement;
        break;
      case "weap":
        element = weapElement;
        break;
      case "delivery":
        element = deliveryElement;
        break;
      case "exploit":
        element = exploidElement;
        break;
      case "install":
        element = installElement;
        break;
      case "command":
        element = commandElement;
        break;
      case "objective":
        element = objectiveElement;
        break;
    }

    // Clear older HTML content
    element.innerHTML = "";

    // Iterate and build and insert HTML
    if (value.length !== 0) {
      value.forEach(object => {
        const modalMarkup = `
        <div class="modal" id="modal-${object.id}">
          <div class="modal-background"></div>
            <div class="modal-content">
              <!-- Any other Bulma elements you want -->
                <div class = "box">
                  Technique: ${object.name}
                  <br>
                  <a href="${object.external_references.url}">References</a>
                  <br>
                  Description: ${object.description}
                </div>
              <!-- Any other Bulma elements you want -->
            </div>
          <button class="modal-close is-large" aria-label="close" id="button-${object.id}"></button>
        </div>
        `;
        const div = document.createElement("div");
        const viewBox = document.createElement("div")
        
        div.setAttribute("id", `${object.id}`);
        div.className = "dynamic-info";
        viewBox.classList.add('modal-trigger')
        viewBox.setAttribute("id", `modal-box-${object.id}`)
        viewBox.innerHTML = object.name;
        div.appendChild(viewBox)

        div.insertAdjacentHTML('beforeend', modalMarkup);
        

        div.addEventListener('click', (event)=> {
          console.log('Event Fire!')
          const modal = document.querySelector(`#modal-${object.id}`)
          const closeBtn = document.querySelector(`#button-${object.id}`)
          const clickTargetClass = event.target.className
          const clickTargetId = event.target.id
     
          if(clickTargetId === `modal-box-${object.id}` || clickTargetClass === 'modal-background') {
            modal.classList.toggle("is-active")
          }

          closeBtn.addEventListener('click', (event) => {
            modal.classList.toggle("is-active")
          })
        })
        element.appendChild(div);
      });
    }
  });
};

export { buildPhaseContainer };
