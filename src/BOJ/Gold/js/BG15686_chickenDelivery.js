let a = require('fs').readFileSync('../example/치킨배달.txt').toString().trim().split('\n');
let n=a[0].split(' ').map(Number)[0]; //행, 열
let m=a[0].split(' ').map(Number)[1]; //필요 치킨집
let city=[];
let chicken=[];
let house=[];
let sum=[];

for (let i = 0; i < n; i++) {
    city[i]=[];
    for (let j = 0; j < n; j++) {
        city[i][j]=a[i+1]?.split(' ').map(Number)[j];
        if (city[i][j]==2) chicken.push([i,j]);
        if (city[i][j]==1) house.push([i,j]);
    }
}

function getCombinations(arr, m) {
    const results = [];

    function combine(subset, start) {
        // m개의 숫자를 고른 경우 결과 배열에 추가
        if (subset.length === m) {
            results.push([...subset]);
            return;
        }

        for (let i = start; i < arr.length; i++) {
            subset.push(arr[i]);
            combine(subset, i + 1);
            subset.pop();  // 백트래킹을 위해 마지막 원소 제거
        }
    }

    combine([], 0);
    return results;
}


const combinations = getCombinations(chicken, m);
combinations.forEach(va=>{ // 모든 경우의 수만큼
    let distance=0;
    house.forEach(v=>{ // 각 집마다 거리
        let min=0;
        for (let i = 0; i < va.length; i++) { // 또 남길 치킨집 수만큼 반복 - 이 중 가장 작은 치킨 거리로
            if (i==0) min=Math.abs(v[0]-va[i][0])+Math.abs(v[1]-va[i][1]);
            else {
                if(min > Math.abs(v[0] - va[i][0]) + Math.abs(v[1] - va[i][1])){
                    min=Math.abs(v[0] - va[i][0]) + Math.abs(v[1] - va[i][1]);
                };
            }
        }
        distance+=min;
    })
    sum.push(Number(distance))
})
console.log(Math.min(...sum));