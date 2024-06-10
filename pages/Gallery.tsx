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

    return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={{ flex: 1, alignItems: 'center'}}>
        <Button
        title="Back to Home"
        onPress={() => {
            navigation.navigate('Home', {});
        }}
        />
        <Button
        title="Harry's Cards"
        onPress={() => {
            getDeckOfCards(Cards.starterCards[1])
        }}
        />
        <Button
        title="Hermione's Cards"
        onPress={() => {
            getDeckOfCards(Cards.starterCards[2])
        }}
        />
        <Button
        title="Ron's Cards"
        onPress={() => {
            getDeckOfCards(Cards.starterCards[3])
        }}
        />
        <Button
        title="Neville's Cards"
        onPress={() => {
            getDeckOfCards(Cards.starterCards[4])
        }}
        />
        <Button
        title="Game 1 Cards"
        onPress={() => {
            getDeckOfCards(Cards.hogwartsCards[1])
        }}
        />
        <Button
        title="Game 2 Cards"
        onPress={() => {
            getDeckOfCards(Cards.hogwartsCards[2])
        }}
        />
        <Button
        title="Game 3 Cards"
        onPress={() => {
            getDeckOfCards(Cards.hogwartsCards[3])
        }}
        />
        <Button
        title="Game 4 Cards"
        onPress={() => {
            getDeckOfCards(Cards.hogwartsCards[4])
        }}
        />
        <Button
        title="Game 5 Cards"
        onPress={() => {
            getDeckOfCards(Cards.hogwartsCards[5])
        }}
        />
        <Button
        title="Game 6 Cards"
        onPress={() => {
            getDeckOfCards(Cards.hogwartsCards[6])
        }}
        />
        <Button
        title="Game 7 Cards"
        onPress={() => {
            getDeckOfCards(Cards.hogwartsCards[7])
        }}
        />
        {cardsInGallery.map((card) => CreateCard(card))}
      </View>
    </ScrollView>
    );

    function getDeckOfCards(cardSet: CardProps[]){
      setCardsInGallery(createDeck(cardSet));
    }
    function nullFunction(){}

    function CreateCard(card: CardProps){//might need to add cost to CardProps eventually
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