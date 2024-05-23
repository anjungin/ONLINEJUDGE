let s = require('fs').readFileSync('예제.txt').toString().trim().split('\r\n');
let n=s[0].split(' ')[0];
let m=s[0].split(' ')[1];
let cloud=[[~~n,1],[~~n,2],[~~n-1,1],[~~n-1,2]]

let arry=[];
for (let i = 0; i < ~~n; i++) {
    arry[i]=[];
    for (let j = 0; j < ~~n; j++) {
        arry[i][j]=~~s[i+1].split(' ')[j];
    }
}
// console.log(s)

// let arr=[];
// for (let i = 0; i < ~~m; i++) {
//     arr[i]=[];
//     for (let j = 0; j < ~~m; j++) {
//         arr[i][j]=~~s[i+1+~~n].split(' ')[j];
//     }
// }

console.log(arr)


