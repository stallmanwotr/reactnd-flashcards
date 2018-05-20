import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';

/**
 * Summary of an individual deck.
 */
class DeckListItem extends Component {

    static propTypes = {
        /** The deck object to be rendered. */
        deck: PropTypes.object.isRequired
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
    }
});

export default DeckListItem;
