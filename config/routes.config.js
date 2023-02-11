const router = require('express').Router();
const authController = require("../controllers/auth.controller");

router.get('/', authController.home);

router.get("/signup", authController.signup);
router.post("/signup", authController.doSignup);

module.exports = router;
