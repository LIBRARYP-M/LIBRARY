const router = require('express').Router();
const passport = require('passport');
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const booksController = require("../controllers/books.controller");


const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email"
];

router.get('/login/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }));
router.get('/auth/google/callback', authController.doLoginGoogle);

router.get('/');

router.get('/books/browser', booksController.browser);

router.get("/signup", authMiddleware.isNotAuthenticated, authController.signup);
router.post("/signup", authMiddleware.isNotAuthenticated, authController.doSignup);

router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin);

router.get("/logout", authMiddleware.isAuthenticated, authController.doLogout);

router.get("/books/create", authMiddleware.isAuthenticated, booksController.create);
router.post("/books/create", authMiddleware.isAuthenticated, booksController.doCreate);

router.get("/books/list", authMiddleware.isAuthenticated, booksController.list)

router.get("/books/:id/edit", authMiddleware.isAuthenticated, booksController.edit)

router.post("/books/:id/delete", authMiddleware.isAuthenticated, booksController.doDelete)

module.exports = router;
