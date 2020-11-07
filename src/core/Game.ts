import { GameStatus, IGameViewer, MoveDirection } from "../types";
import { GameConfig } from "./GameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { TerisRule } from "./TerisRule";

export class Game {
    // 游戏状态
    private _gameStatus: GameStatus = GameStatus.init;
    // 当前方块
    private _curTeris?: SquareGroup;
    // 下一个方块
    private _nextTeris: SquareGroup
    // 计时器
    private _timer?: number;
    // 间隔时间
    private _duration: number = 1000;
    // 已保存的方块
    private _exists: Square[] = [];
    // 积分
    private _score: number = 0;

    public get gameSratus() {
        return this._gameStatus;
    }

    public get score() {
        return this._score;
    }

    public set score(val) {
        this._score = val;
        this._viewer.showScore(val);
        const level = GameConfig.level.filter(item => item.score < val).pop()!;
        if (level.duration === this._duration) {
            return
        }
        this._duration = level.duration;
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = undefined;
            this.autoDrop();
        }
    }

    constructor(private _viewer: IGameViewer) {
        this._duration = GameConfig.level[0].duration;
        this._nextTeris = createTeris({ x: 0, y: 0 }); //没有含义，只是为了不让TS报错
        this.createNext();
        this._viewer.init(this);
        this._viewer.showScore(this.score);
    }

    private createNext() {
        this._nextTeris = createTeris({ x: 0, y: 0 });
        this.resetCenterPoint(GameConfig.nextArea.width, this._nextTeris);
        this._viewer.showNext(this._nextTeris);
    }

    private init() {
        this._exists.forEach(sq => {
            if (sq.viewer) {
                sq.viewer.remove();
            }
        })
        this._exists = [];
        this.createNext();
        this._curTeris = undefined;
        this.score = 0;
    }
    // 游戏开始
    public start() {
        // 游戏状态的改变
        if (this._gameStatus === GameStatus.gameOn) {
            return;
        }
        // 从游戏结束到开始
        if (this._gameStatus === GameStatus.gameOver) {
            this.init();
        }
        this._gameStatus = GameStatus.gameOn;
        if (!this._curTeris) {
            this.switchTeris();
        };
        this.autoDrop();
        this._viewer.onGameStart();
    };

    controlLeft() {
        if (this._curTeris && this._gameStatus === GameStatus.gameOn) {
            TerisRule.move(this._curTeris, MoveDirection.left, this._exists);
        }
    }

    controlRight() {
        if (this._curTeris && this._gameStatus === GameStatus.gameOn) {
            TerisRule.move(this._curTeris, MoveDirection.right, this._exists);
        }
    }

    controlDown() {
        if (this._curTeris && this._gameStatus === GameStatus.gameOn) {
            TerisRule.alwaysMove(this._curTeris, MoveDirection.down, this._exists);
            this.hitBottom();
        }
    }

    controlRotate() {
        if (this._curTeris && this._gameStatus === GameStatus.gameOn) {
            TerisRule.rotate(this._curTeris, this._exists);
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
            this._viewer.onGamePause();
        }
    }
    /**
     * 触底之后调用
     */
    hitBottom() {
        // 将当前的方块加入到已存在的方块中
        this._exists.push(...this._curTeris?.squares!);
        // 处理移除
        const num = TerisRule.deleteSquare(this._exists);
        // 增加积分
        this.addScore(num);
        // 切换方块
        this.switchTeris();
    }

    /**
     * 切换方块
     */
    private switchTeris() {
        this._curTeris = this._nextTeris;
        this.resetCenterPoint(GameConfig.gameArea.width, this._curTeris!);
        this._curTeris.squares.forEach(sq => {
            if (sq.viewer) {
                sq.viewer.remove();
            }
        })
        // 有可能出现的问题：当前方一出现时，就已经和之前的方块重叠了
        if (!TerisRule.canIMove(this._curTeris.shape, this._curTeris.centerPoint, this._exists)) {
            // 游戏结束
            this._gameStatus = GameStatus.gameOver;
            clearInterval(this._timer);
            this._timer = undefined;
            this._viewer.onGameOver();
            return;
        }

        this.createNext();
        this._viewer.switchTeris(this._curTeris);
    };
    /**
     * 方块自由下落
     */
    private autoDrop() {
        if (this._timer || this._gameStatus !== GameStatus.gameOn) {
            return
        }
        this._timer = setInterval(() => {
            const isMove = TerisRule.move(this._curTeris!, MoveDirection.down, this._exists);
            if (!isMove) {
                // 触底，不能往下移动了
                this.hitBottom();
            }
        }, this._duration)
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
            teris.centerPoint = {
                x: teris.centerPoint.x,
                y: teris.centerPoint.y + 1,
            }
        }
    }

    private addScore(lineNum: number) {
        if (lineNum === 0) {
            return;
        }
        else if (lineNum === 1) {
            this.score += 10;
        }
        else if (lineNum === 2) {
            this.score += 25
        }
        else if (lineNum === 3) {
            this.score += 40
        }
        else if (lineNum === 4) {
            this.score += 60
        }
    }
}