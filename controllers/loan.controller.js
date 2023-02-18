const Loan = require("../models/Loan.model")
const Book = require("../models/Book.model")

module.exports.doCreateLoan = (req, res, next) => {
  Book.findById(req.params.id) 
    .then(book => {
      const loanInfo = {
        petitioner: req.user,
        receiver: book.user,
        status: "pendingAcceptance",
        bookFromReceiver: book.id
      }
      Loan.create(loanInfo)
        .then(loan => {
          res.redirect("/books/browser")
        })
    })
}