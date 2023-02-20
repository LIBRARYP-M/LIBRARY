const router = require('express').Router();

const authMiddleware = require("../middlewares/auth.middleware");
const exchangeController = require("../controllers/exchange.controller");

router.get("/:id/prepareSelection", authMiddleware.isAuthenticated, exchangeController.prepareSelection)

router.post("/:selectedBook/:requestedBook/create", authMiddleware.isAuthenticated, exchangeController.doExchange)

router.get("/:id/request", authMiddleware.isAuthenticated, exchangeController.request)

router.post("/:id/accept", authMiddleware.isAuthenticated, exchangeController.doAccept)
router.post("/:id/reject", authMiddleware.isAuthenticated, exchangeController.doReject)

module.exports = router