package BOJ.Gold;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;

public class BG9205_맥주마시면서걸어가기 {
    static class Point {
        int x, y;
        
        Point(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int testCaseQty = Integer.parseInt(br.readLine());
        
        for (int i = 0; i < testCaseQty; i++) {
            int conStoreQty = Integer.parseInt(br.readLine());
            String[] home = br.readLine().split(" ");
            Point start = new Point(Integer.parseInt(home[0]), Integer.parseInt(home[1]));
            
            ArrayList<Point> stores = new ArrayList<>();
            for (int j = 0; j < conStoreQty; j++) {
                String[] store = br.readLine().split(" ");
                stores.add(new Point(Integer.parseInt(store[0]), Integer.parseInt(store[1])));
            }
            
            String[] fest = br.readLine().split(" ");
            Point festival = new Point(Integer.parseInt(fest[0]), Integer.parseInt(fest[1]));
            
            System.out.println(bfs(start, stores, festival));
        }
    }
    
    static String bfs(Point start, ArrayList<Point> stores, Point festival) {
        Queue<Point> queue = new LinkedList<>();
        HashSet<String> visited = new HashSet<>();
        queue.offer(start);
        visited.add(start.x + "," + start.y);
        
        while (!queue.isEmpty()) {
            Point current = queue.poll();
            
            // 현재 위치에서 페스티벌까지 갈 수 있는지 확인
            if (getDistance(current, festival) <= 1000) {
                return "happy";
            }
            
            // 모든 편의점을 확인
            for (Point store : stores) {
                String pos = store.x + "," + store.y;
                if (!visited.contains(pos) && getDistance(current, store) <= 1000) {
                    queue.offer(store);
                    visited.add(pos);
                }
            }
        }
        
        return "sad";
    }
    
    static int getDistance(Point p1, Point p2) {
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }
}