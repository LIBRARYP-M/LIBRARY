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
            .populate("bookFromPetitioner bookFromReceiver petitioner receiver")
            .then(exchanges => {
              Loan.find({$or: [{"petitioner": user.id}, {"receiver": user.id}]})
                .populate("bookFromReceiver petitioner receiver")
                .then(loans => {
                  res.render("user/profile", { user, books, exchanges, loans})
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        // res.render("user/profile", { user, books })
        })
    })
}