import { CardData } from "../models/CardData";
import { DarkArtsData } from "../models/DarkArtsData";

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

export function createDarkArtsDeck(cards: DarkArtsData[]){
  let returnDeck: DarkArtsData[] = [];

  cards.forEach((card: DarkArtsData) => {
    if(card.count > 1){
      for (let i=0; i< card.count; i++){
          returnDeck.push({
              name: card.name,
              description: card.description,
              count: card.count,
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

export function GetEmptyCardData(){
  let card : CardData = {
    id: "",
    name: "",
    description: "",
    count: 0,
    type: "",
    cost: 0
  };
  return card;
}

export function nullFunction(){
  
}