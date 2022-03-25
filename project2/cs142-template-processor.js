function replaceStr(str) {
  const dictionary = { month: 'July', day: '1', year: '2016' };
  const regex = /{{[a-z]+}}/g;
  let arr = str.split(' ');
  let result = [];

  arr.map((el) => {
    if (regex.test(el)) {
      for (let key in dictionary) {
        // console.log(`${el} === '{{${key}}}'`, el === `{{${key}}}`);
        if (el === `{{${key}}}`) {
          // console.log(dictionary[key], el);
          el = dictionary[key];
          result.push(el);
        }
      }
    } else {
      result.push(el);
    }
  });

  if (result.length > 0) {
    return result.join(' ');
  }
}

console.log(
  replaceStr(
    'My favorite is month is {{month}} but not the day {{day}} or the year {{year}}'
  )
);
