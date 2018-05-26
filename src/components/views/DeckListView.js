import React, { Component} from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../../actions/DeckActions';
import DeckListItem from './DeckListItem';

// Map the app state to component props.
function mapStateToProps({ decks }) {
    return {
        decks
    };
}

/**
 * Lists all decks. Each deck includes the title and card count.
 */
class DeckListView extends Component {
    
    componentDidMount() {
        const { dispatch } = this.props;

        // fetch and update the app state.
        dispatch(getDecks());
    }

    /**
     * The user selects an individual deck, navigate to the individual deck view.
     */
    _onSelectDeck(deck) {
        const { navigation } = this.props;
        console.info(`Navigating to Deck: ${deck.title}`);

        navigation.push('IndividualDeckView', { title: deck.title });
    }

    /*
     * @param item The FlatList item that contains the individual deck (destructured).
     * Example:
     * {
     *     "item": {
     *         "title": "React, Redux and React Native",
     *         "questions":[]
     *     },
     *     "index": 5,
     *     "separators":{}
     * }
     */
    _renderItem({ item }) {
        const { navigation } = this.props;
        const deckProps = { deck: item };
        return (
            <View>
                <DeckListItem
                    deck={item}
                    onPress={this._onSelectDeck.bind(this)}
                />
            </View>
        );
    }

    render() {
        const { decks, navigation } = this.props;

        return (
            <View>
                <FlatList
                    data={Object.values(decks)}
                    extraData={this.state}
                    keyExtractor={(deck) => deck.title}
                    renderItem={this._renderItem.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'orange',
        borderColor: 'darkorange',
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },

    buttonText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
    }
});

export default connect(mapStateToProps)(DeckListView);

