import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import PropTypes from 'prop-types';

class HeaderRight extends Component {
  render() {
    const {
      title
    } = this.props;
    return (
      <View style={styles.HeaderRightView}>
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
    marginRight: 10
  }
})

// HeaderRight.propTypes = {
//   title: PropTypes.string
// }
// HeaderRight.defaultProps = {
//   title: ''
// }

export default HeaderRight;