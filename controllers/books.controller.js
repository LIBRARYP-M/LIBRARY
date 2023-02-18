const mongoose = require("mongoose");
const Book = require("../models/Book.model");
const { specialEditionParser } = require("../models/helpers/books.helper");

const languages = Book.schema.path("language").enumValues;
const genres = Book.schema.path("genre").enumValues;

module.exports.create = (req, res, next) => {
  res.render("books/createForm", {
    languages,
    genres,
  });
};

module.exports.doCreate = (req, res, next) => {
  const renderWithErrors = (errors) => {
    res.status(400).render("books/createForm", {
      book: req.body,
      errors,
      languages,
      genres,
    });
  };

  console.log(req.file)

  const newBook = {
    title: req.body.title,
    author: req.body.author,
    language: req.body.language,
    specialEdition: specialEditionParser(req.body.specialEdition),
    genre: req.body.genre,
    user: req.user.id,
  };

  if(req.file) {
    newBook.image = req.file.path
  }

  Book.create(newBook)
    .then((book) => {
      res.redirect("/books/browser");
    })
    .catch((err) => {
      console.log("catch");
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors);
      } else {
        next(err);
      }
    });
};

module.exports.browser = (req, res, next) => {
  if (req.user) {
    Book.find({user: {$ne: req.user.id}})
    .then((books) => {
      res.render("books/booksBrowser", { books });
    })
    .catch(next)
  } else {
  Book.find()
    .then((books) => {
      res.render("books/booksBrowser", { books });
    })
    .catch(next)
  }
};

module.exports.list = (req, res, next) => {
  Book.find({user: req.user.id})
    .then(books => {
      res.render("books/booksList", { books })
    })
    .catch(next)
}

module.exports.edit = (req, res, next) => {
  console.log("slay")
  Book.findById(req.params.id)
    .then(book => {
      console.log(book)
      res.render("books/editForm", { book, languages, genres })
    })
    .catch(err => console.log(err))
}

module.exports.doEdit = (req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/books/list")
    })
    .catch(next)
}

module.exports.doDelete = (req, res, next) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/books/list")
    })
    .catch(next)
}

