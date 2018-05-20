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

    _onPressItem(id) {
        console.info('onPressItem(id): ' + id);
    }

    // Example:
    // {"item":{"title":"React, Redux and React Native","questions":[]},"index":5,"separators":{}}
    _renderItem({ item }) {
        return (
            <DeckListItem
                deck={item}
                onPressItem={this._onPressItem}
            />
        );
    }

    render() {
        const { decks } = this.props;

        return (
            <View>
               <FlatList
                    data={Object.values(decks)}
                    extraData={this.state}
                    keyExtractor={(deck) => deck.title}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

export default connect(mapStateToProps)(DeckListView);
