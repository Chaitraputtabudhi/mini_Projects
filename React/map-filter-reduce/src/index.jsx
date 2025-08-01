// var numbers = [3, 56, 2, 48, 5];

// //Map -Create a new array by doing something with each item in an array.
// var newNumbers = numbers.map(function (x) {
//   return x * 2;
// });

// //Filter - Create a new array by keeping the items that return true.
// var newFilter = numbers.filter(function (num) {
//     return num < 10;
// })

// //Reduce - Accumulate a value by doing something to each item in an array.
// var newReduce = numbers.reduce(function (Accumulater,currentValue) {
//     return Accumulater - currentValue;
// })

// //Find - find the first item that matches from an array.
// var newFind = numbers.find(function (num){
//     return num > 20
// })

// //FindIndex - find the index of the first item that matches.
// var newFindIndex = numbers.findIndex(function (num){
//     return num > 20
// })

// console.log(newNumbers);
// console.log(newFilter);
// console.log(newReduce);
// console.log(newFind);
// console.log(newFindIndex);

// // If you're running this locally in VS Code use the commands:
// // npm install
// // to install the node modules and
// // npm run dev
// // to launch your react project in your browser


import emojipedia from "./emojipedia.js";


const newEmojipedia = emojipedia.map(function (emoji){
    return emoji.meaning.substring(0, 100);
})

console.log(newEmojipedia);