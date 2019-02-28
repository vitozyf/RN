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
} from "react-native";
import Picker from "react-native-picker";

// let data = [];
//     for (var i = 0; i < 100; i++) {
//       data.push(i);
//     }
//     Picker.init({
//       pickerData: data,
//       selectedValue: [59],
//       onPickerConfirm: data => {
//         console.log(data);
//       },
//       onPickerCancel: data => {
//         console.log(data);
//       },
//       onPickerSelect: data => {
//         console.log(data);
//       },
//     });
//     Picker.show();

type Props = {};
class RNPicker extends Component<Props> {
  render() {
    return (
      <View>
        <Text>请选择</Text>
      </View>
    );
  }
}

export default RNPicker;
