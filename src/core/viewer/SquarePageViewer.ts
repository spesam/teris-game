import { IViewer } from "../../types";
import $ from "jquery";
import { Square } from "../Square";
import { PageConfig } from "./PageConfig";

export class SquarePageViewer implements IViewer {

    private dom?: JQuery<HTMLElement>;
    private isShow: boolean = false;
    show(): void {
        if (!this.dom) {
            this.dom = $("<div>").css({
                width: PageConfig.PieceSquare.width + "px",
                height: PageConfig.PieceSquare.height + "px",
                position: "absolute",
                border: "1px solid #fff",
                boxSizing: "border-box"
            })
        }

        this.dom.css({
            background: this.square.color,
            left: this.square.point.x * PageConfig.PieceSquare.width + "px",
            top: this.square.point.y * PageConfig.PieceSquare.height + "px"
        }).appendTo(this.container)
        this.isShow = true
    }
    remove(): void {
        if (this.dom && this.isShow) {
            this.dom.remove()
            this.isShow = false
        }
    }

    constructor(private square: Square, private container: JQuery<HTMLElement>) { }
}


