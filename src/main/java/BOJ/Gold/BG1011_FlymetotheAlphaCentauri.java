package BOJ.Gold;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class BG1011_FlymetotheAlphaCentauri {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int T = Integer.parseInt(br.readLine());
        ArrayList resultList = new ArrayList();

        for (int i = 0; i < T; i++) {
            String[] input = br.readLine().split(" ");
            int X = Integer.parseInt(input[0]);
            int Y = Integer.parseInt(input[1]);
            int distance = Y - X; // 이동해야 할 거리

            int maxMove = (int) Math.sqrt(distance); // 최대 이동할 수 있는 거리(정수 제곱근)
            int maxMoveSquared = maxMove * maxMove; // 정수 제곱근 값의 제곱

            if (distance == maxMoveSquared) {
                resultList.add(2 * maxMove - 1);
            } else if (distance <= maxMoveSquared + maxMove) {
                resultList.add(2 * maxMove);
            } else {
                resultList.add(2 * maxMove + 1);
            }
        }

        for (int i=0; i< resultList.size(); i++) {
            System.out.println(resultList.get(i));
        }
    }
}