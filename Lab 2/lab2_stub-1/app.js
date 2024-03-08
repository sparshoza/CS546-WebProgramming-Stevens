/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import { sortAndFilter, merge, matrixMultiply } from './arrayUtils.js';
import { palindromes, censorWords, distance } from './stringUtils.js';
import { areObjectsEqual, calculateObject, combineObjects } from './objectUtils.js';
try {
    let people = [
        { name: 'Alice', age: '30', location: 'San Francisco', role: 'Engineer' },
        { name: 'Bob', age: '28', location: 'New York', role: 'Designer' },
        { name: 'Charlie', age: '24', location: 'Chicago', role: 'Student' },
        { name: 'Dave', age: '27', location: 'Los Angeles', role: 'Teacher' },
        { name: 'Eve', age: '26', location: 'Boston', role: 'Engineer' },
        { name: 'Frank', age: '29', location: 'Seattle', role: 'Designer' },
        { name: 'Grace', age: '25', location: 'Austin', role: 'Student' },
        { name: 'Harry', age: '31', location: 'Miami', role: 'Teacher' },
        { name: 'Isabelle', age: '23', location: 'Denver', role: 'Student' },
    ];
    console.log(sortAndFilter(people, ['name', 'asc'], ['location', 'asc'], 'role', 'Engineer'));
}
catch (e) {
    console.error(e.message);
}
try {
    let people = [
        { name: 'Alice', age: '30', location: 'San Francisco', role: 'Engineer' },
        { name: 'Bob', age: '28', location: 'New York', role: 'Designer' },
        { name: 'Charlie', age: '24', location: 'Chicago', role: 'Student' },
        { name: 'Dave', age: '27', location: 'Los Angeles', role: 'Teacher' },
        { name: 'Eve', age: '26', location: 'Boston', role: 'Engineer' },
        { name: 'Frank', age: '29', location: 'Seattle', role: 'Designer' },
        { name: 'Grace', age: '25', location: 'Austin', role: 'Student' },
        { name: 'Harry', age: '31', location: 'Miami', role: 'Teacher' },
        { name: 'Isabelle', age: '23', location: 'Denver', role: 'Student' },
    ];
    console.log(sortAndFilter(people, ['ssn', 'asc'], ['name', 'asc'], 'age', '22'));}
catch (e) {
    console.error(e.message);
}

try {
    console.log(merge(["apple", 1, 2, [[["banana", 3]]]], [4, "orange", [[5, "grape"], "kiwi"]])
    );}
catch (e) {
    console.error(e.message);
}

try {
    console.log(merge([])
    );}
catch (e) {
    console.error(e.message);
}


try {
    console.log(matrixMultiply([[1,2],[3,4],[5,6]],[[6,6,6],[1,1,1]],[[1],[0],[8]]));
}
catch (e) {
    console.error(e.message);
}
try {
    console.log(matrixMultiply([[1,2],[3,4],[5,6]],[[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]]));
}
catch (e) {
    console.error(e.message);
}


try {
    console.log(palindromes(["racecar", "level", "elephant", "A man, a plan, a canal, Panama!", "radar"]));
}
catch (e) {
    console.error(e.message);
}

try {
    console.log(palindromes([142]));
}
catch (e) {
    console.error(e.message);
}


try {
    let badWords = ["bread","chocolate","poop"];

    console.log(censorWords("I like bread that has chocolate chips in it but I do not like to poop", badWords));
}
catch (e) {
    console.error(e.message);
}
try {
    let badWords = ["bread","chocolate","poop"];

    console.log(censorWords(" ", badWords));
}
catch (e) {
    console.error(e.message);
}


try {
    console.log(distance("The tattered work gloves speak of the many hours of hard labor he endured throughout his life", "Tattered", "speak"));
}
catch (e) {
    console.error(e.message);
}
try {
    console.log(distance("The tattered work gloves speak of the many hours of hard labor he endured throughout his life", "life", "his"));
}
catch (e) {
    console.error(e.message);
}

try {
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    console.log(areObjectsEqual(first,second));
}
catch (e) {
    console.error(e.message);
}
try {
    const first = {a: 2, b: 3,c : 4, d: 5};
    const second = {a: 2, b: 4};
    console.log(areObjectsEqual(first,second));
}
catch (e) {
    console.error(e.message);
}


try {
    console.log(calculateObject({ a: 9, b: 5, c: 5 }, [(n => n * 2), (n => Math.sqrt(n))]));
}
catch (e) {
    console.error(e.message);
}
try {
    console.log(calculateObject({ a: "yoyoyo", b: 5, c: 5 }, [(n => n * 2), (n => Math.sqrt(n))]));
}
catch (e) {
    console.error(e.message);
}


try {
    console.log(combineObjects( { a2: 3, b2: 7, c2: 5 },{ a2: 5, d: 4, e: 9 }));
}
catch (e) {
    console.error(e.message);
}
try {
    console.log(combineObjects( ["not an obj"]));
}
catch (e) {
    console.error(e.message);
}
