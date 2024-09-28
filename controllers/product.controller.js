const axios = require("axios");

exports.findAll = async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ msg: `error finding products: ${error.message}` });
  }
};

exports.findOne = async (req, res) => {
  res.status(200).json({ msg: "find one product" });
};

exports.create = async (req, res) => {
  res.status(200).json({ msg: "product created" });
};

exports.update = async (req, res) => {
  res.status(200).json({ msg: `product ${req.params.id} updated` });
};

exports.archive = async (req, res) => {
  res.status(200).json({ msg: `product ${req.params.id} archived` });
};
