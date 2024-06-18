let a = require('fs').readFileSync('../example/숫자의개수예제.txt').toString().trim().split('\r\n').map(Number);
let div=1;
a.forEach(v=>div*=v);
for (let i = 0; i < 10; i++) {
    let regex = new RegExp(String(i),'g');
    let matches = String(div).match(regex);
    console.log(matches?matches.length:0);
}
