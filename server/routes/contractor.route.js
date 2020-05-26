const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const contractorCtrl = require('../controllers/contractor.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));


router.route('/').post(asyncHandler(insert));
router.route('/').get(asyncHandler(list));
router.route('/:id').get(asyncHandler(findOne));
router.route('/').put(asyncHandler(update));

async function insert(req, res) {
  let contractor = await contractorCtrl.insert(req.body);
  res.json(contractor);
}

async function list(req, res) {
  let contractors = await contractorCtrl.list();
  res.json(contractors);
}

async function findOne(req, res) {
  let id = req.params.id;
  let contractor = await contractorCtrl.findOne(id);
  res.json(contractor);
}

async function update(req, res) {
  let contractor = await contractorCtrl.update(req.body);
  res.json(contractor);
}
