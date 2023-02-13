module.exports.specialEditionParser = (option) => {
  switch(option){
    case 'NO CONTENT':
      return undefined;
    case 'true':
      return true;
    case 'false':
      return false;
  }
}
