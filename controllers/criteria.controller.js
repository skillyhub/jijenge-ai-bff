exports.findAll = async (req, res) => {
  res.status(200).json({ msg: "find all criterias" });
};

exports.findOne = async (req, res) => {
  res.status(200).json({ msg: "find one criteria" });
};

exports.create = async (req, res) => {
  res.status(200).json({ msg: "criteria created" });
};

exports.update = async (req, res) => {
  res.status(200).json({ msg: `criteria ${req.params.id} updated` });
};

exports.archive = async (req, res) => {
  res.status(200).json({ msg: `criteria ${req.params.id} archived` });
};
