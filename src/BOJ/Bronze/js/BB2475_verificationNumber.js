let a = require('fs').readFileSync('../example/검증수예제.txt').toString().trim().split(' ').map(Number);
let sum=0;

a.forEach(v=>{
    sum+=v*v;
});

console.log(sum%10)