import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { clearNotificationForToday } from '../../utils/NotificationUtils';

function ShowAnswerButton({ onPress }) {
    return (
        <TouchableOpacity
            style={[styles.button, styles.buttonShowAnswer]}
            onPress={onPress} >
            <Text style={[styles.buttonText, styles.buttonTextShowAnswer]}>
                Show Answer
        </Text>
        </TouchableOpacity>
    );
}

function CorrectButton({ onPress }) {
    return (
        <TouchableOpacity
            style={[styles.button, styles.buttonCorrect]}
            onPress={onPress} >
            <Text style={[styles.buttonText, styles.buttonTextCorrect]}>
                Correct
            </Text>
        </TouchableOpacity>
    );
}

function IncorrectButton({ onPress }) {
    return (
        <TouchableOpacity
            style={[styles.button, styles.buttonIncorrect]}
            onPress={onPress} >
            <Text style={[styles.buttonText, styles.buttonTextIncorrect]}>
                Incorrect
            </Text>
        </TouchableOpacity>
    );
}

function ReturnToDeckButton({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress} >
            <Text style={styles.buttonText}>
                Back to Deck
            </Text>
        </TouchableOpacity>
    );
}

function RestartQuizButton({ onPress }) {
    return (
        <TouchableOpacity
            style={[styles.button, styles.buttonQuiz]}
            onPress={onPress} >
            <Text style={[styles.buttonText, styles.buttonTextQuiz]}>
                Restart Quiz
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
        const { deck } = this.props;
        const { questionIndex, correctCount } = this.state;
        const nextQuestionIndex = questionIndex+1;

        this.setState({
            questionIndex: nextQuestionIndex,
            showAnswer: false,
            correctCount: correctCount+1
        });

        // if reached the end of the quiz.
        if (nextQuestionIndex >= deck.questions.length) {
            clearNotificationForToday();
        }
    }

    _onIncorrectPress() {
        console.info('Incorrect Press');
        const { deck } = this.props;
        const { questionIndex } = this.state;
        const nextQuestionIndex = questionIndex+1;

        this.setState({
            questionIndex: nextQuestionIndex,
            showAnswer: false
        });

        // if reached the end of the quiz.
        if (nextQuestionIndex >= deck.questions.length) {
            clearNotificationForToday();
        }
    }

    _onReturnToDeck() {
        console.info('Return to deck.');
        const { navigation } = this.props;
        
        // navigate back to the previous view (deck view).
        navigation.goBack();
    }

    _onRestartQuiz() {
        console.info('Restart Quiz.');
        const { navigation } = this.props;
        
        // reset the state to zero for this quiz, which will cause this component
        // to restart the quiz from the beginning.
        //   rather than navigate by going back, then poping it back on again.
        this.setState({
            questionIndex: 0,
            showAnswer: false,
            correctCount: 0
        });
    }

    renderEndOfQuiz() {
        const { deck } = this.props;
        const { questions } = deck;
        const { correctCount } = this.state;
        const percent = Math.round((correctCount / questions.length) * 100);
        
        return (
            <View style={styles.container}>
                <Text style={styles.headerLine1}>
                    End of Quiz!
                </Text>
                <Text style={styles.headerLine2}>
                    Score: {percent}%
                </Text>

                <View style={[styles.buttonContainer, {marginTop: 40}]}>
                    <ReturnToDeckButton onPress={this._onReturnToDeck.bind(this)} />
                    <RestartQuizButton onPress={this._onRestartQuiz.bind(this)} />
                </View>
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
                    Question {questionIndex+1} / {questions.length}
                </Text>

                { (!showAnswer) ? (
                    <View style={styles.questionContainer}>
                        <Text style={styles.question}>
                            {card.question}
                        </Text>
                        <ShowAnswerButton onPress={this._onShowAnswer.bind(this)} />
                    </View>
                ) : (
                    <View style={styles.answerContainer}>
                        <Text style={styles.subHeader}>
                            Answer:
                        </Text>
                        <Text style={styles.question}>
                            {card.answer}
                        </Text>
                    </View>
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

    headerLine1: {
        color: '#4f4f4f',
        fontSize: 24,
        fontStyle: 'italic',
        textAlign: 'center'
    },

    headerLine2: {
        color: '#1f1f1f',
        fontSize: 24,
        textAlign: 'center'
    },

    subHeader: {
        color: '#5f5f5f',
        fontSize: 20,
        fontStyle: 'italic'
    },

    questionContainer: {
        marginTop: 10
    },

    answerContainer: {
        marginTop: 10,
        marginBottom: 30
    },

    question: {
        color: '#000000',
        fontSize: 24,
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
        marginTop: 10,
        marginBottom: 5,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    },

    buttonText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center'
    },

    buttonShowAnswer: {
        alignSelf: 'center',
        backgroundColor: '#e0e0e0',
        borderColor: '#a0a0a0',
        marginTop: 20,
        marginBottom: 30
    },

    buttonTextShowAnswer: {
        color: '#5f5f5f'
    },

    buttonCorrect: {
        backgroundColor: '#3b9b33',
        borderColor: '#3b9b33'
    },

    buttonTextCorrect: {
        color: '#1f1f1f'
    },

    buttonIncorrect: {
        backgroundColor: '#d32a2a',
        borderColor: '#d32a2a'
    },

    buttonTextIncorrect: {
        color: '#1f1f1f'
    },

    buttonQuiz: {
        backgroundColor: 'white',
        borderColor: 'orange'
    },

    buttonTextQuiz: {
        color: 'orange'
    }
});

export default connect(mapStateToProps)(QuizView);

