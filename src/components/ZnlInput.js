import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, StyleSheet } from 'react-native';
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
      secureTextEntry,
      onFocus,
      editable,
      returnKeyType
    } = this.props;
    const {children} = this.props;
    const filterKeys = ['width', 'height', 'flex', 'paddingRight']; // 过滤到外层的属性
    let filterStyles = {};
    let boxFilterStyles = {};
    Object.keys(style).map(item => {
      if (filterKeys.find(key => item === key)) {
        boxFilterStyles[item] = style[item];
      } else {
        filterStyles[item] = style[item];
      }
    })
    return (
      <View style={[styles.inputbox, boxFilterStyles]}>
        {children}
        <TextInput 
            style={[styles.inputsty, filterStyles]}
            placeholder={placeholder}
            maxLength={maxLength}
            onChangeText={onChangeText}
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            keyboardType={keyboardType}
            multiline={multiline}
            onSubmitEditing={onSubmitEditing}
            secureTextEntry={secureTextEntry}
            onFocus={onFocus}
            editable={editable}
            returnKeyType={returnKeyType}
            />
      </View>
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
  onFocus: PropTypes.func,
  secureTextEntry: PropTypes.bool, // 密码类型
  editable: PropTypes.bool,
  returnKeyType: PropTypes.string
};

ZnlInput.defaultProps = {
  placeholder: '',
  maxLength: 20,
  autoFocus: false,
  defaultValue: '',
  keyboardType: 'default',
  multiline: false
};

const styles = StyleSheet.create({
  inputbox: {
    // width: 300,
    height: 40,
  },
  inputsty: {
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#ee7700',
    width: '100%',
    height: '100%',
    padding: 5,
  }
});

export default ZnlInput;
