const router = require("express").Router();
const {
  findAll,
  findOne,
  create,
  update,
  archive,
} = require("../controllers/suggestion.controller");

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/:id", create);
router.put("/:id", update);
router.delete("/:id", archive);

module.exports = router;
