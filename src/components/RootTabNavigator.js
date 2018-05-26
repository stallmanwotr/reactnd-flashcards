import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Feather } from '@expo/vector-icons';
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
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => (
                <Feather name='layers' size={30} color={tintColor} />
            )
        }
    },

    NewDeckView: {
        screen: NewDeckView,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => (
                <Feather name='plus-square' size={30} color={tintColor} />
            )
        }
    }
},
{
    initialRouteName: 'DeckListView',
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: 'orange',
        style: {
            height: 56,
            backgroundColor: 'white',
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
});

