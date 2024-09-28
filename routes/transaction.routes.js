const router = require("express").Router();
const {
  analyzeBusiness,
  requestLoan,
  findOne,
  create,
  findAll,
} = require("../controllers/transaction.controller");

router.post("/", create);
router.post("/analyze", analyzeBusiness);
router.post("/request-loan", requestLoan);
router.get("/:id", findOne);
router.get("/", findAll);

module.exports = router;
