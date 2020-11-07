import { SquareGroup } from "../core/SquareGroup";

export interface IPoint {
    readonly x: number;
    readonly y: number;
}

export interface IViewer {
    show(): void;
    remove(): void;
}

//形状

export type Shape = IPoint[]

export type A = {
    a: string
}

export enum MoveDirection {
    left,
    right,
    down,
    up
}

export enum GameStatus {
    init,
    gameOn,
    gamePause,
    gameOver,
}

export interface IGameViewer {
    /**
     * 显示下一个方块
     * @param teris 下一个方块
     */
    showNext(teris: SquareGroup): void
    /**
     * 切换方块显示
     * @param teris 切换的方块
     */
    switchTeris(teris: SquareGroup): void
}