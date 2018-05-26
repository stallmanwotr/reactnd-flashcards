import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';
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
            style={[styles.button, styles.buttonQuiz]}
            onPress={onPress} >
            <Text style={[styles.buttonText, styles.buttonTextQuiz]}>
                Start Quiz
            </Text>
        </TouchableOpacity>
    );
}

// Map the app state to component props.
function mapStateToProps({ decks }, ownProps) {
    // the deck title can be passed in either by navigation or props.
    const { navigation } = ownProps;
    const title = ownProps.title || navigation.state.params.title;

    return {
        deck: decks[title]
    };
}

/**
 * A view that shows an individual deck.
 *   The _deck title_ can be passed as a prop, or instead by navigating and passing
 * the deck as parameter.
 */
class IndividualDeckView extends Component {

    static propTypes = {
        /** The deck title. (Normally passed by navigation param.) */
        title: PropTypes.string
    }

    /**
     * The user wants to add a new card, navigate to that page.
     */
    _onAddCard() {
        console.info('Add Card');
        const { deck, navigation } = this.props;

        navigation.push('NewCardView', { deck });
    }

    _onStartQuiz() {
        console.info('Start Quiz');
        const { deck, navigation } = this.props;

        navigation.push('QuizView', { title: deck.title });
    }

    render() {
        const { deck } = this.props;
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
                    <AddCardButton onPress={this._onAddCard.bind(this)} />

                    <StartQuizButton onPress={this._onStartQuiz.bind(this)} />
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
        fontSize: 24,
        textAlign: 'center'
    },

    subHeader: {
        color: '#5f5f5f',
        fontSize: 22,
        fontStyle: 'italic',
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center'
    },

    buttonContainer: {
        alignItems: 'stretch',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    button: {
        backgroundColor: 'orange',
        borderColor: 'orange',
        borderWidth: 2,
        borderRadius: 5,
        height: 45,
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
    },

    buttonQuiz: {
        backgroundColor: 'white',
        borderColor: 'orange'
    },

    buttonTextQuiz: {
        color: 'orange'
    }
});

export default connect(mapStateToProps)(IndividualDeckView);



