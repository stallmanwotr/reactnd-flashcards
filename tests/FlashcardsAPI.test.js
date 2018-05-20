import React from 'react';
import * as FlashcardsAPI from '../src/api/FlashcardsAPI.js';

//import renderer from 'react-test-renderer';

/** Simple test to try out Jest snapshots. */
test('Simple Jest test', () => {
   const decks = { hello : 'world' };
   expect(decks).toMatchSnapshot();
});

test('Add a new deck', async () => {
    const title = 'Test Title 1';

    // NOT WORKING: 'decks' is always the empty object.
    // works fine when run in non-test code on the android emulator .

    await FlashcardsAPI.clearDecks();

    await FlashcardsAPI.saveDeckTitle(title);

    const decks = await FlashcardsAPI.getDecks();

    expect(decks).toMatchSnapshot();
});

test('Add a new deck (v2)', (done) => {
    const title = 'Test Title 1';

    // NOT WORKING: 'decks' is always the empty object.
    // works fine when run in non-test code on the android emulator .

    FlashcardsAPI.clearDecks().then(() => {
        FlashcardsAPI.saveDeckTitle(title).then(() => {
            FlashcardsAPI.getDecks().then((decks) => {
                expect(decks).toMatchSnapshot();
                done();
            })
        })
    })
});

