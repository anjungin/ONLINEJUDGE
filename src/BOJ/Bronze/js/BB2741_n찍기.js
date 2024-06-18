let a = Number(require('fs').readFileSync('../example/n찍기예제.txt').toString().trim().split(' '));

for (let i = 1; i <= a; i++) {
    console.log(i);
}