// @flow
import React, { Component } from "react";
import { TouchableOpacity, TextInput, View, StyleSheet } from "react-native";
import Icon from "@components/Iconfont/CloudIcon";

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

type IautoCapitalize = "none" | "sentences" | "words" | "characters";

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
  onClose: Function,
  placeholderTextColor: string,
  renderCloseBtn: Function,
  autoCapitalize: IautoCapitalize,
};
type State = {
  inputValue: string | number,
  showClearBtn: boolean,
};
class ZnlInput extends Component<Props, State> {
  static defaultProps = {
    placeholder: "",
    autoFocus: false,
    defaultValue: "",
    keyboardType: "default",
    multiline: false,
    placeholderTextColor: "#999",
    autoCapitalize: "none",
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: "",
      showClearBtn: true,
    };
  }
  closeHandler = () => {
    const { onClose } = this.props;
    onClose && onClose();
    this.textInput && this.textInput.clear();
    this.setState({
      inputValue: "",
      showClearBtn: false,
    });
  };
  onChangeTextHandler = (value: string | number) => {
    const { onChangeText } = this.props;
    onChangeText && onChangeText(value);
    this.setState({
      inputValue: value,
      showClearBtn: true,
    });
  };
  clear = () => {
    this.textInput && this.textInput.clear();
  };
  textInput = null;
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
      placeholderTextColor,
      autoCapitalize,
    } = this.props;
    const { children, renderCloseBtn } = this.props;
    const { inputValue, showClearBtn } = this.state;
    const CloseButton = () => {
      if (renderCloseBtn) {
        return renderCloseBtn();
      } else if (inputValue || (showClearBtn && defaultValue)) {
        return (
          <Icon.Button
            onPress={this.closeHandler}
            name="input_clear"
            backgroundColor="rgba(0,0,0,0)"
            color="#ccc"
            size={16}
            borderRadius={0}
            activeOpacity={1}
            iconStyle={{
              marginRight: 0,
              padding: 0,
              height: 16,
            }}
          />
        );
      } else {
        return null;
      }
    };
    return (
      <View style={[styles.inputbox, style]}>
        {renderLeft && renderLeft()}
        <View style={styles.inputCon}>
          <TextInput
            style={[styles.inputsty, inputStyle]}
            placeholder={placeholder}
            maxLength={maxLength}
            onChangeText={this.onChangeTextHandler}
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            keyboardType={keyboardType}
            multiline={multiline}
            onSubmitEditing={onSubmitEditing}
            secureTextEntry={secureTextEntry}
            onFocus={onFocus}
            editable={editable}
            returnKeyType={returnKeyType}
            ref={ref => (this.textInput = ref)}
            placeholderTextColor={placeholderTextColor}
            autoCapitalize={autoCapitalize}
          />
          {CloseButton()}
        </View>
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
    borderColor: "#ccc",
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
  inputCon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    color: "#ccc",
  },
});

export default ZnlInput;
