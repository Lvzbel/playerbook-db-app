const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Playbook Schema
// Contains require fields and all possible fields
const PlaybookSchema = new mongoose.Schema({
  type: {
      type: String,
      required: true,
  },
  id: {
      type: String,
      required: true,
      unique: true,
  },
  created: {
      type: String,
      required: true,
      default: new Date().toString()
  },
  modified: {
      type: String,
      required: true,
      default: new Date().toString()
  },
  created_by_ref: String,
  description: String,
  external_references: {
      type: Array,
      default: undefined
  },
  first_seen: String,
  kill_chain_phases: {
      type: Array,
      default: undefined
  },
  labels: {
      type: Array,
      default: undefined
  },
  last_seen: String,
  name: String,
  object_marking_refs: String,
  object_refs: {
      type: Array,
      default: undefined
  },
  pattern: String,
  published: String,
  relationship_type: String,
  source_ref: String,
  target_ref: String,
  valid_form: String

});

module.exports = Playbook = mongoose.model('playbook', PlaybookSchema);