'use strict';
function Cs142TemplateProcessor(template) {
  //template is a string
  this.temp = template;
}

Cs142TemplateProcessor.prototype.fillIn = function (dictionary) {
  // console.log(this.temp);
  //numbers or letters could be in property name
  var placeHolder = /\{\{(\w|\d)*\}\}/g;

  var filledIn = this.temp.replace(placeHolder, (match) => {
    // console.log(match);
    var property = match.slice(2, match.length - 2);
    // console.log(property);
    // console.log(dictionary);
    var word = dictionary[property];
    // console.log(word);
    if (word === undefined) {
      return ' ';
    } else {
      return word;
    }
  });
  // console.log(this.temp);
  // console.log(dictionary);
  // console.log(filledIn);

  return filledIn;
};
