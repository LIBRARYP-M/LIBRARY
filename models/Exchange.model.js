const mongoose = require("mongoose");

const exchangeSchema = new mongoose.Schema(
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
      enum: ["pendingAcceptance", "accepted", "rejected", "petitionerClosed", "recieverClosed", "closed"]
    },
    bookFromPetitioner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    bookFromReceiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  }
)

const Exchange = mongoose.model('Exchange', exchangeSchema);

module.exports = Exchange;
