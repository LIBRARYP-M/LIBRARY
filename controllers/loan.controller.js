const Loan = require("../models/Loan.model")
const Book = require("../models/Book.model")
const User = require("../models/User.model")
const sendMail = require("../config/nodemailer.config")

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
          User.findById(book.user)
            .then(user => {
              sendMail(user.email, "request", "loan", user, loan.id)
              res.redirect("/books/browser")
            })
        })
    })
}

module.exports.request = (req, res, next) => {
  Loan.findById(req.params.id)
    .then(loan => {
      const petitionerPromise = User.findById(loan.petitioner)
      const bookFromReceiverPromise = Book.findById(loan.bookFromReceiver)
      Promise.all([petitionerPromise, bookFromReceiverPromise])
        .then(response => {
          const [petitioner, bookFromReceiver] = response
          res.render("loan/info", { loan, petitioner, bookFromReceiver })
        })
    })
}

module.exports.doAccept = (req, res, next) => {
  Loan.findByIdAndUpdate(req.params.id, {"status": "accepted"})
    .then(loan => {
      const promise1 = Book.findByIdAndUpdate(loan.bookFromReceiver, {"inAnAcceptedRequest": "true"})
      const userPromise = User.findById(loan.petitioner)
      Promise.all([promise1, userPromise])
        .then(response => {
          const user = response[1]
          res.render("loan/accepted", { user })
          sendMail(user.email, "accepted", "loan", req.user, loan.id)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

module.exports.doReject = (req, res, next) => {
  Loan.findByIdAndUpdate(req.params.id, {"status": "rejected"})
    .then(loan => {
      User.findById(loan.petitioner)
        .then(user => {
          sendMail(user.email, "rejected", "loan", req.user, loan.id)
          res.redirect("/books/browser")
        })
    })
}