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