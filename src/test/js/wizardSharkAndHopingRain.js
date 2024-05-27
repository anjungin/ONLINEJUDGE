let a = require('fs').readFileSync('../example/마법사상어와비바라기2.txt').toString().trim().split('\n');
let n=a[0].split(' ').map(Number)[0];
let m=a[0].split(' ').map(Number)[1];
let cloud=[[0,n-1],[1,n-1],[0,n-2],[1,n-2]] //좌표기준
let rainAmount=0;

let rain=[];
for (let i = 0; i < n; i++) {
    rain[i]=[];
    for (let j = 0; j < n; j++) {
        rain[i][j]=a[i+1]?.split(' ').map(Number)[j];
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
        if (cloud[i][0]+s>n-1) cloud[i][0] = cloud[i][0]-(n-s);
        else cloud[i][0]=cloud[i][0]+s;
    }
}
let setTop = function (n,s) {
    for (let i = 0; i < cloud.length; i++) {
        if (cloud[i][1]- s< 0) cloud[i][1] = cloud[i][1]+(n-s);
        else cloud[i][1]=cloud[i][1]-s;
    }
}

let setBottom = function (n,s) {
    for (let i = 0; i < cloud.length; i++) {
        if (cloud[i][1]+s>n-1) cloud[i][1] = cloud[i][1]-(n-s);
        else cloud[i][1]=cloud[i][1]+s;
    }
}

let setSecondCloudLocation = function () {
    let newCloud=[];
    let originRain=JSON.parse(JSON.stringify(rain));
    rainAmount=0;
    rain.forEach((row,idx)=>{
        row.forEach((cell,cidx)=>{
            if (rain[idx][cidx]>=2) {
                rain[idx][cidx] -= 2;
                newCloud.push([cidx,idx]);
            }
            rainAmount+=rain[idx][cidx];
        })
    });

    cloud.forEach(v=>{
        rainAmount-=rain[v[1]][v[0]];
        rain[v[1]][v[0]]=originRain[v[1]][v[0]];
        rainAmount+=rain[v[1]][v[0]];
    })

    newCloud=newCloud.filter(item=>{
        return !cloud.some(item2 => arraysEqual(item, item2));
    })

    cloud=newCloud;
}

const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

let setCloudLocation = function (n,s,d) {
    let size = s>=n?s%n:s;
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

let onWaterPasteBug = function () {
    let water = 0;
    cloud.forEach(v=>{
        let x = v[0];
        let y = v[1];
        if (x==0 || x==n-1) { //x이 0 or n-1
            if (   x == y
                || x==0 && y==n-1
                || x==n-1 && y==0
            ) {
                if (x==0    && y==0     && rain[y+1][x+1]>0   )  water++; //x=0 y=0 & 대각 바구니 물 有
                else if (x==0    && y==n-1   && rain[y-1][x+1]>0   )  water++; //x=0 y=n-1 & 대각 바구니 물 有
                else if (x==n-1  && y==0   && rain[y+1][x-1]>0   )  water++; //x=n-1 y=0 & 대각 바구니 물 有
                else if (x==n-1  && y==n-1 && rain[y-1][x-1]>0   )  water++; //x=n-1 y=n-1 & 대각 바구니 물 有
            } else {
                //그외 조건에서 양대각 바구니 물 有
                if (x==0 && rain[y+1][x+1]>0) water++;
                if (x==0 && rain[y-1][x+1]>0) water++;
                if (x==n-1 && rain[y-1][x-1]>0) water++;
                if (x==n-1 && rain[y+1][x-1]>0) water++;
            }
        } else if (y==0 || y==n-1) { //y절편이 0 or n-1
            //그외 조건에서 양대각 바구니 물 有
            if (y==0     && rain[y+1][x-1]>0) water++;
            if (y==0     && rain[y+1][x+1]>0) water++;
            if (y==n-1   && rain[y-1][x-1]>0) water++;
            if (y==n-1   && rain[y-1][x+1]>0) water++;
        } else { // 중심부
            if (rain[y+1][x-1]>0) water++;
            if (rain[y+1][x+1]>0) water++;
            if (rain[y-1][x-1]>0) water++;
            if (rain[y-1][x+1]>0) water++;
        }
        rain[y][x] += water;
        water=0;
    });
}

let d,s;
for (let i = 0; i < m; i++) {
    d=a[i+1+n]?.split(' ').map(Number)[0]; // 방향
    s=a[i+1+n]?.split(' ').map(Number)[1]; // 거리
    setCloudLocation(n,s,d);

    cloud.forEach(v=>{
        let row=v[1];
        let cell=v[0];
        rain[row][cell]+=1;
    });

    onWaterPasteBug();
    setSecondCloudLocation();
}
console.log(rainAmount)