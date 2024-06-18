let a = require('fs').readFileSync('../example/알람시계예제.txt').toString().trim().split(' ').map(Number);
let alram='';
if (Number(a[1])-45<0){
    alram=String(a[0]==0?23:a[0]-1)+' '+(String(60+(a[1]-45)));
}else {
    alram=String(a[0])+' '+(String(a[1]-45));
}
console.log(alram)