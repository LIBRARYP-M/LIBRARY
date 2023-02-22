const User = require("../models/User.model")
const Book = require("../models/Book.model")
const Exchange = require("../models/Exchange.model")
const Loan = require("../models/Loan.model")

module.exports.profile = (req,res, next) => {
  User.findById(req.user.id)
    .then(user => {
      Book.find({"user": user.id})
        .then(books => {
          Exchange.find({$or: [{"petitioner": user.id}, {"receiver": user.id}]})
            .then(exchanges => {
              let exchangesArr = []
              let exchangeFinished = false
              exchanges.forEach((exchange, i) => {
                const petitionerBookPromise = Book.findById(exchange.bookFromPetitioner)
                const receiverBookPromise = Book.findById(exchange.bookFromReceiver)
                const petitionerUserPromise = User.findById(exchange.petitioner)
                const receiverUserPromise = User.findById(exchange.receiver)
                const status = exchange.status

                Promise.all([petitionerBookPromise, receiverBookPromise, petitionerUserPromise, receiverUserPromise])
                  .then(response => {
                    const [petitionerBook, receiverBook, petitionerUser, receiverUser] = response
                    exchangesArr.push({petitionerBook, receiverBook, petitionerUser, receiverUser, status})
                    if(exchangesArr.length === exchanges.length) {
                      exchangeFinished = true
                    }
                  })
                  .catch(err => console.log(err))
              })
              if(exchangeFinished = true) {
                console.log("slayy")
                Loan.find({$or: [{"petitioner": user.id}, {"receiver": user.id}]})
                  .then(loans => {
                    let loansArr = []
                    let loansFinished = false
                    loans.forEach(loan => {
                      const receiverBookPromise = Book.findById(loan.bookFromReceiver)
                      const petitionerUserPromise = User.findById(loan.petitioner)
                      const receiverUserPromise = User.findById(loan.receiver)
                      const status = loan.status

                      Promise.all([receiverBookPromise, petitionerUserPromise, receiverUserPromise])
                        .then(response => {
                          const [receiverBook, petitionerUser, receiverUser] = response
                          loansArr.push({receiverBook, petitionerUser, receiverUser, status})
                          if(loansArr.length === loans.length) {
                            loansFinished = true
                          }
                        })
                    })
                    if(loansFinished = true) {
                      res.render("user/profile", { user, books, exchangesArr, loansArr})
                    }
                  })
              }
            })
            .catch(err => console.log(err))
        // res.render("user/profile", { user, books })
        })
    })
}