const router = require("express").Router();
const {
  findAll,
  findOne,
  create,
  update,
  archive,
} = require("../controllers/recommendation.controller");

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/:id", create);

module.exports = router;
