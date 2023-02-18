const Exchange = require("../models/Exchange.model")
const Book = require("../models/Book.model")

module.exports.prepareSelection = (req, res, next) => {

  const bookId = req.params.id

  Book.find({user: req.user.id})
    .then(books => {
      console.log(bookId)
      res.render("books/booksToSelect", { books, bookId })    
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
          res.redirect("/books/browser")
        })
    })
}