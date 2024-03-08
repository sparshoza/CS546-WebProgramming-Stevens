/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let sortAndFilter = (array, [sortByField1, order1], [sortByField2, order2], filterBy, filterByTerm) => {

  if (!Array.isArray(array) || array.length === 0 ||typeof array[0] !== 'object' || Object.keys(array[0]).length === 0 ||!array.every(obj => typeof obj === 'object' && Object.keys(obj).length === Object.keys(array[0]).length)) {
    throw new Error('the array parameter is invalid');
  }

  if (!array.every(obj => obj.hasOwnProperty(sortByField1)) || !array.every(obj => obj.hasOwnProperty(sortByField2))) {
    throw new Error('the sortByField1 or sortByField2 is not a key in each object of the array');
  }

  if (order1 !== 'asc' && order1 !== 'desc' || order2 !== 'asc' && order2 !== 'desc') {
    throw new Error('the order of sortByField1 and sortByField2 must be either "asc" or "desc"');
  }

  if (!array.every(obj => obj.hasOwnProperty(filterBy))) {
    throw new Error('the filterBy key is not a key in each object of the array');
  }

  const filteredArray = array.filter(obj => obj[filterBy] === filterByTerm);

  filteredArray.sort((obj1, obj2) => {
    const value1 = obj1[sortByField1];
    const value2 = obj2[sortByField1];
    const comparison1 = value1.localeCompare(value2);

    if (comparison1 === 0) {
      const value3 = obj1[sortByField2];
      const value4 = obj2[sortByField2];
      const comparison2 = value3.localeCompare(value4);
      return order2 === 'asc' ? comparison2 : -comparison2; //https://stackoverflow.com/questions/28104765/javascript-conditional-return-statement-shorthand-if-else-statement
    }
    return order1 === 'asc' ? comparison1 : -comparison1;
  });

  return filteredArray;
}

export let merge = (...args) => {
  let result = [];

  for (let i = 0; i < args.length; i++) {
    let current = args[i];

    if (!Array.isArray(current)) {
      throw new Error("Each input must be an array");
    }

    current = current.flat(Infinity);

    if (current.length === 0) {
      throw new Error("Each array must have at least one element");
    }

    for (let j = 0; j < current.length; j++) {
      let item = current[j];

      if (Array.isArray(item)) { //https://stackoverflow.com/questions/40025718/es6-finding-data-in-nested-arrays
        throw new Error("Each element of the array must be either a string or a number");
      }

      result.push(item);
    }
  }

  result.sort((a, b) => {
    if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b);
    } else if (typeof a === "number" && typeof b === "number") {
      return a - b;
    } else if (typeof a === "number") {
      return -1;
    } else {
      return 1;
    }
  });

  return result;

}

export let matrixMultiply = (...args) => {
  if (args.length < 2) {
    throw new Error("At least two matrices are required");
  }

  for (let i = 0; i < args.length; i++) {
    const matrix = args[i];
    const colCount = matrix[0].length;
    if (!Array.isArray(matrix) || matrix.length === 0) {
      throw new Error(`Input ${i + 1} is not a valid matrix`);
    }
    for (let j = 1; j < matrix.length; j++) {
      if (!Array.isArray(matrix[j]) || matrix[j].length !== colCount) {
        throw new Error(`Input ${i + 1} is not a valid matrix`);
      }
    }
  }

  let result = args[0];

  for (let i = 1; i < args.length; i++) {
    const current = args[i];
    const rows = result.length;
    const cols = current[0].length;
    const firstArr = current.length;

    if (result[0].length !== firstArr) {
      throw new Error("Matrices cannot be multiplied");
    }

    const temp = [];

    for (let j = 0; j < rows; j++) {
      temp[j] = [];

      for (let k = 0; k < cols; k++) {
        let sum = 0;

        for (let l = 0; l < firstArr; l++) {
          sum += result[j][l] * current[l][k];
        }

        temp[j][k] = sum;
      }
    }

    result = temp;
  }

  return result;
};
