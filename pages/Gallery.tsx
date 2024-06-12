import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import DropdownComponent from '../components/DropdownComponent';
import { createDeck, shuffleCards } from '../lib/UtilityFunctions';
import { CardProps } from '../models/CardProps';
import Cards from '../lib/Cards';
import Card from '../components/Card';

function GalleryPage({ navigation }) {
    const [cardsInGallery, setCardsInGallery] = useState([]);
    const [selection, setSelection] = useState("");

    let harry = "Harry's Cards";
    let hermione = "Hermione's Cards";
    let ron = "Ron's Cards";
    let neville = "Neville's Cards";
    let game1 = "Game 1 Cards";
    let game2 = "Game 2 Cards";
    let game3 = "Game 3 Cards";
    let game4 = "Game 4 Cards";
    let game5 = "Game 5 Cards";
    let game6 = "Game 6 Cards";
    let game7 = "Game 7 Cards";

    return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={{ flex: 1, alignItems: 'center'}}>
        <Button
        title={harry}
        onPress={() => {
            getDeckOfCards(Cards.starterCards[1], harry)
        }}
        />
        <Button
        title={hermione}
        onPress={() => {
            getDeckOfCards(Cards.starterCards[2], hermione)
        }}
        />
        <Button
        title={ron}
        onPress={() => {
            getDeckOfCards(Cards.starterCards[3], ron)
        }}
        />
        <Button
        title={neville}
        onPress={() => {
            getDeckOfCards(Cards.starterCards[4], neville)
        }}
        />
        <Button
        title={game1}
        onPress={() => {
            getDeckOfCards(Cards.hogwartsCards[1], game1)
        }}
        />
        <Button
        title={game2}
        onPress={() => {
            getDeckOfCards(Cards.hogwartsCards[2], game2)
        }}
        />
        <Button
        title={game3}
        onPress={() => {
            getDeckOfCards(Cards.hogwartsCards[3], game3)
        }}
        />
        <Button
        title={game4}
        onPress={() => {
            getDeckOfCards(Cards.hogwartsCards[4], game4)
        }}
        />
        <Button
        title={game5}
        onPress={() => {
            getDeckOfCards(Cards.hogwartsCards[5], game5)
        }}
        />
        <Button
        title={game6}
        onPress={() => {
            getDeckOfCards(Cards.hogwartsCards[6], game6)
        }}
        />
        <Button
        title={game7}
        onPress={() => {
            getDeckOfCards(Cards.hogwartsCards[7], game7)
        }}
        />
        <Text style={{fontSize: 25, fontWeight: "heavy"}}>{selection}</Text>
        <View style={{flex: 1, 
                        flexWrap: "wrap", 
                        flexDirection: "row", 
                        padding: 10, 
                        justifyContent: 'center', 
                        alignItems: 'center'}}>
        {cardsInGallery.map((card) => CreateCard(card))}
        </View>
      </View>
    </ScrollView>
    );

    function getDeckOfCards(cardSet: CardProps[], selectedDeck: string){
      setCardsInGallery(createDeck(cardSet));
      setSelection(selectedDeck);
    }
    function nullFunction(){}

    function CreateCard(card: CardProps){
        return (
          <>
          <Card id={card.id} name={card.name} description={card.description} type={card.type} cost={card.cost} discardFn={nullFunction}></Card>
          </>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily: "Georgia, serif",
        fontSize:20,
        fontWeight: 'bold',
        paddingLeft: 5
    }
  });

export default GalleryPage;