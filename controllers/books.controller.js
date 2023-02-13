const mongoose = require("mongoose");
const Book = require("../models/Book.model");
const { specialEditionParser } = require("../models/helpers/books.helper");

const languages = Book.schema.path('language').enumValues;
const genres = Book.schema.path('genre').enumValues;

module.exports.create = (req, res, next) => {
  res.render('books/createForm', {
    languages, genres
  });
};

module.exports.doCreate = (req, res, next) => {
  const renderWithErrors = (errors) => {
    res.status(400).render('books/createForm', {
      book: req.body,
      errors,
      languages,
      genres
    });
  };

  const newBook = {
    title: req.body.title,
    author: req.body.author,
    language: req.body.language,
    specialEdition: specialEditionParser(req.body.specialEdition),
    genre: req.body.genre,
    user: req.user.id
  };

  Book.create(newBook)
    .then(book => {
      res.redirect('/');
    })
    .catch(err => {
      console.log('catch')
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors)
      } else {
        next(err)
      }
    })

}
