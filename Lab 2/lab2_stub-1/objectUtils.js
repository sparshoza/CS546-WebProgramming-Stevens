/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let areObjectsEqual = (...args) => {
      if (args.length < 2) {
            throw new Error('Please provide at least two objects to compare');
      }

      args.forEach(arg => {
            if (typeof arg !== 'object' || arg === null || Array.isArray(arg)) { //https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
                  throw new Error('All arguments must be non-null objects');
            }
      });

      const isEquivalent = (a, b) => {
            if (typeof a === 'object' && typeof b === 'object') {
                  if (Object.keys(a).length !== Object.keys(b).length) {
                        return false;
                  }

                  for (let prop in a) {
                        if (b.hasOwnProperty(prop)) {
                              if (!isEquivalent(a[prop], b[prop])) {
                                    return false;
                              }
                        } 
                        else {
                              return false;
                        }
                  }

                  return true;
            }
            else {
                  return a === b;
            }
      };

      for (let i = 1; i < args.length; i++) {
            if (!isEquivalent(args[0], args[i])) {
                  return false;
            }
      }

      return true;
};

export let calculateObject = (object, funcs) => {
      if (typeof object !== 'object' || object === null) {
            throw new Error('object must be defined and be an object');
      }

      if (!Object.values(object).every(val => typeof val === 'number')) {
            throw new Error('object values must be numbers');
      }

      if (!Array.isArray(funcs)) {
            throw new Error('functions must be defined and be an array');
      }

      if (funcs.length < 1 || !funcs.every(func => typeof func === 'function')) {
            throw new Error('functionss must have at least one function element');
      }

      let result = {};
      let previousResult;
      funcs.forEach(func => {
            previousResult = previousResult || object;
            result = {};
            for (let key in previousResult) {
                  result[key] = func(previousResult[key]);
                  if (isNaN(result[key])) {
                        throw new Error('function produced a NaN value');
                  }
                  result[key] = result[key].toFixed(2);
            }
            previousResult = result;
      });

      return result;
};

export let combineObjects = (...args) => {
      if (args.length < 2) {
            throw new Error('At least two objects are required');
      }

      for (let i = 0; i < args.length; i++) {
            const obj = args[i];
            if (typeof obj !== 'object' || obj === null || Object.keys(obj).length === 0) {
                  throw new Error(`Argument at index ${i} is not a non-empty object`);
            }
      }

      const result = {};

      for (let i = 0; i < args.length; i++) {
            const obj = args[i];
            for (const key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, key)) { //https://stackoverflow.com/questions/12017693/why-use-object-prototype-hasownproperty-callmyobj-prop-instead-of-myobj-hasow
                        if (key in result) {
                              continue;
                        }
                        let found = false;
                        for (let j = i + 1; j < args.length; j++) {
                              const otherObj = args[j];
                              if (key in otherObj) {
                                    found = true;
                                    break;
                              }
                        }
                        if (found) {
                              result[key] = obj[key];
                        }
                  }
            }
      }

      return result;
};
