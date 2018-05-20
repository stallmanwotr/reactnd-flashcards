import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as FlashcardsAPI from './src/api/FlashcardsAPI';

export default class App extends React.Component {

    state = {
        decks: undefined
    }

    // TODO: write as unit test
    _testFlashcardsAPI() {
        const card1 = { question: 'Question 1?', answer: 'Answer 1' };
        const card2 = { question: 'Question 2?', answer: 'Answer 2' };

        FlashcardsAPI.clearDecks().then(() => {
            console.info('Cleared decks.');

            FlashcardsAPI.saveDeckTitle('Test Title 1').then(() => {
                console.info('Saved deck: title 1.');

                FlashcardsAPI.addCardToDeck('Test Title 1', card1).then(() => {
                FlashcardsAPI.addCardToDeck('Test Title 1', card2).then(() => {
                    console.info('Added 2x cards.');

                    FlashcardsAPI.getDecks().then((decks) => {
                        console.info('Got decks:\n' + JSON.stringify(decks));
                    })

                })})
            })
        });
    }

    componentDidMount() {
        console.info('App.componentDidMount ***');
        this._testFlashcardsAPI();
    }

    render() {
        const { decks } = this.state;

        return (
            <View style={styles.container}>
                <Text>Flashcards! v5</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
