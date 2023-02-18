const router = require('express').Router();

const authMiddleware = require("../middlewares/auth.middleware");
const loanController = require("../controllers/loan.controller");

router.post("/loan/:id/create", authMiddleware.isAuthenticated, loanController.doCreateLoan)

router.get("/loan/:id/request", authMiddleware.isAuthenticated, loanController.request)

router.post("/loan/:id/accept", authMiddleware.isAuthenticated, loanController.doAccept)
router.post("/loan/:id/reject", authMiddleware.isAuthenticated, loanController.doReject)

module.exports = router