// @flow
import React, { Component } from "react";
import { TextInput, View, StyleSheet } from "react-native";

type TKeyboardType =
  | "default"
  | "email-address"
  | "numeric"
  | "phone-pad"
  | "ascii-capable"
  | "numbers-and-punctuation"
  | "url"
  | "number-pad"
  | "name-phone-pad"
  | "decimal-pad"
  | "twitter"
  | "web-search"
  | "visible-password";

type TReturnKeyType =
  | "done"
  | "go"
  | "next"
  | "search"
  | "send"
  | "none"
  | "previous"
  | "default"
  | "emergency-call"
  | "google"
  | "join"
  | "route"
  | "yahoo";

type Props = {
  placeholder: string,
  onChangeText: Function,
  maxLength: number,
  style: Object,
  inputStyle: Object,
  autoFocus: boolean,
  defaultValue: string,
  keyboardType: TKeyboardType,
  multiline: boolean,
  onSubmitEditing: Function,
  renderLeft: Function,
  renderRight: Function,
  onFocus: Function,
  secureTextEntry: boolean, // 密码类型
  editable: boolean,
  returnKeyType: TReturnKeyType,
  children: any,
};
class ZnlInput extends Component<Props> {
  static defaultProps = {
    placeholder: "",
    autoFocus: false,
    defaultValue: "",
    keyboardType: "default",
    multiline: false,
  };
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
