const description = document.getElementById('description-text');

const staticInfo = (data) => {
  const report = data.find(o => o.type === 'report')
  description.innerHTML = report.description
}
