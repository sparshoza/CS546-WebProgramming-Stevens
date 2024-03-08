/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/if (args.length < 2) {
    throw new Error("At least two inputs are required");
  }

  const isValidMatrix = matrix => {
    if (!Array.isArray(matrix) || matrix.length === 0) {
      return false;
    }

    const colCount = matrix[0].length;

    for (let i = 1; i < matrix.length; i++) {
      if (!Array.isArray(matrix[i]) || matrix[i].length !== colCount) {
        return false;
      }
    }

    return true;
  };

  const matrices = [];

  for (let i = 0; i < args.length; i++) {
    if (!isValidMatrix(args[i])) {
      throw new Error("Input is not a valid matrix");
    }

    matrices.push(args[i]);
  }

  let result = matrices[0];

  for (let i = 1; i < matrices.length; i++) {
    const current = matrices[i];
    const rows = result.length;
    const cols = current[0].length;
    const inner = current.length;

    if (result[0].length !== inner) {
      throw new Error("Matrices cannot be multiplied");
    }

    const temp = [];

    for (let j = 0; j < rows; j++) {
      temp[j] = [];

      for (let k = 0; k < cols; k++) {
        let sum = 0;

        for (let l = 0; l < inner; l++) {
          sum += result[j][l] * current[l][k];
        }

        temp[j][k] = sum;
      }
    }

    result = temp;
  }

  return result;