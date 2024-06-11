let a = require('fs').readFileSync('../example/時間예제.txt').toString().trim().split('\n');

console.log(Number(a[0])*24);
