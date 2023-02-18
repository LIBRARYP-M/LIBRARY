const router = require('express').Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const booksController = require("../controllers/books.controller")

router.get('/', authMiddleware.isAuthenticated, authController.home);

router.get("/signup", authMiddleware.isNotAuthenticated, authController.signup);
router.post("/signup", authMiddleware.isNotAuthenticated, authController.doSignup);

router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin);

router.get("/logout", authMiddleware.isAuthenticated, authController.doLogout);

router.get("/books/create", authMiddleware.isAuthenticated, booksController.create);
router.post("/books/create", authMiddleware.isAuthenticated, booksController.doCreate);

router.get("/books/list", authMiddleware.isAuthenticated, booksController.list)

router.get("/books/:id/edit", authMiddleware.isAuthenticated, booksController.edit)
router.post("/books/:id/edit", authMiddleware.isAuthenticated, booksController.doEdit)

router.post("/books/:id/delete", authMiddleware.isAuthenticated, booksController.doDelete)

module.exports = router;
