const router = require("express").Router();
const {
  findAll,
  findOne,
  create,
  update,
  archive,
} = require("../controllers/transaction.controller");

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/:id", create);

module.exports = router;
