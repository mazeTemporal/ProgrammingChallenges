// https://www.codewars.com/kata/find-the-smallest/

/*
You have a positive number n consisting of digits. You can do at most one operation: Choosing the index of a digit in the number, remove this digit at that index and insert it back to another place in the number.

Doing so, find the smallest number you can get.

#Task: Return an array or a tuple or a string depending on the language (see "Sample Tests") with

1) the smallest number you got
2) the index i of the digit d you took, i as small as possible
3) the index j (as small as possible) where you insert this digit d to have the smallest number.
Example:

smallest(261235) --> [126235, 2, 0] or (126235, 2, 0) or "126235, 2, 0"
126235 is the smallest number gotten by taking 1 at index 2 and putting it at index 0

smallest(209917) --> [29917, 0, 1] or ...

[29917, 1, 0] could be a solution too but index `i` in [29917, 1, 0] is greater than 
index `i` in [29917, 0, 1].
29917 is the smallest number gotten by taking 2 at index 0 and putting it at index 1 which gave 029917 which is the number 29917.

smallest(1000000) --> [1, 0, 6] or ...
*/

// helper to test array equality
let arrayEquals = (a, b) => {
  if (a.length != b.length){
    return(false);
  }
  for (let i = 0; i < a.length; ++i){
    if (a[i] !== b[i]){
      return(false);
    }
  }
  return(true);
}

// helper to move digit in integer
let insertDigit = (number, digitIndex, insertIndex) => {
  var arr = String(number).split('');
  arr.splice(insertIndex, 0, arr.splice(digitIndex, 1)[0]);
  return(parseInt(arr.join('')));
}

// test cases
// do nothing
console.log(arrayEquals(smallest(1), [1, 0, 0]))
console.log(arrayEquals(smallest(123), [123, 0, 0]))
// move large digit back
console.log(arrayEquals(smallest(100), [1, 0, 2]))
console.log(arrayEquals(smallest(20013), [123, 0, 3]))
console.log(arrayEquals(smallest(2123), [1223, 0, 1]))
console.log(arrayEquals(smallest(142345), [123445, 1, 3]))
// move small digit forward
console.log(arrayEquals(smallest(1421), [1142, 3, 0]))

function smallest(n) {
    // solution is one of:
    // - no change
    // - move first out-of-sequence digit back
    // - move smallest out-of-sequence digit forward
    let intString = String(n);
    let minString = intString.split('').sort().join('');
    
    // if already solved
    if (minString == intString){
      return([n, 0, 0]);
    }
    
    // skip in-sequence digits at front
    let startPos = 0;
    while (intString[startPos] == minString[startPos]){
      ++startPos;
    }
    
    // try moving starting digit back
    let endPos = startPos + 1;
    while (intString[startPos] >= intString[endPos + 1] && endPos < intString.length - 1) {
      ++endPos;
    }
    // in case multiple digits would be contiguous, must insert before the first of them
    while (intString[startPos] == intString[endPos]){
      --endPos;
    }
    let moveStart = [insertDigit(n, startPos, endPos), startPos, endPos];
    
    // try moving smallest digit forward
    let minPos = intString.length - 1;
    // find closest to end smallest digit
    while (intString[minPos] != minString[startPos]){
      --minPos;
    }
    // in case multiple smallest digits are contiguous, must take the first of them
    while (intString[minPos - 1] == intString[minPos]){
      --minPos;
    }
    // in case multiple digits are contiguous, must insert before the first of them
    while (intString[startPos - 1] == intString[minPos]){
      --startPos;
    }
    let moveMin = [insertDigit(n, minPos, startPos), minPos, startPos];
    
    // return smallest
    return(moveStart[0] <= moveMin[0] ? moveStart : moveMin);
}


