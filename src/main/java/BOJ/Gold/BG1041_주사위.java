package BOJ.Gold;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

public class BG1041_주사위 {
    public static void main(String[] args) throws Exception {
        // 3가지면이 보이는 경우 맨 위 귀퉁이 4개
        // 2가지면이 보이는 경우 귀퉁이를 제외한 겉 4개의 기둥과 윗면 4개의 테두리. 기둥은 n-1 테두리는 n-2 2가지면 조합은 4*(n-1)+4*(n-2) = 8n-12
        // 1가지면이 보이는 경우 n*n*5(전체 면) - (4*3+8*(n-1)+8*(n-2)) = n*n*5-16*n+12
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long n = Integer.parseInt(br.readLine());
        int[] input = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        long minValueForThree = getMinValueForThree(input);
        long minValueForTwo = getMinValueForTwo(input);
        long minValueForOne = Arrays.stream(input).min().getAsInt();
        long result;
        if (n==1) {
            long maxInSix = Arrays.stream(input).max().getAsInt();
            long sum = 0;
            for (int i = 0; i < 6; i++) {
                sum+=input[i];
            }
            result = sum - maxInSix;
        }else {
            result = minValueForThree * 4 + minValueForTwo * (8 * n - 12) + minValueForOne * (n * n * 5 - 16 * n + 12);
        }
        System.out.println(result);
    }

    static int getMinValueForThree(int[] input) {
        int[][] forThree = {{1,2},{1,3},{2,4},{3,4}};
        ArrayList<Integer> threeFaceSum = new ArrayList<>(); //3가지 면의 합 list

        for (int i = 0; i < 6; i+=5) { // A 와 F면을 포함해 만들 수 있는 3가지 면의 합 list 구하기
            for (int j = 0; j < forThree.length; j++) {
                threeFaceSum.add(input[i]+input[forThree[j][0]]+input[forThree[j][1]]);
            }
        }

        return Collections.min(threeFaceSum); //3가지 면의 합 list에서 최소합
    }
    static int getMinValueForTwo(int[] input) {
        ArrayList<Integer> twoFaceSum = new ArrayList<>(); //2가지 면의 합 list
        for (int i = 0; i < 6; i++) { // A~F 2가지 면의 합 list 구하기
            for (int j = 5; 0+i < j; j--) { // 동일한 조합은 한 번씩만 합
                if (i!=j && (i+j!=5)) twoFaceSum.add(input[i]+input[j]); //동일숫자, 주사위반대편숫자 제외
            }
        }
        return Collections.min(twoFaceSum); //2가지 면의 합 list에서 최소합
    }
}
