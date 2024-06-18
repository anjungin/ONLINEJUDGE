let a = require('fs').readFileSync('../example/오븐시계예제.txt').toString().trim().split('\r\n');
let nowHour = Number(a[0].split(' ')[0]);
let nowMinute = Number(a[0].split(' ')[1]);
let time = Number(a[1]);
let hour = Math.trunc(time/60)+nowHour;
let minute = Math.trunc(time%60)+nowMinute;
if (minute>59) {
    let h=Math.trunc(minute/60);
    let m=Math.trunc(minute%60)
    hour+=h;
    minute=m;
}

console.log(String(hour>23?hour%24:hour)+' '+String(minute));