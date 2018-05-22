import React, { Component} from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { getDecks } from '../../actions/DeckActions'
import DeckListItem from './DeckListItem'

// Map the app state to component props.
function mapStateToProps({ decks }) {
    console.info('DeckListView.mapStateToProps\n'+ JSON.stringify(decks));
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
     * Handler: The user selects an individual deck, navigate to the deck view.
     */
    _onPressItem(deck) {
        console.info('DeckListView._onPressItem: ' + JSON.stringify(deck));
        const { navigation } = this.props;
        const deckProps = { deck };

        navigation.push('IndividualDeckView', deckProps)
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
                    onPressItem={this._onPressItem.bind(this)}
                />
            </View>
        );
    }

    render() {
        const { decks, navigation } = this.props;
        console.info('DeckListView.navigation: ' + (typeof navigation));

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

export default connect(mapStateToProps)(DeckListView);

