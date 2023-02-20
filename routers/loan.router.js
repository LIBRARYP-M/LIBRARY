const router = require('express').Router();

const authMiddleware = require("../middlewares/auth.middleware");
const loanController = require("../controllers/loan.controller");

router.post("/:id/create", authMiddleware.isAuthenticated, loanController.doCreateLoan)

router.get("/:id/request", authMiddleware.isAuthenticated, loanController.request)

router.post("/:id/accept", authMiddleware.isAuthenticated, loanController.doAccept)
router.post("/:id/reject", authMiddleware.isAuthenticated, loanController.doReject)

module.exports = router