let input = require('fs').readFileSync('../example/a+b-c예제.txt').toString().trim().split('\r\n');
let a=input[0];
let b=input[1];
let c=input[2];

console.log(Number(a)+Number(b)-Number(c));
console.log(a+b-c);
