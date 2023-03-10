const router = require('express').Router();
const passport = require('passport');
const upload = require('../config/cloudinary.config');

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email"
];

router.get('/',authController.home);

router.get('/login/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }));
router.get('/auth/google/callback', authController.doLoginGoogle);

router.get("/signup", authMiddleware.isNotAuthenticated, authController.signup);
router.post("/signup", authMiddleware.isNotAuthenticated, upload.single('image'), authController.doSignup);

router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin);

router.get("/logout", authMiddleware.isAuthenticated, authController.doLogout);

module.exports = router