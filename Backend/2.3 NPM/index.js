// var generateName = require('sillyname');
import generateName from 'sillyname';
import {randomSuperhero} from 'superheroes';

var sillyName = generateName();

console.log(`My silly name is: ${sillyName}!`);

var randomHero = randomSuperhero();
console.log(`I am  ${randomHero}`);