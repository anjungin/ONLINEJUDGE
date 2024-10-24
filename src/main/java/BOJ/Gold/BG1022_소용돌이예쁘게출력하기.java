package BOJ.Gold;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.Comparator;

public class BG1022_소용돌이예쁘게출력하기 {
    public static void main(String [] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int[] input = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();

        int maxAbsValue = Arrays.stream(input)
                .boxed()  // 기본형 배열을 참조형으로 변환
                .max(Comparator.comparingInt(Math::abs))
                .map(Math::abs)
                .orElse(0);  // 비어있을 경우 기본값 0
        int[][] square = setSquare(maxAbsValue, input);

        int maxAbsValueInSquare = Integer.MIN_VALUE;
        // 2차원 배열 순회
        for (int i = 0; i < square.length; i++) {
            for (int j = 0; j < square[i].length; j++) {
                // 현재 값의 절댓값과 최대 절댓값을 비교
                int absValue = Math.abs(square[i][j]);
                if (absValue > maxAbsValueInSquare) {
                    maxAbsValueInSquare = absValue;
                }
            }
        }

        for (int i = 0; i < square.length; i++) {
            for (int j = 0; j < square[i].length; j++) {
                String result = String.valueOf(square[i][j]);
                if (result.length()!=String.valueOf(maxAbsValueInSquare).length() || (square[i].length!=1 && square.length!=1)) {
                    int gap = String.valueOf(maxAbsValueInSquare).length()-result.length();
                    for (int k = 0; k < gap; k++) {
                        result = " " + result;
                    }
                }
                System.out.print(result);
                if (j!=square[i].length-1 && square[i].length!=1) System.out.print(" ");
            }
            System.out.println();
        }
    }

    public static int[][] setSquare(int maxAbsValue, int[] input) {
        int[][] square = new int[Math.abs(input[0]-input[2])+1][Math.abs(input[1]-input[3])+1];
        int news=0; //우상좌하 1234 - 출력기준
        int repeat=1; //전진할 횟수
        int repeatNow=0; //전진한 횟수
        int rerepeat=0; //고정된 전진값을 반복한 횟수

        int x = maxAbsValue;
        int y = maxAbsValue;

        for (int i=1; i<=(maxAbsValue*2+1)*(maxAbsValue*2+1); i++) {
            if (news==0) {
                if (input[0]+maxAbsValue<=y && y<=input[2]+maxAbsValue && input[1]+maxAbsValue<=x && x<=input[3]+maxAbsValue) square[y-maxAbsValue-input[0]][x-maxAbsValue-input[1]]=i;
                news++;
                continue;
            }
            else if (news==1) x++;
            else if (news==2) y--;
            else if (news==3) x--;
            else y++;

            if (input[0]+maxAbsValue<=y && y<=input[2]+maxAbsValue && input[1]+maxAbsValue<=x && x<=input[3]+maxAbsValue) {
                square[y-maxAbsValue-input[0]][x-maxAbsValue-input[1]]=i;
            }

            repeatNow++; //1보 전진

            if (repeatNow==repeat) { //전진목표도달
                if (news==4) news=1;
                else news++;

                rerepeat++; //전진목표까지를 반복한 횟수 ++
                repeatNow=0;
            }

            if (rerepeat==2) { //전진목표까지를 두 번 달성하면 전진목표 1추가
                repeat++;
                rerepeat=0;
            }
        }
        return square;
    }
}
