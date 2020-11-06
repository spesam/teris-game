import { IPoint, Shape } from "../types";
import { Square } from "./Square";

export class SquareGroup {
    // 小方块数组，只读
    squares: readonly Square[] = []

    constructor(private _shape: Shape, private _centerPoint: IPoint, private _color: string) {
        this.mapSahpeToSquares(this._shape, this._centerPoint, this._color)
    }

    public set centerPoint(p: IPoint) {
        const dis = {
            x: p.x - this._centerPoint.x,
            y: p.y - this._centerPoint.y
        }
        this._centerPoint = p;
        this.squares.forEach(item => {
            item.point = {
                x: item.point.x + dis.x,
                y: item.point.y + dis.y
            }
        })
    }

    public get centerPoint() {
        return this._centerPoint
    }


    public get shape() {
        return this._shape
    }

    public isClock: boolean = true
    rotateAfterShape(): Shape {
        if (this.isClock) {
            return this._shape.map(item => {
                const temp: IPoint = {
                    x: -item.y,
                    y: item.x
                }
                return temp
            })
        } else {
            return this._shape.map(item => {
                const temp: IPoint = {
                    x: item.y,
                    y: -item.x
                }
                return temp
            })
        }

    }

    rotateSquareGroup() {
        const newShape: IPoint[] = this.rotateAfterShape();
        this._shape = newShape;
        this.squares.forEach((item, i) => {
            item.point = {
                x: this._shape[i].x + this._centerPoint.x,
                y: this._shape[i].y + this._centerPoint.y
            }
        })
    }

    private mapSahpeToSquares(shape: Shape, centerPoint: IPoint, color: string) {
        const temp = this._shape.map(item => new Square(item, this._color))
        this.squares = temp;
        this.squares.forEach(item => {
            item.point = {
                x: item.point.x + this._centerPoint.x,
                y: item.point.y + this._centerPoint.y
            }
        })
    }
}

