let a = require('fs').readFileSync('../example/최댓값예제.txt').toString().trim().split('\r\n').map(Number);
let max = Math.max(...a);
let maxIdx = a.indexOf(max);
console.log(max);
console.log(maxIdx+1);
