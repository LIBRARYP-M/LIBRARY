const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "please enter the title of the book"],
  },
  author: {
    type: String,
    required: [true, "please enter the book's author"],
  },
  language: {
    type: String,
    enum: ['Spanish ', 'English', 'Portuguese', 'French'],
    required: [true, "please enter the book's language"],
  },
  specialEdition: {
    type: Boolean,
    required: [true, "please enter if the book is special edition"],
  },
  genre: {
    type: String,
    enum: ['Poetry', 'Fiction', 'Drama', 'Nonfiction', 'Prose'],
    required: [true, "please enter the book's genre"],
  },
  image: {
    type: String,
    default:
      "https://startupheretoronto.com/wp-content/uploads/2018/04/default-user-image-2.png",
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;