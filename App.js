import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import * as TestData from './src/TestData';
import RootStackNavigator from './src/components/RootStackNavigator';
import store from './src/store';


export default class App extends React.Component {

    componentDidMount() {
        console.info('*** App.componentDidMount ***');
        TestData.testFlashcardsAPI();
    }

    render() {
        return (
            <Provider store={store} >
                <View style={styles.container}>
                    <Text>Flashcards! v5</Text>
                    <RootStackNavigator />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e0ef',
        alignItems: 'stretch',
        justifyContent: 'center'
    }
});
