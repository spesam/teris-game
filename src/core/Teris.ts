import { IPoint, Shape } from "../types";
import { SquareGroup } from "./SquareGroup";
import { getRandom } from "./utils";

export class LineShapeTeris extends SquareGroup {

    constructor(_centerPoint: IPoint, _color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], _centerPoint, _color)
    }

    rotateSquareGroup() {
        super.rotateSquareGroup();
        this.isClock = !this.isClock;
    }
}

export class TShapeTeris extends SquareGroup {

    constructor(_centerPoint: IPoint, _color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }], _centerPoint, _color)
    }
}

export class PShapeTeris extends SquareGroup {

    constructor(_centerPoint: IPoint, _color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }], _centerPoint, _color)
    }
}

export class LShapeTeris extends SquareGroup {

    constructor(_centerPoint: IPoint, _color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }], _centerPoint, _color)
    }
}

export class OShapeTeris extends SquareGroup {

    constructor(_centerPoint: IPoint, _color: string) {
        super([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], _centerPoint, _color)
    }

    rotateAfterShape() {
        return this.shape
    }
}

export class ZShapeTeris extends SquareGroup {

    constructor(_centerPoint: IPoint, _color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], _centerPoint, _color)
    }

    rotateSquareGroup() {
        super.rotateSquareGroup();
        this.isClock = !this.isClock;
    }
}

export const LineShape: Shape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }]

export const TShape: Shape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }]

export const PShape: Shape = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }]

export const LShape: Shape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }]

export const OShape: Shape = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]

export const ZShape: Shape = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]



const terisShapees = [
    LineShapeTeris,
    TShapeTeris,
    PShapeTeris,
    LShapeTeris,
    OShapeTeris,
    ZShapeTeris,
]



const colors = [
    "aqua",
    "salmon",
    "deeppink",
    "darkviolet"
]

export function createTeris(centerPoint: IPoint) {
    const shapeIndex = getRandom(0, terisShapees.length);
    const shape = terisShapees[shapeIndex];

    const colorIndex = getRandom(0, colors.length);
    const color = colors[colorIndex];

    return new shape(centerPoint, color)
}