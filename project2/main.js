const { CS142MakemultIlter } = require('./cs142-make-multi-filter');
const { replaceStr } = require('./cs142-template-processor');

console.log(
  replaceStr(
    'My favorite is month is {{month}} but not the day {{day}} or the year {{year}}'
  )
);
console.log(CS142MakemultIlter([1, 2, 3, 4, 5, 6], [3, 6]));
