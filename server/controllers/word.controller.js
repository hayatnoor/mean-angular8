const Joi = require('joi');
const Word = require('../models/word.model');


const wordSchema = Joi.object({
  word: Joi.string().required()
});


module.exports = {
  insert,
  getAll,
  deleteOne
};


async function insert(word) {
  word = await Joi.validate(word, wordSchema, { abortEarly: false });
  return await new Word(word).save();
}

async function getAll() {
  return await Word.find();
}

async function deleteOne(word) {
  return await Word.deleteOne(word);
}


