import { createBottomTabNavigator } from 'react-navigation';
import NewDeckView from './views/NewDeckView';
import RootStackNavigator from './RootStackNavigator';

/**
 * A _TabNavigator_ that lets the user see all decks, or add a new deck.
 */
export default createBottomTabNavigator(
{
    RootStackNavigator: {
        screen: RootStackNavigator,
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
    initialRouteName: 'RootStackNavigator'
});

