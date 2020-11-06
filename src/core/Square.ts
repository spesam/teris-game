import { IPoint, IViewer } from "../types";

export class Square {
    // 坐标 
    // 颜色
    // 显示，可选
    private _viewer?: IViewer
    constructor(private _point: IPoint = { x: 0, y: 0 }, private _color: string = "") { }

    set point(p: IPoint) {
        this._point = p;
        if (this._viewer) {
            this._viewer.show()
        }
    }

    get point() {
        return this._point
    }

    set color(cl) {
        this._color = cl
    }
    get color() {
        return this._color
    }

    set viewer(v) {
        this._viewer = v
        if (v) {
            v.show()
        }
    }

    get viewer() {
        return this._viewer
    }
}





