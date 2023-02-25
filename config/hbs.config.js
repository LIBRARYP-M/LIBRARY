const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper("findSelected", function (options) {
  // if(optionSelected === optionToCheck) {
  //   return true
  // } else {
  //   return false
  // }

  const { optionChosen, optionToChoose } = options.hash;

  // console.log(language, languageToChoose)

  if (optionChosen === optionToChoose) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

hbs.registerHelper("yourLoan", function (options) {
  const { petitionerId, userId } = options.hash

  if(petitionerId === userId) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

hbs.registerHelper("statusChecker", function (options) {
  const { status, statusToCheck } = options.hash

  if(status === statusToCheck) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

hbs.registerHelper("genreChecker", function (options) {
  const { genre, genreToCheck } = options.hash

  if(genre === genreToCheck) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})