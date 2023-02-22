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
    .populate('user')
    .then((books) => {
      res.render("books/booksBrowser", { books });
    })
    .catch(next)
  } else {
  Book.find()
    .populate('user')
    .then((books) => {
      res.render("books/booksBrowser", { books });
    })
    .catch(next)
  }
};

module.exports.browserFiltered = (req, res, next) => {
  const { criteria } = req.params;

  if (req.user) {
    Book.find({user: {$ne: req.user.id}, title: criteria})
    .populate('user')
    .then((books) => {
      console.log(books);
      res.render("books/booksBrowser", { books });
    })
    .catch(next)
  } else {
  Book.find({title: criteria})
    .populate('user')
    .then((books) => {
      console.log(books);
      res.render("books/booksBrowser", { books });
    })
    .catch(next)
  }
};

/*USER BROWSER FILTER DOESN'T WORK*/

// module.exports.find = (req, res) => {
//   let criteria = {}

//   if (req.query.title) {
//     criteria.title = req.query.title
//   }

//   Book.find(criteria)
//     .then(books => {
//       res.render('books/booksBrowser', { booksBrowser: books, title: 'Books' }) 
//     })
//     .catch(err => res.send(err))
// };

/**/

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
  const updatedBook = {
    title: req.body.title,
    author: req.body.author,
    language: req.body.language,
    specialEdition: specialEditionParser(req.body.specialEdition),
    genre: req.body.genre,
    user: req.user.id,
  };

  if(req.file) {
    updatedBook.image = req.file.path
  }

  Book.findByIdAndUpdate(req.params.id, updatedBook)
    .then(() => {
      res.redirect("/books/browser")
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

