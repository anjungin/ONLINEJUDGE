let a = require('fs').readFileSync('../example/문자열반복예제.txt').toString().trim().split('\r\n');
let test=Number(a[0]);

for (let i = 0; i < test; i++) {
    let repeat = Number(a[i+1][0]);
    let char=a[i+1].split(' ')[1].split('');
    let newChar='';
    char.forEach(v=>{
        for (let j = 0; j < repeat; j++) {
            newChar+=v;
        }
    });
    console.log(newChar);
}

