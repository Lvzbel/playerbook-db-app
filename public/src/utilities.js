const findById = (data, id) => {
  const report = data.find(o => o.id === id);
  return report
}

const getObjectFromPlaybook = (id_in, playbook) => {
  return playbook.find(o => o.id === id_in);
}

const getTypeFromReport = (type, report, playbook) => {
  return report.object_refs.filter(o => o.startsWith(type)).map(o => getObjectFromPlaybook(o, playbook));
}

const filterByKCP = (phase, attack_patterns) => {
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

export { findById, getObjectFromPlaybook, getTypeFromReport, filterByKCP};