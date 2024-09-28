const router = require("express").Router();
const { signup, login } = require("../controllers/user.controller");

router.post("/login", signup);
router.put("/signup", login);

module.exports = router;
