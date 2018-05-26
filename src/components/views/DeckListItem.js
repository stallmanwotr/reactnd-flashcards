import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { Animated, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import withPreventDoubleClick from '../common/withPreventDoubleClick';

/**
 * Summary of an individual deck.
 */
class DeckListItem extends Component {

    static propTypes = {
        /** The deck object to be rendered. */
        deck: PropTypes.object.isRequired,

        /** Handler: When the user selects this deck item. */
        onPress: PropTypes.func
    }

    state = {
        // animations: scale the deck text when clicked.
        scaleAnim: new Animated.Value(1)
    }

    _onSelectDeck() {
        const { deck, onPress } = this.props;
        const { scaleAnim } = this.state;
        console.info(`DeckListItem: Selected deck '${deck.title}'`);

        // animate: slightly enlarge the text, then spring back to orginal size.
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 1.07, duration: 100}),
            // try to reduce the delay at the end of the spring:
            Animated.spring(scaleAnim, {
                toValue: 1, friction: 8, overshootClamping: true, restSpeedThreshold: 0.08
            })
        ])
        // called when the animation is complete.
        .start(() => {
            console.info('DeckListItem: Animation finished');

            if (onPress) { onPress(deck); }
        });
    }

    render() {
        const { deck } = this.props;
        const { title, questions } = deck;
        const { scaleAnim } = this.state;
        const cardCount = questions.length + ((questions.length === 1) ? ' card' : ' cards');

        return (
            <TouchableOpacity
                onPress={ this._onSelectDeck.bind(this) } >
                <View style={styles.item}>
                    <Animated.Text style={[styles.header, {transform: [{scale: scaleAnim}]} ]}>
                        {title}
                    </Animated.Text>
                    <Animated.Text style={[styles.subHeader, {transform: [{scale: scaleAnim}]} ]}>
                        {cardCount}
                    </Animated.Text>
                </View>
            </TouchableOpacity>
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
        fontSize: 20,
        fontStyle: 'italic',
        textAlign: 'center'
    }
});

export default withPreventDoubleClick(DeckListItem);
