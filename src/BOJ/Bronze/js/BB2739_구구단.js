let a = Number(require('fs').readFileSync('../example/구구단예제.txt').toString().trim().split(' '));

for (let i = 1; i < 10; i++) {
    console.log(a+' * '+i+' = '+a*i);
}
