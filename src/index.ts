import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery"
import { createTeris } from "./core/Teris";
import { TerisRule } from "./core/TerisRule";
import { MoveDirection } from "./types";
import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";

const g = new Game(new GamePageViewer());

$(".start").on("click", () => {
    g.start();
})
$(".pause").on("click", () => {
    g.pause();
})
$(".down").on("click", () => {
    g.controlDown();
})

$(".left").on("click", () => {
    g.controlLeft();
})
$(".right").on("click", () => {
    g.controlRight();
})

$(".rotate").on("click", () => {
    g.controlRotate();
})


