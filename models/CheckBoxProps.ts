import { CharacterProps } from "./CharacterProps";

export type CheckBoxProps {
    characters: CharacterProps[],
    selectedBoxes: number[]
    toggleFn: Function
};