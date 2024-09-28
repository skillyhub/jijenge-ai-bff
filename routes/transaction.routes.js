const router = require("express").Router();
const {
  analyzeBusiness,
  requestLoan,
  findOne,
  create,
} = require("../controllers/transaction.controller");

router.post("/", create);
router.post("/analyze", analyzeBusiness);
router.post("/request-loan", requestLoan);
router.get("/:id", findOne);

module.exports = router;
