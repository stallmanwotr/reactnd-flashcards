import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createDeck } from '../../actions/DeckActions';

function SubmitButton({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress} >
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
    );
}

/**
 * A page for creating a new deck of flashcards.
 *   It contains an input field for the deck's title.
 */
class NewDeckView extends Component {

    state = {
        /** The deck title as input by the user. */
        title: ''
    }

    /**
     * The user inputs/changes the deck title.
     */
    _onChangeText(text) {
        this.setState({
            title: text
        });
    }

    /**
     * The user confirms to create the new deck.
     */
    _onSubmit() {
        const { title } = this.state;
        const { dispatch, navigation } = this.props;
        console.info(`Create new deck: ${title}`);

        // add the new deck to the app state, and save to asyncstorage.
        dispatch(createDeck(title));

        // navigate back to the previous view (deck list).
        navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    What is the title of your new deck?
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Deck Title"
                    onChangeText={this._onChangeText.bind(this)}
                />

                <SubmitButton onPress={this._onSubmit.bind(this)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        backgroundColor: '#ffffff',
        margin: 20,
        justifyContent: 'center',
        padding: 20,
        elevation: 2,
        shadowRadius: 3,
        shadowOpacity: 0.5,
        shadowColor: '#000000',
        shadowOffset: {
            width: 3,
            height: 3
        },
    },

    header: {
        color: '#000000',
        fontSize: 24
    },

    input: {
        fontSize: 22,
        color: '#404040',
        borderWidth: 1,
        borderColor: '#404040',
        borderRadius: 5,
        padding: 10
    },

    button: {
        backgroundColor: 'orange',
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
    }
});

export default connect()(NewDeckView);
