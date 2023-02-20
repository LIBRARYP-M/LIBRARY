const router = require('express').Router();
const passport = require('passport');
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const booksController = require("../controllers/books.controller");
const exchangeController = require("../controllers/exchange.controller");
const loanController = require("../controllers/loan.controller")
const upload = require('../config/cloudinary.config');

const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email"
];

router.get('/login/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }));
router.get('/auth/google/callback', authController.doLoginGoogle);

router.get('/',authController.home);

router.get('/books/browser', booksController.browser);

router.get("/signup", authMiddleware.isNotAuthenticated, authController.signup);
router.post("/signup", authMiddleware.isNotAuthenticated, upload.single('image'), authController.doSignup);

router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin);

router.get("/logout", authMiddleware.isAuthenticated, authController.doLogout);

router.get("/books/create", authMiddleware.isAuthenticated, booksController.create);
router.post("/books/create", authMiddleware.isAuthenticated, upload.single('image'), booksController.doCreate);

router.get("/books/list", authMiddleware.isAuthenticated, booksController.list)

router.get("/books/:id/edit", authMiddleware.isAuthenticated, booksController.edit)
router.post("/books/:id/edit", authMiddleware.isAuthenticated, booksController.doEdit)

router.post("/books/:id/delete", authMiddleware.isAuthenticated, booksController.doDelete)

router.get("/exchange/:id/prepareSelection", authMiddleware.isAuthenticated, exchangeController.prepareSelection)

router.post("/exchange/:selectedBook/:requestedBook/create", authMiddleware.isAuthenticated, exchangeController.doExchange)

router.get("/exchange/:id/request", authMiddleware.isAuthenticated, exchangeController.request)

router.post("/exchange/:id/accept", authMiddleware.isAuthenticated, exchangeController.doAccept)
router.post("/exchange/:id/reject", authMiddleware.isAuthenticated, exchangeController.doReject)

router.post("/loan/:id/create", authMiddleware.isAuthenticated, loanController.doCreateLoan)

router.get("/loan/:id/request", authMiddleware.isAuthenticated, loanController.request)

router.post("/loan/:id/accept", authMiddleware.isAuthenticated, loanController.doAccept)
router.post("/loan/:id/reject", authMiddleware.isAuthenticated, loanController.doReject)

module.exports = router;
