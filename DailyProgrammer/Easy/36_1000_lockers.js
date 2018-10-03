// https://www.reddit.com/r/dailyprogrammer/comments/ruiob/452012_challenge_36_easy/

/*
1000 Lockers Problem.

In an imaginary high school there exist 1000 lockers labelled 1, 2, ..., 1000. All of them are closed. 1000 students are to "toggle" a locker's state. * The first student toggles all of them * The second one toggles every other one (i.e, 2, 4, 6, ...) * The third one toggles the multiples of 3 (3, 6, 9, ...) and so on until all students have finished.

To toggle means to close the locker if it is open, and to open it if it's closed.

How many and which lockers are open in the end?
*/

// simple solution, manual toggle
// loop through array of multiples O(n)
// each loop will loop through array of lockers O(n)
// = O(n^2)

let toggleLockerSimple = (lockerCount) => {
  // generate array of lockers
  let locker = new Array(lockerCount).fill(true); // everything is multiple of 1 so start with true
  // loop through multiples
  for (let multiple = 2; multiple <= lockerCount; ++multiple){
    // loop through remaining lockers
    for (let lockerNum = multiple; lockerNum <= lockerCount; ++lockerNum){
      if (0 == lockerNum % multiple){
        locker[lockerNum -1] = !locker[lockerNum - 1];
      }
    }
  }
  // map to integers
  locker = locker.map((x, i) => {
    return(x ? i + 1 : 0);
  // remove empty
  }).filter((x) => {
    return(x);
  });
  return(locker);
}

console.log(toggleLockerSimple(10));
console.log(toggleLockerSimple(100));
console.log(toggleLockerSimple(1000));

// domain knowledge, perfect squares
// each locker will be toggled based on combinations of its prime factors
// this will need a mathematical proof if demonstration is insufficient
// O(sqrt(n))
let toggleLockerDomain = (lockerCount) => {
  let max = Math.floor(Math.sqrt(lockerCount));
  let locker = [];
  for (let i = 1; i <= max; ++i){
    locker.push(i * i);
  }
  return(locker);
}

console.log(toggleLockerDomain(10));
console.log(toggleLockerDomain(100));
console.log(toggleLockerDomain(1000));

