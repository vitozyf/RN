import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';
class ZnlInput extends Component {
  render() {
    const { 
      onChangeText,
      placeholder,
      maxLength,
      style,
      autoFocus,
      defaultValue,
      keyboardType,
      multiline,
      onSubmitEditing,
      secureTextEntry
    } = this.props;
    const styleMix = Object.assign({}, styles.inputsty, style);
    return (
      <TextInput 
          style={styleMix}
          placeholder={placeholder}
          maxLength={maxLength}
          onChangeText={onChangeText}
          autoFocus={autoFocus}
          defaultValue={defaultValue}
          keyboardType={keyboardType}
          multiline={multiline}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          >
      </TextInput>
    )
  }
}

ZnlInput.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  maxLength: PropTypes.number,
  style: PropTypes.object,
  autoFocus: PropTypes.bool,
  defaultValue: PropTypes.string,
  keyboardType: PropTypes.string,
  multiline: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  secureTextEntry: PropTypes.bool
};

ZnlInput.defaultProps = {
  placeholder: '请输入内容',
  maxLength: 20,
  autoFocus: false,
  defaultValue: '',
  keyboardType: 'default',
  multiline: false
};

const styles = StyleSheet.create({
  inputsty: {
    fontSize: 20,
    color: '#333333',
    borderBottomWidth: 1,
    width: 300,
    height: 50,
    padding: 0
  }
});

export default ZnlInput;
