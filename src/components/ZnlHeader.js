import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
class ZnlHeader extends Component{
  render() {
    const {
      style,
      title,
      hideLeft,
      leftIcon,
      onPressIcon,
      centerElement,
      rightElement,
    } = this.props;

    const Left = hideLeft ? null : (
      <TouchableOpacity
        onPress={onPressIcon || null}
        activeOpacity={0.8}
        style={styles.iconbox}>
        <Icon 
          name={leftIcon}
          color="#999"
          size={30}
          style={styles.icon}
          >
        </Icon>
      </TouchableOpacity>
    )

    const CenEle = centerElement ? centerElement : (
      <Text style={ styles.Title }>
        {title}
      </Text>
    );

    const RightEle = rightElement

    return (
      <View style={ [styles.Header, style] }>
        {
          Left
        }
        {
          CenEle
        }
        {
          RightEle
        }
      </View>
    )
  }
}

ZnlHeader.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string,
  hideLeft: PropTypes.bool,
  leftIcon: PropTypes.string,
  onPressIcon: PropTypes.func,
  centerElement: PropTypes.element,
  rightElement: PropTypes.element,
};

ZnlHeader.defaultProps = {
  placeholder: '请输入内容',
  leftIcon: 'ios-arrow-back'
};

const styles = StyleSheet.create({
 Header: {
  height: 48,
  lineHeight: 48,
  backgroundColor: '#fff',
  flexDirection: 'row',
  // alignItems: 'stretch'
  // justifyContent: 'space-around'
 },
 Title: {
  lineHeight: 48,
  textAlign: 'center',
  fontSize: 20,
  flex: 1
 },
 iconbox: {
  //  borderWidth: 1,
   width: 30
 },
 icon: {
  lineHeight: 48,
  textAlign: 'center'
 }
})
export default ZnlHeader;