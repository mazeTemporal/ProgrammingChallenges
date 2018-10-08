// https://projecteuler.net/problem=4

/*
A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the product of two 3-digit numbers.
*/

let largestPalindromeProduct = (digits = 3) => {
  let max = 0;
  for (let i = Math.pow(10, digits) - 1; i > Math.pow(10, digits - 1) - 1; --i){
    if (max > i * i){ // no need to keep testing
      break;
    }
    for (let j = i; j > Math.pow(10, digits - 1) - 1; --j){
      let product = i * j;
      if (product < max){ // no need to keep testing
        break;
      } else if (isPalindrome(product)){
        max = product;
      }
    }
  }
  return(max);
}

// helper function determines if integer is a palindrome
let isPalindrome = (x) => {
  let charArray = String(x).split('');
  let start = charArray.slice(0, charArray.length / 2).join('');
  let end = charArray.slice(
    charArray.length / 2 + (0 == charArray.length % 2 ? 0 : 1), // ignore center letter
    charArray.length
  ).reverse().join('');
  return(start === end);
}
