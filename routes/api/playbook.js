const express = require('express');
const router = express.Router();
let playbookName = 'oilrig'

// Importing Playbook Model
const Playbook = require('../../models/playbook');

// @route   GET api/playbook
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  // Playbook.find({ "playbook": "tick" })
  //   .then(playbook => res.json(playbook))
  res.send(console.log(req.params.playbook));
});

// router.get('/test', (req, res) => {
//   Playbook.collection.collectionName('oilrig')
//     .then(playbook => res.json(playbook))
// });

// @route   POST api/playbook
// @desc    Create Post
// @access  Public
router.post('/', (req, res) => {
  const newPlaybook = new Playbook
})

module.exports = router;