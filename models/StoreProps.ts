import { CardProps } from "./CardProps"

export type StoreProps = {
    drawPile: CardProps[],
    shelf: CardProps[],
    drawFn: Function,
    acquireFn: Function
}