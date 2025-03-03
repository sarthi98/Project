'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  //   .textContent = 0

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov} EUR</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

// displayMovements(account1.movements); (cut)

console.log(containerMovements.innerHTML);



const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};
// calcDisplayBalance(account1.movements);  (cut)


// income , out ,interest

const calcDisplaySummary = function (acc) {

  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} EUR `

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} EUR `


  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} EUR `

};
// calcDisplaySummary(account1.movements);  (cut)


// computing Username
const user = 'Steven Thomas Williams';

const Use = user
console.log(Use);

const Users = user.toLowerCase()
console.log(Users);

const User = user.toLowerCase().split(' ');
console.log(User);


const Us = user.toLowerCase().split('');
console.log(Us);

const Username = user
  .toLowerCase()
  .split(' ')
  .map(function (name) {
    return name[0];
  })
console.log(Username);


const U = user
  .toLowerCase()
  .split(' ')
  .map(function (name) {
    return name[0];
  })
  .join('')
console.log(U);


const Uses = user
  .toLowerCase()
  .split(' ')
  .map(name => name[0])
  .join('')
console.log(Uses);

const createnames = function (user) {
  const Uss = user
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('')
  return Uss;;
};
console.log(createnames('Steven Thomas Williams'))


const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.Username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  //  Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);

}

// //   --- Implementing Login
// Event handler
let currtenAccount;
btnLogin.addEventListener('click', function (e) {

  // preven form from submitting
  e.preventDefault();

  // console.log('LOGIN');
  currtenAccount = accounts.find(acc => acc.Username ===
    inputLoginUsername.value);
  console.log(currtenAccount);

  if (currtenAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Message
    labelWelcome.textContent = `Welcome back ,${currtenAccount.owner.split(' ')[0]
      }`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // update UI
    updateUI(currtenAccount);;
  }
});



btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.Username === inputTransferTo.value);
  // console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 &&
    receiverAcc &&
    currtenAccount.balance >= amount &&
    receiverAcc?.Username !== currtenAccount.Username) {
    // doing the transfer
    currtenAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // update UI
    updateUI(currtenAccount);;

  }

});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currtenAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currtenAccount.movements.push(amount);

    // update UI 
    updateUI(currtenAccount)
  }
  inputLoanAmount.value = '';
});




//   The findindex method

btnClose.addEventListener('click', function (e) {
  e.preventDefault();


  if (
    inputCloseUsername.value === currtenAccount.
      Username &&
    Number(inputClosePin.value) === currtenAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.Username === currtenAccount.Username);
    console.log(index);
    // .indexof(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

  }

  inputCloseUsername.value = inputClosePin.value = '';

});


let stored = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currtenAccount.movements, !stored);
  stored = !stored;
});




/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

*/

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
// # simple Array methods

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

// SPLICE
// console.log(arr.slice(2));
arr.slice(-1);
console.log(arr);
arr.shift(1, 2);
console.log(arr);

// REVERS
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '))


*/

/*

//  # new at method
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting last array element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
console.log('jonas'.at(0));
console.log('jonas'.at(-1));

//  # Looping arrays : forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if (movement > 0) {
    console.log(`you deposited ${movement}`);
  } else {
    console.log(`you withdrew ${Math.abs(movement)}`);
  }
}

//  with numbering

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: you deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: you withdrew ${Math.abs(movement)}`);
  }
}

console.log('---- ForEach ----');
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`you deposited ${movement}`);
  } else {
    console.log(`you withdrew ${Math.abs(movement)}`);
  }
});

// forEach iteration =>
// 0: function(200)
// 1: function(450)
//  ...... as it all same


//  with numbering(index)
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: you deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: you withdrew ${Math.abs(mov)}`);
  }
});

/*

//  # forEach with Maps and Sets

// Maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log(`${key}:${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
*/


// # Array Methods Practice
// (1)
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// //  (2)
// const numDeposits1000 = accounts
//   .filter(acc => acc.movements)
//   .filter(mov => mov >= 1000).length

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  // .reduce((count,cur) => car >= 1000 ? count +1 : count),0)
  .reduce((count, cur) => (cur >= 1000 ? count++ : count), 0);
console.log(numDeposits1000);

let a = 10
console.log(a++);
console.log(a);

// (3)
const sums = accounts
const { deposit, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce((sums, cur) => {
    cur > 0 ? sums.deposit += cur : sums.withdrawals
      += cur;
    sums[cur > 0 ? 'deposits' : 'withdrawals'] +=
      cur;
    return sums;
  }, { deposit: 0, withdrawals: 0 })
console.log(sums);
console.log(deposit, withdrawals);

// (4)
//  this is a nice title -> This is a Nice Title
const convertTitleCase = function (title) {
  const expections = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title.toLowerCase().splice(' ').map(word => word[0].toUpperCase() + word.slice(1));
  return titleCase;
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but n at too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));



/*
  // * .challenge (que)

Julia and kate are doing a study on dogs. So each of
themasked 5 bog owners about their bog's age, and
 stored the data into an array one array for each).
 For now, they are just interested in kowing whether
  a dog is an adult or a puppy. A dog is an adult if
  it is at least 3 years ald, and it's a puppy it's
   Less than 3 years old.

Create function 'checkDogs', which accepts 2 arrays of
dog's ages ("dogsJulia" and "dogekate"), and does the
following things:

1. Julia found out that the owners of the FIRST the LAST
TWO dogs actually have cats, not dogs! So create a shallow
copy of Julia's array, and remove the cat ages free that
copied array (because it's a bad practice to mutate
function parameters)

2. Create an array with both Julia's (corrected )and kate's

3. for each remaining dog, log to the console whether it's an adult("Dog number  1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy🐶 ")

4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD    */

/*  (sloution)
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // dogsJulia.slice(1,3);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  // "Dog number 1 is an adult, and is 5 years old")
  //  or puppy ("Dog number 2 is still a puppy")
  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number${i + 1} is an adult,
         and is ${dog} year old`);
    } else {
      console.log(`Dog number${i + 1} is still a puppy`);

    }
  })
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3] ,[10, 5, 6, 1, 4]);

*/


//  Data Transformations with Map , Filter and Reduce
// Map (3,2)= current * 2  ==> (6,4)
// Filter (1,3,4)= current > 2  ==> (3,4)
// Reduce (4,7,2) = acc+current ==>(13 ~total)

/*
//  # map method 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
 
const eurTousd = 1.1;
const movementsUSD = movements.map(function (mov) {
  return mov * eurTousd;
});
console.log(movements);
console.log(movementsUSD)
 
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurTousd);
console.log(movementsUSDfor);
 
 
//  arrow method (one line )
const movementsusd = movements.map(mov => mov * eurTousd);
console.log(movementsusd);
 
 
//  Array: forEach
const movementsDescriptions = movements.map((mov, i, arr) => {
  if (mov > 0) {
    return `Movement ${i + 1}: you deposited ${mov}`;
  } else {
    return `Movement ${i + 1}: you withdrew ${Math.abs(mov)}`;
  }
});
console.log(movementsDescriptions);
 
 
//  Or  not using return
const movementsDescr = movements.map((mov, i, arr) =>
  `Movement ${i + 1}: you ${mov > 0 ? 'deposited ' : 'withdrew'}
  ${Math.abs(
    mov
  )}`
);
console.log(movementsDescr);
 
*/

/*
 
//////  # Filter Method
 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
 
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);
 
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor)
 
const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals);
 
const withdrawal = movements.filter(mov => mov < 0);
console.log(withdrawal);
 
*/


/*
//  # the Reduce method


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// accumulator -> SNOWBALL
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.group(`Iteration ${i} : ${acc}`);
  return acc + cur;
}, 0);
console.log(balance);

// arrow fun
const balances = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balances);


let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

//  Maximum value

const max = movements.reduce((acc, mov) => {
  if (acc > mov)
    return acc;
  else
    return mov;
}, movements[0]);
console.log(max);

*/


/*

// the magic of chaining methods

const eurToUsd = 1.1;
console.log(movements);


// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD)

const totelDepositsUSD = movements
  .filter(mov => mov < 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totelDepositsUSD)

const totalsDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalsDepositsUSD);

*/

/*
// //////////////////////////////////////////

// the find  method

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner ===
  "Jessica Davis");
console.log(account);


////////////////////////////////////////////

//  The New FindLast and FindLastIndex Methods


// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
const lastWithdrawal = movements.findLast(mov => mov < 0);
console.log(lastWithdrawal);

// 'Your lastest large movement was X movements ago'

const lastestLargeMovementIndex = movements.findLastIndex
  (mov => Math.abs(mov) > 1000
  );
console.log(lastestLargeMovementIndex);
console.log(`Your lastest large movement was ${movements.length - lastestLargeMovementIndex} movements ago`);

*/

/*
///////  # some and every

console.log(movements);

// Equality
console.log(movements.includes(-130));

// some :Condition
console.log(movements.some(mov => mov === -130))


const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// Every 
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

*/

// //////  # Flat  and FlatMap

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

//     flat
const overallBalances = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalances);


//   flatMap
const overallBalances2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalances2);


/*
///////  # Sorting Arrays

//  String
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners);
console.log(owners.sort());

//  Number
console.log(movements);
console.log(movements.sort());

//   return < 0, A , B (keep order)
//  return > 0 , B , A  ( switch order)

// //  Ascending
// movements.sort((a, b) => {
//   if (a > b)
//     return 1;
//   if (a < b)
//     return -1;
// });

movements.sort((a, b) => a - b);
console.log(movements);


// Descending
// movements.sort((a, b) => {
//   if (a > b)
//     return -1;
//   if (a < b)
//     return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);
*/

////////  # Array Grouping 

console.log(movements);

const groupeedMovements = Object.groupBy(movements,
  movement =>
    movement > 0 ? 'deposits' : 'withdrawals'
);
console.log(groupeedMovements);

const groupeedByActivity = Object.groupBy(accounts,
  account => {
    const movementCount = account.movements.length;

    if (movementCount >= 8)
      return 'Very active';
    if (movementCount >= 4)
      return ' active';
    if (movementCount >= 1)
      return ' moderate';
    return 'inactive';
  });
console.log(groupeedByActivity);

// const groupedAccounts = Object.groupBy(accounts,account => account.type);
const groupedAccounts = Object.groupBy(accounts, ({
  type }) => type);
console.log(groupedAccounts);



////// # More Ways of creating and filling Arrays

console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));


//  Empty arrays + fill method
const x = new Array(7);
console.log(x);
console.log(x.map(() => 5));

x.fill(1,);
x.fill(1, 3, 5);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(z);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(document.
    querySelectorAll('.movements__value'), el => Number(el.textContent.replace('EUR', '')));
  console.log(movementsUI);
});





// # non-Dstructive Alternatives: toReversed ,toSorted, toSpliced , with



// toReversed
console.log(movements);

const receiverMov = movements.toReversed();
console.log(receiverMov);
console.log(movements);

// toSorted (sort)  , toSpliced(splice)
// movements[1] = 2000;

const newMovements = movements.copyWithin(1, 2000);
console.log(newMovements)

console.log(movements);



