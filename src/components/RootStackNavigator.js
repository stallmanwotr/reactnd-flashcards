import { createStackNavigator } from 'react-navigation';
import DeckListView from './views/DeckListView';
import IndividualDeckView from './views/IndividualDeckView';
import NewCardView from './views/NewCardView';
import NewDeckView from './views/NewDeckView';
import QuizView from './views/QuizView';

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
            const { title } = navigation.state.params;
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
    },

    NewCardView: {
        screen: NewCardView,
        navigationOptions: {
            title: 'Add Card'
        }
    },

    QuizView: {
        screen: QuizView,
        navigationOptions: ({ navigation }) => {
            const { title } = navigation.state.params;
            return {
                title: `Quiz: ${title}`
            };
        }
    }
},
{
    initialRouteName: 'DeckListView'
});
