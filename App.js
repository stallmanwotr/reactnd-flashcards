import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import * as TestData from './src/TestData';
import RootTabNavigator from './src/components/RootTabNavigator';
import store from './src/store';

function AppStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );
}

export default class App extends React.Component {

    componentDidMount() {
        console.info('*** App.componentDidMount ***');
        TestData.testFlashcardsAPI();
    }

    render() {
        return (
            <Provider store={store} >
                <View style={styles.container}>
                    <AppStatusBar backgroundColor={'orange'} barStyle="light-content" />
                    <RootTabNavigator />
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
