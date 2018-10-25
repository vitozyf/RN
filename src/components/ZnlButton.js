import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';


export default class ZnlButton extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    const {
      type,
      children,
      onPress,
      style,
      textStyle,
      activeOpacity,
      disabled
    } = this.props;
    let typeStyle = {};
    let typeTextStyle = {};
    switch (type) {
      case 'default':
        typeStyle = disabled ? styles.buttonDefaultDisabled : styles.buttonDefault;
        typeTextStyle = disabled ? styles.textDefaultDisabled : styles.textDefault;
        break;
      case 'main':
        typeStyle = disabled ? styles.buttonMainDisabled : styles.buttonMain;
        typeTextStyle = disabled ? styles.textMainDisabled : styles.textMain;
        break;
      default:
        break;
    }
    const styleMix = [styles.Button, typeStyle, style];
    const textStyleMix = [styles.Text, typeTextStyle, textStyle];
    return (
      <TouchableOpacity
        onPress={ () => {return disabled ? null : onPress()} }
        activeOpacity={disabled ? 1 : activeOpacity}
        style={styleMix}>
        <Text style={textStyleMix}>
          {children}
        </Text>
      </TouchableOpacity>
    )
  }
}

ZnlButton.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object, // 按钮样式
  textStyle: PropTypes.object, // 文本样式
  activeOpacity: PropTypes.number,
  disabled: PropTypes.bool,
};

ZnlButton.defaultProps = {
  type: 'default',
  placeholder: '请输入内容',
  maxLength: 20,
  activeOpacity: 0.8,
  disabled: false
};

const styles = StyleSheet.create({
  Button: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  Text: {
    fontSize: 18
  },
  // 主按钮
  buttonMain: {
    backgroundColor: '#ee7700',
  },
  textMain: {
    color: '#fff', 
  },
  buttonMainDisabled: {
    backgroundColor: '#FFC099',
  },
  textMainDisabled: {
    color: '#fff', 
  },
  // 默认
  buttonDefault: {
    borderWidth: 1,
    borderColor: '#ccc'
  },
  textDefault: {
    color: '#333', 
  },
  buttonDefaultDisabled: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f2f2f2'
  },
  textDefaultDisabled: {
    color: '#999', 
  }
});