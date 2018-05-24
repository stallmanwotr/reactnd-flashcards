import { createBottomTabNavigator } from 'react-navigation';
import NewDeckView from './views/NewDeckView';
import DeckListView from './views/DeckListView';

/**
 * A _TabNavigator_ that lets the user see all decks, or add a new deck.
 */
export default createBottomTabNavigator(
{
    DeckListView: {
        screen: DeckListView,
        navigationOptions: {
            title: 'Decks'
        }
    },

    NewDeckView: {
        screen: NewDeckView,
        navigationOptions: {
            title: 'Add Deck'
        }
    }
},
{
    initialRouteName: 'DeckListView'
});

