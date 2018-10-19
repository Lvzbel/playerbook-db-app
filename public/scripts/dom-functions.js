const description = document.querySelector('#description-text');
const intrusion = document.querySelector('#intrusion');

const playbookDescription = (data) => {
  const report = data.find(o => o.type === 'report')

  description.innerHTML = report.description
}

const playbookIntrusion = (data) => {
  intrusion.innerHTML = data
}
