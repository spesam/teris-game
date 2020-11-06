import { IPoint, MoveDirection, Shape } from "../types";
import { GameConfig } from "./GameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";

export class TerisRule {
    static canIMove(shape: Shape, targetCenterPoint: IPoint) {
        const nextPoint = shape.map(item => {
            return {
                x: item.x + targetCenterPoint.x,
                y: item.y + targetCenterPoint.y
            }
        });
        //边界判断
        const res = nextPoint.some(item => item.x < 0 || item.x > GameConfig.gameArea.width - 1 || item.y < 0 || item.y > GameConfig.gameArea.height - 1)
        if (res) {
            // 超出了边界
            return false
        }
        return true
    }

    static move(teris: SquareGroup, direction: MoveDirection) {
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

        if (this.canIMove(teris.shape, nextCenterPoint)) {
            teris.centerPoint = nextCenterPoint;
            return true
        } else {
            return false
        }
    }

    static alwaysMove(teris: SquareGroup, direction: MoveDirection) {
        while (this.move(teris, direction)) { }
    }

    static rotate(teris: SquareGroup) {
        const newShape = teris.rotateAfterShape();
        if (this.canIMove(newShape, teris.centerPoint)) {
            teris.rotateSquareGroup();
            return true
        }
        else {
            return false
        }
    }
}