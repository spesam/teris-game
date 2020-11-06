import { GameStatus, GameViewer, MoveDirection } from "../types";
import { GameConfig } from "./GameConfig";
import { Square } from "./Square";
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
    // 已保存的方块
    private _exists: Square[] = [];
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
            TerisRule.move(this._curTeris, MoveDirection.left,this._exists);
        }
    }

    controlRight() {
        if (this._curTeris && this._gameStatus === GameStatus.gameOn) {
            TerisRule.move(this._curTeris, MoveDirection.right,this._exists);
        }
    }

    controlDown() {
        if (this._curTeris && this._gameStatus === GameStatus.gameOn) {
            TerisRule.alwaysMove(this._curTeris, MoveDirection.down,this._exists);
            this.hitBottom();
        }
    }

    controlRotate() {
        if (this._curTeris && this._gameStatus === GameStatus.gameOn) {
            TerisRule.rotate(this._curTeris,this._exists);
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
    }
    /**
     * 触底之后调用
     */
    hitBottom() {
        // 将当前的方块加入到已存在的方块中
        this._exists.push(...this._curTeris?.squares!);
        this.switchTeris();
    }

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
            const isMove = TerisRule.move(this._curTeris!, MoveDirection.down,this._exists);
            if (!isMove) {
                // 触底，不能往下移动了
                this.hitBottom();
            }
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