import { Square } from "../core/Square"

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