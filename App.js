import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import * as TestData from './src/TestData';
import DeckListView from './src/components/views/DeckListView';
import store from './src/store';


export default class App extends React.Component {

    componentDidMount() {
        console.info('*** App.componentDidMount ***');
        TestData.testFlashcardsAPI();
        //TestData.createDeck();
    }

    render() {
        return (
            <Provider store={store} >
                <View style={styles.container}>
                    <Text>Flashcards! v5</Text>
                    <DeckListView />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e0ef',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
