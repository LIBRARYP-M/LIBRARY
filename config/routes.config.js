const router = require('express').Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get('/', authMiddleware.isAuthenticated, authController.home);

router.get("/signup", authMiddleware.isNotAuthenticated, authController.signup);
router.post("/signup", authMiddleware.isNotAuthenticated, authController.doSignup);

router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin);

router.get("/logout", authMiddleware.isAuthenticated, authController.doLogout);

module.exports = router;
