// https://projecteuler.net/problem=5

/*
2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
*/

let smallestMultiple = (max = 20) => {
  return(
    multiplyFactors(
      generateSequence(max)
      .map(getPrimeFactors)
      .reduce(mergePrimeFactors)
    )
  );
}

// helper function to generate sequence of integers
let generateSequence = (max) => {
  let sequence = [];
  for (let i = 1; i <= max; ++i){
    sequence.push(i);
  }
  return(sequence);
}

// helper function creates map of prime factors to count of instances
// example (12) returns {2:2, 3:1}
let getPrimeFactors = (x) => {
  let factors = {};
  for (let i = 2; i <= x;){
    if (0 == x % i){
      factors[i] = factors[i] ? factors[i] + 1 : 1;
      x /= i;
    } else {
      ++i;
    }
  }
  return(factors);
}

// helper function combines two factorizations by taking max of each factor
let mergePrimeFactors = (a, b) => {
  let factors = a;
  for (f in b){
    factors[f] = factors[f] ? Math.max(b[f], factors[f]) : b[f];
  }
  return(factors);
}

// helper function returns product of prime factors
let multiplyFactors = (factors) => {
  let product = 1;
  for (factor in factors){
    product *= Math.pow(parseInt(factor), factors[factor]);
  }
  return(product);
}

