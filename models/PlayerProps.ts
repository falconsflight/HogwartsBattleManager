import { CardData } from "./CardData"
import { CharacterProps } from "./CharacterProps"

export type PlayerProps = {
    character: CharacterProps,
    drawPile: CardData[],
    hand: CardData[],
    discardPile: CardData[],
    isActive: boolean,
    drawFn: Function,
    discardFn: Function
}