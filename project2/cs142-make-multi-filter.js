// Problem 1: Generate a Multi Filter Function
export default CS142MakemultIlter = (originalArray, arrayFilter) => {
  return originalArray.filter((el) => {
    return arrayFilter.indexOf(el) == -1;
  });
};

const result = CS142MakemultIlter([1, 2, 3, 4, 5, 6], [3, 6]);

function CS142MakemultIlter(originalArray, arrayFilter) {
  return originalArray.filter((el) => {
    return arrayFilter.indexOf(el) == -1;
  });
}
console.log(CS142MakemultIlter([1, 2, 3, 4, 5, 6], [3, 6]));
