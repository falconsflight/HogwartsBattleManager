import { CardData } from "./CardData"

export type StoreProps = {
    drawPile: CardData[],
    shelf: CardData[],
    drawFn: Function,
    acquireFn: Function
}