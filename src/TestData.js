import * as FlashcardsAPI from './api/FlashcardsAPI';

// TODO: write as unit test
export function testFlashcardsAPI() {
    const card1 = { question: 'Question 1?', answer: 'Answer 1!' };
    const card2 = { question: 'Question 2?', answer: 'Answer 2!' };

    FlashcardsAPI.clearDecks().then(() => {
        console.info('Cleared decks.');

        FlashcardsAPI.saveDeckTitle('Test Title 1').then(() => {
        FlashcardsAPI.saveDeckTitle('Test Title 2').then(() => {
        FlashcardsAPI.saveDeckTitle('Advanced Physics Lectures').then(() => {
        FlashcardsAPI.saveDeckTitle('Groundbreaking Astro Physics and Effects').then(() => {
        FlashcardsAPI.saveDeckTitle('Artificial Intelligence').then(() => {
        FlashcardsAPI.saveDeckTitle('React, Redux and React Native').then(() => {

            FlashcardsAPI.addCardToDeck('Test Title 1', card1).then(() => {
            FlashcardsAPI.addCardToDeck('Test Title 1', card2).then(() => {
                console.info('Added 2x cards.');

                FlashcardsAPI.getDecks().then((decks) => {
                    console.info('Got decks:\n' + JSON.stringify(decks));
                })
            })})
        })
        })
        })
        })
        })
        })
    });
};
