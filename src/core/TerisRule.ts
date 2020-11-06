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
}