import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInput, View, StyleSheet } from "react-native";
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
      returnKeyType,
      inputStyle,
      renderLeft,
      renderRight,
    } = this.props;
    const { children } = this.props;
    return (
      <View style={[styles.inputbox, style]}>
        {renderLeft && renderLeft()}
        <TextInput
          style={[styles.inputsty, inputStyle]}
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
        {renderRight && renderRight()}
      </View>
    );
  }
}

ZnlInput.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  maxLength: PropTypes.number,
  style: PropTypes.object,
  inputStyle: PropTypes.object,
  autoFocus: PropTypes.bool,
  defaultValue: PropTypes.string,
  keyboardType: PropTypes.string,
  multiline: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  onFocus: PropTypes.func,
  secureTextEntry: PropTypes.bool, // 密码类型
  editable: PropTypes.bool,
  returnKeyType: PropTypes.string,
};

ZnlInput.defaultProps = {
  placeholder: "",
  maxLength: 20,
  autoFocus: false,
  defaultValue: "",
  keyboardType: "default",
  multiline: false,
};

const styles = StyleSheet.create({
  inputbox: {
    // width: 300,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    backgroundColor: "#fff",
  },
  inputsty: {
    fontSize: 16,
    color: "#333333",
    borderWidth: 0,
    flex: 1,
    padding: 0,
    paddingLeft: 5,
  },
});

export default ZnlInput;
