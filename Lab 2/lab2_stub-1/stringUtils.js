/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let palindromes = (strings) => {
      var palList = {};
      var palTest
      if (!Array.isArray(strings)) {
            throw new Error('Invalid input -  not string');
      }
      if (strings.length === 0) {
            throw new Error('String length is 0');
      }
      for (let str of strings) {
            if (typeof str !== 'string' || str.trim().length === 0) {
                  throw new Error('Invalid input - not string or only white space');
            }
            const key = str.toLowerCase().replace(/[^0-9a-z]/gi, ''); // used reference for regex 
            palTest = key.split('').reverse().join('');
            if (palTest === key) {
                  palList[key] = true
            }
            else {
                  palList[key] = false
            }
      }
      return palList;
};

export let censorWords = (string, badWordsList) => {
      if (typeof string !== "string" || string.trim().length === 0) {
            throw new Error("input string cannot be an empty string");
      }

      // Check if badWordsList is a non-empty array of strings
      if (!Array.isArray(badWordsList) || badWordsList.length === 0 || !badWordsList.every((badword) => typeof badword === "string")) {
            throw new Error("badWordsList must be a non-empty array of strings");
      }

      let censorChars = ["!", "@", "$", "#"];
      let censorIndex = 0;
      let censoredString = string;

      badWordsList.forEach((word) => {
            let regex = new RegExp("\\b" + word + "\\b", "gi"); // regex creator used to create this
            let match;

            while ((match = regex.exec(censoredString)) !== null) {
                  let wordStartIndex = match.index;
                  let wordEndIndex = wordStartIndex + word.length;
                  let replacement = "";

                  for (let i = wordStartIndex; i < wordEndIndex; i++) {
                        replacement += censorChars[censorIndex % censorChars.length];
                        censorIndex++;
                  }

                  censoredString = censoredString.slice(0, wordStartIndex) + replacement + censoredString.slice(wordEndIndex);
            }
      });

      return censoredString;
};

export let distance = (string, word1, word2) => {
      if (!string || !word1 || !word2) {
            throw new Error("All three arguments must exist");
      }
      if (typeof string !== "string" || typeof word1 !== "string" || typeof word2 !== "string") {
            throw new Error("All three arguments must be strings");
      }
      if (!string.trim() || !word1.trim() || !word2.trim()) {
            throw new Error("All three arguments must not be empty strings");
      }
      if (/^\p{P}*$/.test(string) || /^\p{P}*$/.test(word1) || /^\p{P}*$/.test(word2)) { /// used regex references for this regex
            throw new Error("All three arguments must not be strings made of punctuation symbols");
      }
      string = string.replace(/[^a-zA-Z0-9]/g, ' '); // used reference to get regex 
      const words = string.toLowerCase().split(/\s+/);
      const index1 = words.indexOf(word1.toLowerCase());
      const index2 = words.indexOf(word2.toLowerCase());


      if (word1.toLowerCase() === word2.toLowerCase()) {
            throw new Error("Word1 and Word2 must not be the same word");
      }
      if (index1 === -1 || index2 === -1) {
            throw new Error("Word1 and Word2 must exist in the string");
      }
      if (index1 >= index2) {
            throw new Error("Word1 must appear before Word2 in the string");
      }

      return index2 - index1;
};
