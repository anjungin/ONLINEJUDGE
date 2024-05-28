let a = require('fs').readFileSync('../example/로봇청소기예제.txt').toString().trim().split('\n');
let n=a[0].split(' ').map(Number)[0]; //행
let m=a[0].split(' ').map(Number)[1]; //열
let [r,c,way]=a[1].split(' ').map(Number); //청소기 위치, 방향
let dust=[];
let dustSum=0; //먼지 개수(청소하는 칸의 개수)
let dustFlag=true;

for (let i = 0; i < n; i++) {
    dust[i]=[];
    for (let j = 0; j < m; j++) {
        dust[i][j]=a[i+2]?.split(' ').map(Number)[j];
    }
}

let setNorth = function (blank) {
    if (!blank) {
        if (dust[r+1][c]!=1){ // 2-1. 바라보는 방향을 유지한 채로 한 칸 후진할 수 있다면 한 칸 후진하고 1번으로 돌아간다.
            r+=1;
        } else { // 2-2. 바라보는 방향의 뒤쪽 칸이 벽이라 후진할 수 없다면 작동을 멈춘다.
            dustFlag = false;
        }
    } else {
        if (dust[r][c-1]==0) { // 3-1. 반시계 방향으로 90도 회전한다.
            way=3;
            c -= 1; // 3-2. 바라보는 방향을 기준으로 앞쪽 칸이 청소되지 않은 빈 칸인 경우 한 칸 전진한다.
        } else if (dust[r+1][c]==0) { // 3-3. 빈 칸이 아닌 경우 3-1 ~ 3-2 반복
            r+=1;
            way=2;
        } else if (dust[r][c+1]==0) {
            c+=1;
            way=1;
        } else {
            r-=1;
        }
    }
}
let setEast = function (blank) {
    if (!blank) {
        if (dust[r][c-1]!=1){ // 2-1. 바라보는 방향을 유지한 채로 한 칸 후진할 수 있다면 한 칸 후진하고 1번으로 돌아간다.
            c-=1;
        } else { // 2-2. 바라보는 방향의 뒤쪽 칸이 벽이라 후진할 수 없다면 작동을 멈춘다.
            dustFlag = false;
        }
    } else {
        if (dust[r-1][c]==0) {
            way=0; // 3-1. 반시계 방향으로 90도 회전한다.
            r -= 1; // 3-2. 바라보는 방향을 기준으로 앞쪽 칸이 청소되지 않은 빈 칸인 경우 한 칸 전진한다.
        } else if (dust[r][c-1]==0) { // 3-3. 빈 칸이 아닌 경우 3-1 ~ 3-2 반복
            c-=1;
            way=3;
        } else if (dust[r+1][c]==0) {
            r+=1;
            way=2;
        } else {
            c+=1;
        }
    }
}
let setSouth = function (blank) {
    if (!blank) {
        if (dust[r-1][c]!=1){ // 2-1. 바라보는 방향을 유지한 채로 한 칸 후진할 수 있다면 한 칸 후진하고 1번으로 돌아간다.
            r-=1;
        } else { // 2-2. 바라보는 방향의 뒤쪽 칸이 벽이라 후진할 수 없다면 작동을 멈춘다.
            dustFlag = false;
        }
    } else {
        if (dust[r][c+1]==0) {
            way=1; // 3-1. 반시계 방향으로 90도 회전한다.
            c += 1; // 3-2. 바라보는 방향을 기준으로 앞쪽 칸이 청소되지 않은 빈 칸인 경우 한 칸 전진한다.
        }  else if (dust[r-1][c]==0) { // 3-3. 빈 칸이 아닌 경우 3-1 ~ 3-2 반복
            r-=1;
            way=0;
        } else if (dust[r][c-1]==0) {
            c-=1;
            way=3;
        } else {
            r+=1;
        }
    }
}
let setWest = function (blank) {
    if (!blank) {
        if (dust[r][c+1]!=1){ // 2-1. 바라보는 방향을 유지한 채로 한 칸 후진할 수 있다면 한 칸 후진하고 1번으로 돌아간다.
            c+=1;
        } else { // 2-2. 바라보는 방향의 뒤쪽 칸이 벽이라 후진할 수 없다면 작동을 멈춘다.
            dustFlag = false;
        }
    } else {
        if (dust[r+1][c]==0) {
            way=2; // 3-1. 반시계 방향으로 90도 회전한다.
            r += 1; // 3-2. 바라보는 방향을 기준으로 앞쪽 칸이 청소되지 않은 빈 칸인 경우 한 칸 전진한다.
        } else if (dust[r][c+1]==0) { // 3-3. 빈 칸이 아닌 경우 3-1 ~ 3-2 반복
            c+=1;
            way=1;
        } else if (dust[r-1][c]==0) {
            r-=1;
            way=0;
        } else {
            c-=1;
        }
    }
}

while (dustFlag) {
    if (dust[r][c]==1) return dustFlag=false; //청소기가 가리키는 곳이 벽이면 중단
    if (dust[r][c]==0) { //1. 현재 칸이 아직 청소되지 않은 경우, 현재 칸을 청소한다.
        dust[r][c]=2; //청소상태-완료
        dustSum++;
    }

    if (dust[r][c+1]!=0 && dust[r-1][c]!=0 && dust[r][c-1]!=0 && dust[r+1][c]!=0) { //2. 현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 없는 경우
        if (way==0) setNorth(false);
        else if (way==1) setEast(false);
        else if (way==2) setSouth(false);
        else if (way==3) setWest(false);
    } else if (dust[r][c+1]==0 || dust[r-1][c]==0 || dust[r][c-1]==0 || dust[r+1][c]==0) { //3. 현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 있는 경우
        if (way==0) setNorth(true);
        else if (way==1) setEast(true);
        else if (way==2) setSouth(true);
        else if (way==3) setWest(true);
    }
}
if (!dustFlag) console.log(dustSum)