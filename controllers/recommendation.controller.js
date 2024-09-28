exports.findAll = async (req, res) => {
  res.status(200).json({ msg: "find all recommendations" });
};

exports.findOne = async (req, res) => {
  res.status(200).json({ msg: "find a recommendation" });
};

exports.create = async (req, res) => {
  res.status(200).json({ msg: "recommendation created" });
};
