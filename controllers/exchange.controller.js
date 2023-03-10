const Exchange = require("../models/Exchange.model")
const Book = require("../models/Book.model")
const User = require("../models/User.model")
const sendMail = require("../config/nodemailer.config")

module.exports.prepareSelection = (req, res, next) => {
  const bookId = req.params.id

  Book.find({user: req.user.id})
    .then(books => {
      if(books.length === 0) {
        res.redirect("/books/create")
      } else {
        console.log(books)
        res.render("books/booksToSelect", { books, bookId })
      }    
    })
    .catch(next)
}

module.exports.doExchange = (req, res, next) => {
  Book.findById(req.params.requestedBook)
    .then(book => {
      console.log("book", book)
      const exchangeInfo = {
        petitioner: req.user,
        receiver: book.user,
        status: "pendingAcceptance",
        bookFromPetitioner: req.params.selectedBook,
        bookFromReceiver: book.id
      }

      Exchange.create(exchangeInfo)
        .then(exchange => {
          User.findById(book.user)
            .then(user => {
              sendMail(user.email, "request", "exchange", user, exchange.id)
              res.redirect("/books/browser")
            })
        })
    })
}

module.exports.request = (req, res, next) => {
  Exchange.findById(req.params.id)
    .then(exchange => {
      const petitionerPromise = User.findById(exchange.petitioner)
      const bookFromPetitionerPromise = Book.findById(exchange.bookFromPetitioner)
      const bookFromReceiverPromise = Book.findById(exchange.bookFromReceiver)
      Promise.all([petitionerPromise, bookFromPetitionerPromise, bookFromReceiverPromise])
        .then(response => {
          const [petitioner, bookFromPetitioner, bookFromReceiver] = response
          res.render("exchange/info", { exchange, petitioner, bookFromPetitioner, bookFromReceiver })
        })
    })
}

module.exports.doAccept = (req, res, next) => {
  Exchange.findByIdAndUpdate(req.params.id, {"status": "accepted"})
    .then(exchange => {
      const promise1 = Book.findByIdAndUpdate(exchange.bookFromPetitioner, {"inAnAcceptedRequest": "true"})
      const promise2 = Book.findByIdAndUpdate(exchange.bookFromReceiver, {"inAnAcceptedRequest": "true"})
      const userPromise = User.findById(exchange.petitioner)
      Promise.all([promise1, promise2, userPromise])
        .then(response => {
          const user = response[2]
          res.render("exchange/accepted", { user })
          sendMail(user.email, "accepted", "exchange", req.user, exchange.id)
        })
    })
}

module.exports.doReject = (req, res, next) => {
  Exchange.findByIdAndUpdate(req.params.id, {"status": "rejected"})
    .then(exchange => {
      User.findById(exchange.petitioner)
        .then(user => {
          sendMail(user.email, "rejected", "exchange", req.user, exchange.id)
          res.redirect("/books/browser")
        })
    })
}

module.exports.doClose = (req, res, next) => {
  Exchange.findByIdAndUpdate(req.params.id, {"status": "closed"})
    .then(exchange => {
      const promise1 = Book.findByIdAndUpdate(exchange.bookFromPetitioner, {"inAnAcceptedRequest": "false"})
      const promise2 = Book.findByIdAndUpdate(exchange.bookFromReceiver, {"inAnAcceptedRequest": "false"})
      Promise.all([promise1, promise2,])
        .then(response => {
          res.redirect("/user/profile")
        })
    })
}