import { IGameViewer } from "../../types";
import { SquareGroup } from "../SquareGroup";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from "jquery";
export class GamePageViewer implements IGameViewer {
    showNext(teris: SquareGroup): void {
        teris.squares.forEach(sq => {
            sq.viewer = new SquarePageViewer(sq, $(".next"));
        })
    }
    switchTeris(teris: SquareGroup): void {
        teris.squares.forEach(sq => {
            sq.viewer?.remove();
            sq.viewer = new SquarePageViewer(sq, $(".panel"));
        })
    }
}