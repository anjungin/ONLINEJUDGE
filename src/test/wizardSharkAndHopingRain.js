let a = require('fs').readFileSync('예제.txt').toString().trim().split('\r\n');
let n=~~(a[0].split(' ')[0])-1;
let m=a[0].split(' ')[1];
let cloud=[[~~n,0],[~~n,1],[~~n-1,0],[~~n-1,1]]

let rain=[];
for (let i = 0; i < ~~n+1; i++) {
    rain[i]=[];
    for (let j = 0; j < ~~n+1; j++) {
        rain[i][j]=~~a[i+1].split(' ')[j];
    }
}

let setLeft = function (n,s) {
    for (let i = 0; i < cloud.length; i++) {
        if (cloud[i][0]-s<0) cloud[i][0]=cloud[i][0]+(n-s);
        else cloud[i][0]=cloud[i][0]-s;
    }
}
let setRight = function (n,s) {
    for (let i = 0; i < cloud.length; i++) {
        if (cloud[i][0]+s>=n) cloud[i][0] = cloud[i][0]-(n-s);
        else cloud[i][0]=cloud[i][0]+s;
    }
}
let setTop = function (n,s) {
    for (let i = 0; i < cloud.length; i++) {
        if (cloud[i][1]- s<= 0) cloud[i][1] = cloud[i][1]+(n-s);
        else cloud[i][1]=cloud[i][1]-s;
    }
}

let setBottom = function (n,s) {
    for (let i = 0; i < cloud.length; i++) {
        if (cloud[i][0]+s>=n) cloud[i][0] = cloud[i][0]+(n-s);
        else cloud[i][0]=cloud[i][0]+s;
    }
}

let setCloud = function (n,s,d) {
    let size = s>n?s%n:s;
    switch (d) {
        case 1 :  // <-
            setLeft(n,size);
            break;
        case 2 :  // ^<-
            setTop(n,size);
            setLeft(n,size);
            break;
        case 3 :  // ^
            setTop(n,size);
            break;
        case 4 :  // ->^
            setRight(n,size);
            setTop(n,size);
            break;
        case 5 :  // ->
            setRight(n,size);
            break;
        case 6 :  // ->v
            setRight(n,size);
            setBottom(n,size);
            break;
        case 7 :  // v
            setBottom(n,size);
            break;
        case 8 :  // v
            setBottom(n,size);
            setLeft(n,size);
            break;
    }
}

let d,s;
for (let i = 0; i < ~~m; i++) {
    d=~~a[i+2+~~n].split(' ')[0]; // 방향
    s=~~a[i+2+~~n].split(' ')[1]; // 거리

    setCloud(n,s,d);

    // console.log(d)
    // console.log(s)
    cloud.forEach(v=>{
        console.log(v)
        rain[n-v[0]][n-v[1]]+=1;
    })
    console.log(rain)
}





