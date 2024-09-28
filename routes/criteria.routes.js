const router = require("express").Router();
const {
  findAll,
  findOne,
  create,
} = require("../controllers/criteria.controller");

router.post("/", create);
router.get("/", findAll);
router.get("/:id", findOne);

module.exports = router;
