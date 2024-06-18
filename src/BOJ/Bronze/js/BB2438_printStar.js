let a = Number(require('fs').readFileSync('../example/별찍기1예제.txt').toString().trim().split(' '));

for (let i = 1; i <= a; i++) {
    let star='';
    for (let j = 1 ; j <= a; j++) {
        if (a-(i-1)>j){
            star+=' ';
        } else {
            star+='*';
        }
    }
    console.log(star);
}