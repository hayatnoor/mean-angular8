const Joi = require('joi');
const Contractor = require('../models/contractor.model');


const contractorSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  company: Joi.string().required(),
  job: Joi.number().required()
});


module.exports = {
  insert,
  list,
  findOne,
  update
};


async function insert(contractor) {
  contractor = await Joi.validate(contractor, contractorSchema, { abortEarly: false });
  return await new Contractor(contractor).save();
}

async function list() {
  return await Contractor.find();
}

async function findOne(id) {
  return await Contractor.findOne({_id: id});
}

async function update(contractor) {
  return await Contractor.findOneAndUpdate({ _id: contractor._id }, contractor, {upsert: true});
}


