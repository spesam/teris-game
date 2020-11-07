import { IPoint, MoveDirection, Shape } from "../types";
import { GameConfig } from "./GameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";

export class TerisRule {
    static canIMove(shape: Shape, targetCenterPoint: IPoint, exists: Square[]) {
        const nextPoints = shape.map(item => {
            return {
                x: item.x + targetCenterPoint.x,
                y: item.y + targetCenterPoint.y
            }
        });
        //边界判断
        let res = nextPoints.some(item => item.x < 0 || item.x > GameConfig.gameArea.width - 1 || item.y < 0 || item.y > GameConfig.gameArea.height - 1)
        if (res) {
            // 超出了边界
            return false
        }

        // 判断方块是否与已存在的方块有重叠
        res = nextPoints.some(p => exists.some(sq => sq.point.x === p.x && sq.point.y === p.y));
        if (res) {
            return false;
        }

        return true
    }

    static move(teris: SquareGroup, direction: MoveDirection, exists: Square[]) {
        let nextCenterPoint = {
            x: teris.centerPoint.x,
            y: teris.centerPoint.y
        }

        if (direction === MoveDirection.up) {
            nextCenterPoint.y--
        }
        else if (direction === MoveDirection.down) {
            nextCenterPoint.y++
        }
        else if (direction === MoveDirection.left) {
            nextCenterPoint.x--
        }
        else if (direction === MoveDirection.right) {
            nextCenterPoint.x++
        }

        if (this.canIMove(teris.shape, nextCenterPoint, exists)) {
            teris.centerPoint = nextCenterPoint;
            return true
        } else {
            return false
        }
    }

    static alwaysMove(teris: SquareGroup, direction: MoveDirection, exists: Square[]) {
        while (this.move(teris, direction, exists)) { }
    }

    static rotate(teris: SquareGroup, exists: Square[]) {
        const newShape = teris.rotateAfterShape();
        if (this.canIMove(newShape, teris.centerPoint, exists)) {
            teris.rotateSquareGroup();
            return true
        }
        else {
            return false
        }
    }
    /**
     * 根据y坐标，得到所有y坐标为该值的方块
     * @param exists 
     * @param y 
     */
    static getLineSquares(exists: Square[], y: number) {
        return exists.filter(sq => sq.point.y === y);
    }
    /**
     * 从已存在的方块中进行消除，并返回消除的行数
     * @param exists 
     */
    static deleteSquare(exists: Square[]): number {
        // 1. 获得y坐标数组
        const ys = exists.map(sq => sq.point.y);
        // 2. 获取最大和最小的y坐标
        const maxY = Math.max(...ys);
        const minY = Math.min(...ys);
        // 3. 循环判断每一行是否可以消除
        let num = 0;
        for (let y = minY; y <= maxY; y++) {
            if (this.deleteLine(exists, y)) {
                num++;
            }
        }
        return num;
    }

    private static deleteLine(exists: Square[], y: number): boolean {
        const squares = this.getLineSquares(exists, y);
        if (squares.length === GameConfig.gameArea.width) {
            // 这一行可以消除
            squares.forEach(sq => {
                // 1. 从界面中移除
                if (sq.viewer) {
                    sq.viewer.remove();
                }
                // 2. 从数组中移除
                const index = exists.indexOf(sq);
                exists.splice(index, 1);
            })
            // 剩下的，y坐标比当前y小的方块，y+1
            exists.filter(sq => sq.point.y < y).forEach(sq => {
                sq.point = {
                    x: sq.point.x,
                    y: sq.point.y + 1,
                }
            })

            return true;
        }
        return false;
    }
}