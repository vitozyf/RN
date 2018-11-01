import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class HeaderRight extends Component {
  render() {
    const {
      title,
      style
    } = this.props;
    console.log('right', [styles.HeaderRightView, style])
    return (
      <View style={[styles.HeaderRightView, style]}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  HeaderRightView: {
    alignItems:'center',
    justifyContent: 'center',
    width: 40, 
    height: 40,
  }
})

HeaderRight.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object
}
// HeaderRight.defaultProps = {
//   title: ''
// }

export default HeaderRight;