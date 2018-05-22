import { createStackNavigator } from 'react-navigation';
import DeckListView from './views/DeckListView';
import IndividualDeckView from './views/IndividualDeckView';

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
    }
},
{
    initialRouteName: 'DeckListView'
});
