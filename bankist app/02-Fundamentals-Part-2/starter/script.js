'use strict';
/*
let hasDrivesLicense = false;
const passTest = true;

if (passTest) hasDrivesLicense = true;
if (hasDrivesLicense) console.log('I can drive : D')


/*
function fruitProcessor(apples, oranges) {
    const juice = `juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}
const applejuice = fruitProcessor(5, 0);
console.log(applejuice);

const appleorangesjuice = fruitProcessor(2, 4);
console.log(appleorangesjuice);

const num = Number('23');

*/

/*
// function declaration
//  >> fuction that can be used beford it's declared

function calcAge1(birthYeah) {
    const age = 2037 - birthYeah;
    return age;

}
const age1 = calcAge1(1991);
console.log(age1)


// function expression
// >> function value stord in a variable

const calcAge2 = function (birthYeah) {
    return 2037 - birthYeah;
}
const age2 = calcAge2(1991);
console.log(age1, age2);

*/



// Arrow function 
// >> one line function
const calcAge3 = birthYeah => 2037 - birthYeah;
const age3 = calcAge3(1991);
console.log(age3);

const yearUnitlRetrirement = (birthYeah, firstName) => {
    const age = 2037 - birthYeah;
    const retirement = 65 - age;
    // return retirement;
    return `${firstName} retires in ${retirement} years`;
}

console.log(yearUnitlRetrirement(1991, 'jonas'));
console.log(yearUnitlRetrirement(1991, 'bob'));


//  functions  calling other functions

//  calling a function inside a function : data flow
const cutPieces = function (fruit) {
    return fruit * 4;
};

function fruitProcessor(apples, oranges) {

    const applePieces = cutPieces(apples);
    const orangePieces = cutPieces(oranges);

    const juice = `juice with ${applePieces} pieces of 
    apple and ${orangePieces} pieces of orange.`;
    return juice;
};

console.log(fruitProcessor(2, 3))

