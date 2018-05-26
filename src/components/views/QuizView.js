import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { clearNotificationForToday } from '../../utils/NotificationUtils';

function ShowAnswerButton({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress} >
            <Text style={styles.buttonText}>Show Answer</Text>
        </TouchableOpacity>
    );
}

function CorrectButton({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress} >
            <Text style={styles.buttonText}>Correct</Text>
        </TouchableOpacity>
    );
}

function IncorrectButton({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress} >
            <Text style={styles.buttonText}>Incorrect</Text>
        </TouchableOpacity>
    );
}

function ReturnToDeckButton({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress} >
            <Text style={styles.buttonText}>Return to Deck</Text>
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
class QuizView extends Component {

    static propTypes = {
        /** The deck title. (Normally passed by navigation param.) */
        title: PropTypes.string
    }

    state = {
        questionIndex: 0,
        showAnswer: false,
        correctCount: 0
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            questionIndex: 0,
            showAnswer: false,
            correctCount: 0
        });
    }

    /**
     * The user wants to see the answer to the current question.
     */
    _onShowAnswer() {
        console.info('Show Answer');
        this.setState({
            showAnswer: true
        });
    }

    _onCorrectPress() {
        console.info('Correct Press');
        const { questionIndex, correctCount } = this.state;
        const nextQuestionIndex = questionIndex+1;

        this.setState({
            questionIndex: nextQuestionIndex,
            showAnswer: false,
            correctCount: correctCount+1
        });

        // if reached the end of the quiz.
        if (nextQuestionIndex >= questions.length) {
            clearNotificationForToday();
        }
    }

    _onIncorrectPress() {
        console.info('Incorrect Press');
        const { questionIndex } = this.state;
        const nextQuestionIndex = questionIndex+1;

        this.setState({
            questionIndex: nextQuestionIndex,
            showAnswer: false
        });

        // if reached the end of the quiz.
        if (nextQuestionIndex >= questions.length) {
            clearNotificationForToday();
        }
    }

    _onReturnToDeck() {
        console.info('Return to deck.');
        const { navigation } = this.props;
        
        // navigate back to the previous view (deck view).
        navigation.goBack();
    }

    renderEndOfQuiz() {
        const { deck } = this.props;
        const { questions } = deck;
        const { correctCount } = this.state;
        const percent = Math.round((correctCount / questions.length) * 100);
        
        return (
            <View style={styles.container}>
                <Text style={styles.subHeader}>
                    End of Quiz!
                </Text>
                <Text style={styles.subHeader}>
                    {percent}%
                </Text>
                <ReturnToDeckButton onPress={this._onReturnToDeck.bind(this)} />
            </View>
        );
    }

    render() {
        const { deck } = this.props;
        const { title, questions } = deck;
        const { questionIndex, showAnswer } = this.state;

        // reached the end of the quiz.
        if (questionIndex >= questions.length) {
            return this.renderEndOfQuiz();
        }

        const card = questions[questionIndex];

        return (
            <View style={styles.container}>
                <Text style={styles.subHeader}>
                    {questionIndex+1} / {questions.length}
                </Text>

                { (!showAnswer) ? (
                    <View>
                        <Text style={styles.question}>
                            {card.question}
                        </Text>
                        <ShowAnswerButton onPress={this._onShowAnswer.bind(this)} />
                    </View>
                ) : (
                    <Text style={styles.question}>
                        {card.answer}
                    </Text>
                )}

                <View style={styles.buttonContainer}>
                    <CorrectButton onPress={this._onCorrectPress.bind(this)} />

                    <IncorrectButton onPress={this._onIncorrectPress.bind(this)} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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

    subHeader: {
        color: '#5f5f5f',
        fontSize: 20,
        fontStyle: 'italic'
    },

    question: {
        color: '#000000',
        fontSize: 24
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

export default connect(mapStateToProps)(QuizView);

