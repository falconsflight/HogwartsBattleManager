import { VillainData } from "./VillainData"

export type VillainProps = {
    id : string,
    villain : VillainData,
    attacks : number,
    healthFn : Function
}