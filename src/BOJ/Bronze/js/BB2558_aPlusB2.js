let a = require('fs').readFileSync('../example/a+b2예제.txt').toString().trim().split('\n');
let n=Number(a[0]);
let m=Number(a[1]);

console.log(n+m);
