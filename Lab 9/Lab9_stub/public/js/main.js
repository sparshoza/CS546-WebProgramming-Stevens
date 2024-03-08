const form = document.querySelector("form");
const resultsDiv = document.querySelector("#results");
form.addEventListener("submit", (event) => {
  event.preventDefault();  //https://stackoverflow.com/questions/1357118/event-preventdefault-vs-return-false#:~:text=preventDefault()%20will%20prevent%20the,the%20event%20from%20bubbling%20up.
  
  
  
  const text = document.querySelector("#text_input").value.trim();
  
  if (text === "") {
    resultsDiv.innerHTML = "<p>Please enter some text.</p>";
    return;
  }
 
  if (!/\w/.test(text)) {
    resultsDiv.innerHTML = "<p>Please enter text consisting of at least one word.</p>";
    return;
  }
  
  const totalLetters = text.match(/[a-zA-Z]/g)?.length ?? 0; //https://stackoverflow.com/questions/1072765/count-number-of-matches-of-a-regex-in-javascript
  const totalNonLetters = text.match(/[^a-zA-Z]/g)?.length ?? 0;
  const totalVowels = text.match(/[aeiouAEIOU]/g)?.length ?? 0;
  const totalConsonants = text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g)?.length ?? 0;
  const words = text.match(/[a-z']+/gi); //https://stackoverflow.com/questions/4593565/regular-expression-for-accurate-word-count-using-javascript
  const totalWords = words ? words.length : 0;
  const uniqueWords = new Set(words).size ?? 0; //https://codereview.stackexchange.com/questions/207429/compute-count-of-unique-words-using-es6-sets
  const longWords = words.filter((word) => word.length >= 6).length ?? 0;
  const shortWords = words.filter((word) => word.length <= 3).length ?? 0;
  const resultdiv = document.createElement("dl");
  resultdiv.innerHTML = `
    <dt>Original Input:</dt>
    <dd>${text}</dd>
    <dt>Total Letters</dt>
    <dd>${totalLetters}</dd>
    <dt>Total Non-Letters</dt>
    <dd>${totalNonLetters}</dd>
    <dt>Total Vowels</dt>
    <dd>${totalVowels}</dd>
    <dt>Total Consonants</dt>
    <dd>${totalConsonants}</dd>
    <dt>Total Words</dt>
    <dd>${totalWords}</dd>
    <dt>Unique Words</dt>
    <dd>${uniqueWords}</dd>
    <dt>Long Words</dt>
    <dd>${longWords}</dd>
    <dt>Short Words</dt>
    <dd>${shortWords}</dd>
  `;
  resultsDiv.appendChild(resultdiv);
  form.reset();
});