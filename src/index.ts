import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery"
import { createTeris } from "./core/Teris";
import { TerisRule } from "./core/TerisRule";
import { MoveDirection } from "./types";

$(".col .down").on("click", () => {
    TerisRule.move(teris, MoveDirection.down)
})
$(".col .up").on("click", () => {
    TerisRule.move(teris, MoveDirection.up)
})
$(".col .left").on("click", () => {
    TerisRule.move(teris, MoveDirection.left)
})
$(".col .right").on("click", () => {
    TerisRule.move(teris, MoveDirection.right)
})

$(".col .rotate").on("click", () => {
    TerisRule.rotate(teris);
})

const teris = createTeris({ x: 3, y: 3 })

teris.squares.forEach(item => {
    item.viewer = new SquarePageViewer(item, $("#root"));
})



const user = {
    name: "sam",
    gender: "男",
    age: 27,
    loves: ["英雄联盟", "电影"]
}

const { name, gender, ...other } = user;

console.log(name, gender, other);
