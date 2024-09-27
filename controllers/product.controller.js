exports.findAll = async (req, res) => {
  res.status(200).json({ msg: "find all products" });
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
