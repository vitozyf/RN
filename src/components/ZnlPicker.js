/**
 * 封装选择器
 * @flow
 */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Picker,
  Modal,
  Platform,
  TouchableOpacity,
} from "react-native";
import ZnlInput from "./ZnlInput";

type IOption = {
  label: string,
  value: string | number | boolean,
};
type Props = {
  options: Array<IOption>,
};
type State = {
  modalVisible: boolean,
};
class ZnlPicker extends Component<Props, State> {
  state = {
    modalVisible: false,
  };
  render() {
    const { options } = this.props;
    const { modalVisible } = this.state;
    if (Platform.OS === "android") {
      return (
        <Picker {...this.props}>
          {options.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.label} value={item.value} />
            );
          })}
        </Picker>
      );
    } else if (Platform.OS === "ios") {
      return (
        <View>
          <ZnlInput
            placeholder="请选择"
            style={{ height: 36 }}
            inputStyle={{ fontSize: 14 }}
            onFocus={() => {
              this.setState({ modalVisible: true });
            }}
          />
          <Modal transparent={true} visible={modalVisible}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.blankView}
              onPress={() => {
                this.setState({ modalVisible: false });
              }}
            />
            <View style={styles.IosContainer}>
              <View style={styles.pickerHeader}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.pickerBtn, styles.pickerBtnCancel]}
                >
                  <Text
                    style={[styles.pickerBtnText, styles.pickerBtnTextCancel]}
                  >
                    取消
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.pickerBtn, styles.pickerBtnConfirm]}
                >
                  <Text
                    style={[styles.pickerBtnText, styles.pickerBtnTextCancel]}
                  >
                    确定
                  </Text>
                </TouchableOpacity>
              </View>
              <Picker style={styles.iosPicker} {...this.props}>
                {options.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={item.label}
                      value={item.value}
                    />
                  );
                })}
              </Picker>
            </View>
          </Modal>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  IosContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  blankView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
  },
  pickerHeader: {
    backgroundColor: "#f2f2f2",
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pickerBtn: {
    width: 100,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerBtnCancel: {},
  pickerBtnConfirm: {},
  pickerBtnText: {
    color: "#3383F3",
    fontSize: 18,
    fontWeight: "bold",
  },
  pickerBtnTextCancel: {},
  pickerBtnTextConfirm: {},
  iosPicker: {
    backgroundColor: "#fff",
  },
});

export default ZnlPicker;
