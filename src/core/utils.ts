/**
 * 得到一个范围内的随机整数
 * @param min 最小值
 * @param max 最大值，取不到
 */
export function getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
}