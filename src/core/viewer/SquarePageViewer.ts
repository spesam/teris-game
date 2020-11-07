import { IViewer } from "../../types";
import $ from "jquery";
import { Square } from "../Square";
import { PageConfig } from "./PageConfig";

export class SquarePageViewer implements IViewer {

    private _dom?: JQuery<HTMLElement>;
    private _isShow: boolean = false;
    show(): void {
        if (!this._dom) {
            this._dom = $("<div>").css({
                width: PageConfig.PieceSquare.width + "px",
                height: PageConfig.PieceSquare.height + "px",
                position: "absolute",
                border: "1px solid #fff",
                boxSizing: "border-box"
            })
        }

        this._dom.css({
            background: this.square.color,
            left: this.square.point.x * PageConfig.PieceSquare.width + "px",
            top: this.square.point.y * PageConfig.PieceSquare.height + "px",
        }).appendTo(this.container);
        this._isShow = true;
    }
    remove(): void {
        if (this._dom && this._isShow) {
            this._dom.remove();
            this._isShow = false;
        }
    }

    public get isShow() {
        return this._isShow;
    }
    
    constructor(private square: Square, private container: JQuery<HTMLElement>) { }
}


