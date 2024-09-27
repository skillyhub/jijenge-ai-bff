exports.findAll = async (req, res) => {
  res.status(200).json({ msg: "find all suggestions" });
};

exports.findOne = async (req, res) => {
  res.status(200).json({ msg: "find one suggestion" });
};

exports.create = async (req, res) => {
  res.status(200).json({ msg: "suggestion created" });
};

exports.update = async (req, res) => {
  res.status(200).json({ msg: `suggestion ${req.params.id} updated` });
};

exports.archive = async (req, res) => {
  res.status(200).json({ msg: `suggestion ${req.params.id} archived` });
};
