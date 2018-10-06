// https://projecteuler.net/problem=1

/*
If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

Find the sum of all the multiples of 3 or 5 below 1000.
*/

// simple solution
// quick to implement
// good for small numbers but slow for huge numbers
// O(size of limit * length of multiples)
let sumMultipleSimple = (limit, multiples = [3, 5]) => {
  let sum = 0;
  for (let i = 1; i < limit; ++i){
    if (factorInArray(i, multiples)){
      sum += i;
    }
  }
  return(sum);
}



// domain knowledge solution
// good for huge numbers with small sets of multiples
// O(2^length of multiples)
let sumMultipleDomain = (limit, multiples = [3, 5]) => {

  // get combinations of factors
  let factors = combineFactors(
    multiples.map((x) => {
      return({value: x, combineCount: 1});
    })
  );

  // solve venn diagram of factors
  return(
    factors.map((x) => {
      let total = sumMultipleSingle(limit, x.value);
      return(
        0 == x.combineCount % 2 ? -total : total
      );
    }).reduce((a, b) => {
      return(a + b);
    })
  );
}

// adaptive solution
// leverages above solutions to handle either a large number or large sets of multiples
// also tries to reduce redundant multiples (for example 2 would make 4, 10, ... redundant)
let sumMultipleAdaptive = (limit, multiples) => {
  // ignore duplicates and numbers out of range
  multiples = multiples.filter((x, i, arr) => {
    return(
      x > 0 &&
      i == arr.indexOf(x)
    );
  });

  // filter redundant factors
  multiples = filterRedundantFactors(multiples);

  return(
    limit * multiples.length < Math.pow(2, multiples.length) ?
    sumMultipleSimple(limit, multiples) :
    sumMultipleDomain(limit, multiples)
  );
}

// helper function determines if array contains factor of number
let factorInArray = (number, arr) => {
  return(
    arr.map((x) => {
      return(0 == number % x);
    }).reduce((a, b) => {
      return(a || b);
    })
  );
}

// helper function to get sum of multiples of a single factor
let sumMultipleSingle = (limit, factor) => {
  let multipleCount = Math.floor((limit - 1) / factor);
  return((multipleCount + 1) * factor * multipleCount / 2);
}

// helper function to generate combinations of factors
let combineFactors = (toProcess, results = []) => {
  if (0 == toProcess.length){
    return(results);
  }
  let combinedResults = results.concat(
    results.map((x) => {
      return({
        value: x.value * toProcess[0].value,
        combineCount: x.combineCount + 1
      });
    }),
    toProcess[0]
  );
  return(combineFactors(toProcess.slice(1), combinedResults));
}

// helper function to remove redundant factors
let filterRedundantFactors = (factors) => {
  factors = factors.sort((a, b) => {return(a - b)});
  let filteredFactors = [];
  while (factors.length > 0){
    filteredFactors.push(factors[0]);
    factors = factors.slice(1).filter((x) => {
      return(0 < x % factors[0]);
    });
  }
  return(filteredFactors);
}

