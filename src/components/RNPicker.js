/**
 * 封装选择器
 * @flow
 */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Picker from "react-native-picker";
import RootSiblings from "react-native-root-siblings";

const Height = Dimensions.get("window").height;
const Width = Dimensions.get("window").width;
let sibling = undefined;

type Props = {
  data: Array<any>,
  onPickerConfirm?: Function,
  onPickerCancel?: Function,
  onPickerSelect?: Function,
  defaultSelectedValue?: string,
};
type State = {
  selectedValue: string,
};
class RNPicker extends Component<Props, State> {
  state = {
    selectedValue: "",
  };
  openPicker = () => {
    this.InitPicker();
    Picker.show();
    const SiblingEle = (
      <TouchableOpacity
        style={styles.ModalStyle}
        onPress={this.closePicker}
        activeOpacity={1}
      />
    );
    sibling = new RootSiblings(SiblingEle);
  };
  closePicker = () => {
    Picker.hide();
    sibling && sibling.destroy();
  };

  render() {
    const { selectedValue } = this.state;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this.openPicker}
        style={styles.pickerView}
      >
        <Text
          style={[
            styles.pickerText,
            selectedValue === "请选择" ? styles.selectedValue : null,
          ]}
        >
          {selectedValue}
        </Text>
      </TouchableOpacity>
    );
  }
  defaultValueHandler = () => {
    const { defaultSelectedValue } = this.props;
    this.setState({
      selectedValue: defaultSelectedValue || "请选择",
    });
  };
  defaultHandlerConfirm = (item: Array<string>) => {
    this.setState({ selectedValue: item[0] });
    sibling && sibling.destroy();
  };
  defaultHandler = () => {
    sibling && sibling.destroy();
  };
  onPickerConfirmHandler = (item: Array<string>) => {
    const { data, onPickerConfirm } = this.props;
    const selectDataObject = data.find(outDataItem => {
      return outDataItem.value === item[0];
    });
    onPickerConfirm && onPickerConfirm(selectDataObject);
    this.setState({ selectedValue: item[0] });
    sibling && sibling.destroy();
  };
  InitPicker = () => {
    const {
      data,
      onPickerConfirm,
      onPickerCancel,
      onPickerSelect,
    } = this.props;
    // 事件处理

    let onPickerConfirmHandler = onPickerConfirm
      ? this.onPickerConfirmHandler
      : this.defaultHandlerConfirm;
    const onPickerCancelHandler = onPickerCancel || this.defaultHandler;
    const onPickerSelectHandler = onPickerSelect || this.defaultHandler;
    // 数据处理
    const pickerData = [];
    if (data.length > 0) {
      data.map(item => {
        pickerData.push(item.value);
      });
    }
    Picker.init({
      pickerData,
      selectedValue: [59],
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerTitleText: " ",
      pickerConfirmBtnColor: [51, 131, 243, 1],
      pickerCancelBtnColor: [51, 131, 243, 1],
      pickerToolBarBg: [242, 242, 242, 1],
      pickerBg: [255, 255, 255, 1],
      onPickerConfirm: onPickerConfirmHandler,
      onPickerCancel: onPickerCancelHandler,
      onPickerSelect: onPickerSelectHandler,
    });
  };
  componentWillMount() {
    this.defaultValueHandler();
  }
}

const styles = StyleSheet.create({
  pickerView: {
    height: 36,
    borderWidth: 1,
    borderColor: "#d6d6d6",
    paddingLeft: 5,
  },
  ModalStyle: {
    backgroundColor: "rgba(0,0,0,0)",
    height: Height,
    width: Width,
  },
  pickerText: {
    color: "#333",
    lineHeight: 36,
    fontWeight: "400",
  },
  selectedValue: {
    color: "#999",
  },
});

export default RNPicker;
