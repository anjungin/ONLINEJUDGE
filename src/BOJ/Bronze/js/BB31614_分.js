let a = require('fs').readFileSync('../example/分예제.txt').toString().trim().split('\n');

console.log(Number(a[0])*60+Number(a[1]));
