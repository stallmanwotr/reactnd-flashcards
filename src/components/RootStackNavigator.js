import { createStackNavigator } from 'react-navigation';
import DeckListView from './views/DeckListView';
import IndividualDeckView from './views/IndividualDeckView';
import NewDeckView from './views/NewDeckView';

/**
 * A _StackNavigator_ that lets the user navigate between various deck views.
 */
export default createStackNavigator(
{
    DeckListView: {
        screen: DeckListView,
        navigationOptions: {
            title: 'Flashcard Decks'
        }
    },

    IndividualDeckView: {
        screen: IndividualDeckView,
        navigationOptions: ({ navigation }) => {
            const { deck } = navigation.state.params;
            const { title } = deck;
            return {
                title: `Deck: ${title}`
            };
        }
    },

    NewDeckView: {
        screen: NewDeckView,
        navigationOptions: {
            title: 'New Deck'
        }
    }
},
{
    initialRouteName: 'DeckListView'
});
