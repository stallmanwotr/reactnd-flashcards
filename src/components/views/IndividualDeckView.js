import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function AddCardButton({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress} >
            <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
    );
}

function StartQuizButton({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress} >
            <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
    );
}

/**
 * A view that shows an individual deck.
 *   The _deck_ object can be passed as a prop, or instead by navigating and passing
 * the deck as parameter.
 */
class IndividualDeckView extends Component {

    static propTypes = {
        /** The deck object to be rendered. (Normally passed by navigation param.) */
        deck: PropTypes.object
    }

    _onAddCard() {
        console.info('Add Card');
    }

    _onStartQuiz() {
        console.info('Start Quiz');
    }

    render() {
        const { navigation } = this.props;
        const deck = this.props.deck || navigation.state.params.deck;
        const { title, questions } = deck;

        return (
            <View style={styles.item}>
                <Text style={styles.header}>
                    {title}
                </Text>
                <Text  style={styles.subHeader}>
                    {questions.length} cards
                </Text>
            
                <View style={styles.buttonContainer}>
                    <AddCardButton onPress={this._onAddCard} />

                    <StartQuizButton onPress={this._onStartQuiz} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        justifyContent: 'center',
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

    subHeader: {
        color: '#5f5f5f',
        fontSize: 20,
        fontStyle: 'italic'
    },

    buttonContainer: {
        alignItems: 'stretch',
        justifyContent: 'center',
        marginTop: 10
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

export default IndividualDeckView;



