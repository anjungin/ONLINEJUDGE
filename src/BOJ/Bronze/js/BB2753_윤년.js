let a = Number(require('fs').readFileSync('../example/윤년예제.txt').toString().trim().split(' '));

if (a%4==0 && a%100!=0 || a%400==0){
    console.log(1)
}else {
    console.log(0)
}
