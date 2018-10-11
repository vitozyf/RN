import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';
class ZnlInput extends Component {
  render() {
    const { 
      onChangeText,
      placeholder,
      maxLength,
      style
    } = this.props;
    const styleMix = Object.assign({}, styles.inputsty, style);
    return (
      <TextInput 
          style={styleMix}
          placeholder={placeholder}
          maxLength={maxLength}
          onChangeText={onChangeText}
          >
      </TextInput>
    )
  }
}

ZnlInput.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  maxLength: PropTypes.number,
  style: PropTypes.object
};

ZnlInput.defaultProps = {
  placeholder: '请输入内容',
  maxLength: 20
};

const styles = StyleSheet.create({
  inputsty: {
    fontSize: 20,
    color: '#333333',
    borderBottomWidth: 1,
    width: 300
  }
});

export default ZnlInput;
