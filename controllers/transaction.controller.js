exports.findAll = async (req, res) => {
  res.status(200).json({ msg: "find all transactions" });
};

exports.findOne = async (req, res) => {
  res.status(200).json({ msg: "find one transaction" });
};

exports.create = async (req, res) => {
  res.status(200).json({ msg: "transaction created" });
};

exports.update = async (req, res) => {
  res.status(200).json({ msg: `transaction ${req.params.id} updated` });
};

exports.archive = async (req, res) => {
  res.status(200).json({ msg: `transaction ${req.params.id} archived` });
};
