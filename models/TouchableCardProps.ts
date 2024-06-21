export type TouchableCardProps = {
    name: string,
    description: string,
    type: string,
    cost: number,
    id: string,
    playerId: number,
    pressFn: Function,
    longPressFn: Function
}