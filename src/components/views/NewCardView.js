import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addCardToDeck } from '../../actions/DeckActions';

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
 * For adding a new card to the deck. It contains input fields for the card's question
 * and answer.
 *   The _deck_ object can be passed as a prop, or instead by navigating and passing
 * the deck as parameter.
 */
class NewCardView extends Component {

    static propTypes = {
        /** The parent deck for the new card. (Normally passed by navigation param.) */
        deck: PropTypes.object
    }

    state = {
        /** The current input entered by the user. */
        question: '',
        answer: '',
    }

    /**
     * The user inputs/changes the card question.
     */
    _onChangeQuestion(text) {
        this.setState({
            question: text
        });
    }

    _onChangeAnswer(text) {
        this.setState({
            answer: text
        });
    }

    /**
     * The user confirms to add the new card.
     */
    _onSubmit() {
        const { question, answer } = this.state;
        const { dispatch, navigation } = this.props;
        const deck = this.props.deck || navigation.state.params.deck;
        console.info(`Add card: ${question}`);

        //const { title } = deck;
        const card = { question, answer };

        // add the new card to the app state, and save to asyncstorage.
        dispatch(addCardToDeck(deck.title, card));

        // navigate back to the previous view (card list).
        navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    What is the title of your new card?
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Card Question"
                    onChangeText={this._onChangeQuestion.bind(this)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Card Answer"
                    onChangeText={this._onChangeAnswer.bind(this)}
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

export default connect()(NewCardView);
