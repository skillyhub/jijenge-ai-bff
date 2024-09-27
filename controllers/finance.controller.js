exports.findAll = async (req, res) => {
  res.status(200).json({ msg: "find all finance operations" });
};

exports.findOne = async (req, res) => {
  res.status(200).json({ msg: "find one finance operation" });
};

exports.create = async (req, res) => {
  res.status(200).json({ msg: "finance operation created" });
};

exports.update = async (req, res) => {
  res.status(200).json({ msg: `finance operation ${req.params.id} updated` });
};

exports.archive = async (req, res) => {
  res.status(200).json({ msg: `finance operation ${req.params.id} archived` });
};
