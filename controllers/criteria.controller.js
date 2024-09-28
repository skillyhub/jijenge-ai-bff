const Criteria = require("../models/criteria.model");

exports.findAll = async (req, res) => {
  try {
    const allCriterias = await Criteria.find();
    return res.status(200).json(allCriterias);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.findOne = async (req, res) => {
  try {
    const criteria = await Criteria.findOne({ _id: req.params.id });
    if (!criteria) return res.status(404).json("Criteria not found");

    return res.status(200).json(criteria);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.create = async (req, res) => {
  try {
    const newCriteria = new Criteria(req.body);
    const savedCriteria = await newCriteria.save();
    return res.status(201).json(savedCriteria);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
