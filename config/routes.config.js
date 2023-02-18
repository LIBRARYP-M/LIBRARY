const router = require('express').Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const booksController = require("../controllers/books.controller");
const exchangeController = require("../controllers/exchange.controller");
const loanController = require("../controllers/loan.controller")
const upload = require('../config/cloudinary.config');

router.get('/');

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

router.post("/loan/:id/create", authMiddleware.isAuthenticated, loanController.doCreateLoan)

module.exports = router;
