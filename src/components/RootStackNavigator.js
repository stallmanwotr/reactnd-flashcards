import { createStackNavigator } from 'react-navigation';
import IndividualDeckView from './views/IndividualDeckView';
import NewCardView from './views/NewCardView';
import NewDeckView from './views/NewDeckView';
import QuizView from './views/QuizView';
import RootTabNavigator from './RootTabNavigator';

/**
 * A _StackNavigator_ that lets the user navigate between various deck views.
 */
export default createStackNavigator(
{
    RootTabNavigator: {
        screen: RootTabNavigator,
        navigationOptions: {
            title: 'Decks',
            header: null
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
    initialRouteName: 'RootTabNavigator'
});
