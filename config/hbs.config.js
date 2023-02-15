const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper("findSelected", function (optionSelected, optionToCheck) {
  if(optionSelected === optionToCheck) {
    return true
  }
})