import { GameStatus, GameViewer, MoveDirection } from "../types";
import { GameConfig } from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { createTeris, TShapeTeris } from "./Teris";
import { TerisRule } from "./TerisRule";

export class Game {
    // 游戏状态
    private _gameStatus: GameStatus = GameStatus.init;
    // 当前方块
    private _curTeris?: SquareGroup;
    // 下一个方块
    private _nextTeris: SquareGroup = createTeris({ x: 0, y: 0 });
    // 计时器
    private _timer?: number;
    // 间隔时间
    private duration: number = 1000;

    constructor(private _viewer: GameViewer) {
        this.resetCenterPoint(GameConfig.nextArea.width, this._nextTeris);
        this._viewer.showNext(this._nextTeris);
    }

    // 游戏开始
    public start() {
        if (this._gameStatus === GameStatus.gameOn) {
            return;
        }
        this._gameStatus = GameStatus.gameOn;
        if (!this._curTeris) {
            this._curTeris = this._nextTeris;
            this.switchTeris();
        };
        this.autoDrop();
    };

    controlLeft() {
        if (this._curTeris && this._gameStatus === GameStatus.gameOn) {
            TerisRule.move(this._curTeris, MoveDirection.left);
        }
    }

    controlRight() {
        if (this._curTeris && this._gameStatus === GameStatus.gameOn) {
            TerisRule.move(this._curTeris, MoveDirection.right);
        }
    }

    controlDown() {
        if (this._curTeris && this._gameStatus === GameStatus.gameOn) {
            TerisRule.alwaysMove(this._curTeris, MoveDirection.down);
        }
    }

    controlRotate() {
        if (this._curTeris && this._gameStatus === GameStatus.gameOn) {
            TerisRule.rotate(this._curTeris);
        }
    }
    /**
     * 游戏暂停
     */
    public pause() {
        if (this._gameStatus === GameStatus.gameOn) {
            this._gameStatus = GameStatus.gamePause;
            clearInterval(this._timer);
            this._timer = undefined;
        }
    };
    /**
     * 切换方块
     */
    private switchTeris() {
        this._curTeris = this._nextTeris;
        this.resetCenterPoint(GameConfig.gameArea.width, this._curTeris!);
        this._nextTeris = createTeris({ x: 0, y: 0 });
        this.resetCenterPoint(GameConfig.nextArea.width, this._nextTeris);
        this._viewer.switchTeris(this._curTeris);
        this._viewer.showNext(this._nextTeris);
    };
    /**
     * 方块自由下落
     */
    private autoDrop() {
        if (this._timer || this._gameStatus !== GameStatus.gameOn) {
            return
        }
        this._timer = setInterval(() => {
            TerisRule.move(this._curTeris!, MoveDirection.down)
        }, this.duration)
    }

    /**
     * 重新设置中心点坐标，让该方块重新在面板的中上方
     * @param width 
     * @param teris 
     */
    private resetCenterPoint(width: number, teris: SquareGroup) {
        const x = Math.ceil(width / 2 - 1);
        const y = 0;
        teris.centerPoint = { x, y };
        while (teris.squares.some(sq => sq.point.y < 0)) {
            teris.squares.forEach(sq => {
                sq.point = {
                    x: sq.point.x,
                    y: sq.point.y + 1,
                }
            })
        }
    }
}