import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';


export default class ZnlButton extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    const { 
      children,
      onPress,
      style,
      textStyle,
      activeOpacity
    } = this.props;
    const styleMix = Object.assign({}, styles.buttonMain, style);
    const textStyleMix = Object.assign({}, styles.textMain, textStyle);
    return (
      <TouchableOpacity
        onPress={ onPress }
        activeOpacity={activeOpacity}
        style={styleMix}>
        <Text style={textStyleMix}>
          {children}
        </Text>
      </TouchableOpacity>
    )
  }
}

ZnlButton.propTypes = {
  placeholder: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object, // 按钮样式
  textStyle: PropTypes.object, // 文本样式
  activeOpacity: PropTypes.number
};

ZnlButton.defaultProps = {
  placeholder: '请输入内容',
  maxLength: 20,
  activeOpacity: 0.8
};

const styles = StyleSheet.create({
  // 主按钮
  buttonMain: {
    backgroundColor: 'green',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  textMain: {
    color: '#fff', 
    fontSize: 16
  }
});