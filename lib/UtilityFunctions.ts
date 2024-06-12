import { CardData } from "../models/CardData";

//Read in json file and create array of CardData
export function createDeck(cards: CardData[]){
    let returnDeck: CardData[] = [];

    cards.forEach((card: CardData) => {
      if(card.count > 1){
        for (let i=0; i< card.count; i++){
            returnDeck.push({
                name: card.name,
                description: card.description,
                count: card.count,
                type: card.type,
                cost: card.cost,
                id: card.name + i
            });
        }
      }else{
        card.id = card.name;
        returnDeck.push(card);
      }
    });
    return returnDeck;
};

export function shuffleCards(deck: CardData[]){
    let i = deck.length - 1;
    for (; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
    return deck;
};