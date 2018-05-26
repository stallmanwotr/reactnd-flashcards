import debounce from 'lodash.debounce';
import React, { PureComponent} from 'react';

/**
 * This is a workaround for the user double clicking a Touchable. Which causes the
 * onPress action to be invoked twice, and e.g., navigating to the same page twice.
 * 
 * See:
 * https://stackoverflow.com/questions/47102946/prevent-double-tap-in-react-native
 */
const withPreventDoubleClick = (WrappedComponent) => {

    class PreventDoubleClick extends PureComponent {

        debouncedOnPress = (arg1) => {
            this.props.onPress && this.props.onPress(arg1);
        }

        onPress = debounce(this.debouncedOnPress, 1000, { leading: true, trailing: false });

        render() {
            return <WrappedComponent {...this.props} onPress={this.onPress} />;
        }
    }

    PreventDoubleClick.displayName =
        `withPreventDoubleClick(${WrappedComponent.displayName ||WrappedComponent.name})`

    return PreventDoubleClick;
}

export default withPreventDoubleClick;
