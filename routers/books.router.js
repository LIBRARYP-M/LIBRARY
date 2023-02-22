const router = require('express').Router();
const upload = require('../config/cloudinary.config');

const authMiddleware = require("../middlewares/auth.middleware");
const booksController = require("../controllers/books.controller");

router.get('/browser', booksController.browser);
router.get('/browser/:criteria', booksController.browserFiltered);

router.get("/create", authMiddleware.isAuthenticated, booksController.create);
router.post("/create", authMiddleware.isAuthenticated, upload.single('image'), booksController.doCreate);

// router.get("/list", authMiddleware.isAuthenticated, booksController.list)

router.get("/:id/edit", authMiddleware.isAuthenticated, booksController.edit)
router.post("/:id/edit", authMiddleware.isAuthenticated, booksController.doEdit)

router.post("/:id/delete", authMiddleware.isAuthenticated, booksController.doDelete)

module.exports = router