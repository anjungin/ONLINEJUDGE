let a = Number(require('fs').readFileSync('../example/n찍기예제.txt').toString().trim().split(' '));
let text='';
for (let i = 1; i <= a; i++) {
    text+=(i+'\n');
}

console.log(text)
