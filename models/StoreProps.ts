import { CardData } from "./CardData"

export type StoreProps = {
    drawPile: CardData[],
    shelf: CardData[],
    credit: number,
    drawFn: Function,
    acquireFn: Function
}