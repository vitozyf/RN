import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class HeaderTitle extends Component {
  render() {
    const {
      title,
      style,
      textStyle
    } = this.props;
    return (
      <View style={[styles.HeaderTitleView, style]}>
        <Text style={[styles.HeaderTitleText, textStyle]}>
          {title}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  HeaderTitleView: {
    alignItems:'center',
    justifyContent: 'center',
    flex: 1
  },
  HeaderTitleText: {
    color: '#333',
    fontSize: 20,
    textAlign: 'center'
  }
})

HeaderTitle.propTypes = {
  title: PropTypes.string
}
HeaderTitle.defaultProps = {
  title: ''
}

export default HeaderTitle;