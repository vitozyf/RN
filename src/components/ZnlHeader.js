import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class ZnlHeader extends Component{
  render() {
    const {
      style,
      title,
      children
    } = this.props;
    // let childrenItems = [];
    // if (Array.isArray(children)) {
    //   childrenItems = children;
    // } else {
    //   childrenItems = [children];
    // }
    // const left = childrenItems.find(item => {
    //   return item.key === 'left'
    // })
    // const right = childrenItems.find(item => {
    //   return item.key === 'right'
    // })
    console.log(title);
    return (
      <View style={ [styles.Header, style] }>
        {/* {left ? left : null} */}
        <Text style={ styles.Title }>
          {title}
        </Text>
        {/* {right ? right : null} */}
      </View>
    )
  }
}

ZnlHeader.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string
};

ZnlHeader.defaultProps = {
  placeholder: '请输入内容'
};

const styles = StyleSheet.create({
 Header: {
  height: 48,
  lineHeight: 48,
  backgroundColor: '#ee7700'
  // alignItems: 'stretch'
  // justifyContent: 'space-around'
 },
 Title: {
  lineHeight: 48,
  textAlign: 'center',
  fontSize: 20,
  flex: 1
 }
})
export default ZnlHeader;