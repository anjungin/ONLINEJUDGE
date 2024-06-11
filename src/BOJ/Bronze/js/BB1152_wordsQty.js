let a = require('fs').readFileSync('../example/단어의 개수 예제.txt').toString().trim().split(' ');

console.log(a==''?0:a.length);
