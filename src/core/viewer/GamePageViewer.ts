import { GameStatus, IGameViewer } from "../../types";
import { SquareGroup } from "../SquareGroup";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from "jquery";
import { Game } from "../Game";
import { GameConfig } from "../GameConfig";
import { PageConfig } from "./PageConfig";

export class GamePageViewer implements IGameViewer {
    private nextDOM = $(".next");
    private panelDOM = $(".panel");
    private scoreDOM = $(".score");
    private msgDOM = $(".msg");



    onGamePause(): void {
        this.msgDOM.css({ display: "flex" });
        this.msgDOM.find("p").html("游戏暂停");
    }
    onGameStart(): void {
        this.msgDOM.hide();
    }
    onGameOver(): void {
        this.msgDOM.css({ display: "flex" });
        this.msgDOM.find("p").html("GG 思密达");
    }
    showScore(score: number): void {
        this.scoreDOM.html(score.toString());
    }

    init(game: Game): void {
        // 1. 设置宽高
        this.panelDOM.css({
            width: GameConfig.gameArea.width * PageConfig.PieceSquare.width,
            height: GameConfig.gameArea.height * PageConfig.PieceSquare.height,
        })

        this.nextDOM.css({
            width: GameConfig.nextArea.width * PageConfig.PieceSquare.width,
            height: GameConfig.nextArea.height * PageConfig.PieceSquare.height,
        })
        // 2. 注册键盘事件
        $(document).keydown(e => {

            if (e.keyCode === 37) {
                game.controlLeft();
            }
            else if (e.keyCode === 38) {
                game.controlRotate();
            }
            else if (e.keyCode === 39) {
                game.controlRight();
            }
            else if (e.keyCode === 40) {
                game.controlDown();
            }
            else if (e.keyCode === 32) {
                if (game.gameSratus === GameStatus.gameOn) {
                    game.pause();
                }
                else {
                    game.start();
                }
            }
        })
    }

    showNext(teris: SquareGroup): void {
        teris.squares.forEach(sq => {
            sq.viewer = new SquarePageViewer(sq, this.nextDOM);
        });
    };

    switchTeris(teris: SquareGroup): void {
        teris.squares.forEach(sq => {
            sq.viewer?.remove();
            sq.viewer = new SquarePageViewer(sq, this.panelDOM);
        });
    };
}