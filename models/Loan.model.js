const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    petitioner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ["pendingAcceptance", "accepted", "petitionerClosed", "recieverClosed", "closed"]
    },
    bookFromReceiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  }
)

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
