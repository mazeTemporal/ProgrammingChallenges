// https://projecteuler.net/problem=3

/*
The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143 ?
*/

let getMaxPrimeFactor = (x) => {
  let factors = getPrimeFactors(x);
  return(factors[factors.length - 1]);
}

// helper function creates array of prime factors in ascending order
// duplicates will be present: example (12) returns [2, 2, 3]
let getPrimeFactors = (x) => {
  let factors = [];
  for (let i = 2; i <= x;){
    if (0 == x % i){
      factors.push(i);
      x /= i;
    } else {
      ++i;
    }
  }
  return(factors);
}

