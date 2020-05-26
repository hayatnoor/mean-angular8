const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const wordCtrl = require('../controllers/word.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))


router.route('/')
  .post(asyncHandler(insert));

router.route('/')
  .get(asyncHandler(getAll));

router.route('/')
  .delete(asyncHandler(deleteOne));

async function insert(req, res) {
  let word = await wordCtrl.insert(req.body);
  res.json(word);
}

async function getAll(req, res) {
  let words = await wordCtrl.getAll(req.body);
  res.json(words);
}

async function deleteOne(req, res) {
  let words = await wordCtrl.deleteOne(req.query);
  res.json(words);
}
