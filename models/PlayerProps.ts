import { CardData } from "./CardData"
import { CharacterProps } from "./CharacterProps"

export type PlayerProps = {
    character: CharacterProps,
    drawPile: CardData[],
    hand: CardData[],
    discardPile: CardData[],
    health: number,
    influence: number,
    isActive: boolean,
    drawFn: Function,
    drawDiscardFn: Function,
    playFn: Function,
    discardFn: Function
    updateHealth: Function,
    updateInfluence: Function
}