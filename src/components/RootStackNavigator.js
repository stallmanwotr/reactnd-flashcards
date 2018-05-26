import { createStackNavigator } from 'react-navigation';
import IndividualDeckView from './views/IndividualDeckView';
import NewCardView from './views/NewCardView';
import NewDeckView from './views/NewDeckView';
import QuizView from './views/QuizView';
import RootTabNavigator from './RootTabNavigator';

const headerStyle = {
    headerTintColor: '#4f4f4f',
    headerStyle: {
        backgroundColor: '#f0f0f0',
        height: 35,
        paddingBottom: 10
    }
};

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
                title: `${title}`,
                ...headerStyle
            };
        }
    },

    NewDeckView: {
        screen: NewDeckView,
        navigationOptions: {
            title: 'New Deck',
            ...headerStyle
        }
    },

    NewCardView: {
        screen: NewCardView,
        navigationOptions: {
            title: 'Add Card',
            ...headerStyle
        }
    },

    QuizView: {
        screen: QuizView,
        navigationOptions: ({ navigation }) => {
            const { title } = navigation.state.params;
            return {
                title: `Quiz: ${title}`,
                ...headerStyle
            };
        }
    }
},
{
    initialRouteName: 'RootTabNavigator'
});
