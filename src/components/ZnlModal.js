// @flow
import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";

type Props = {
  title: string,
  value: mixed,
  confirmHandler: Function,
  cancelHandler: Function,
  visible: boolean,
  cancelText: string,
  confirmText: string,
};
class ZnlModal extends Component<Props> {
  static defaultProps = {
    title: "",
    value: "",
    visible: false,
    cancelText: "取消",
    confirmText: "确定",
  };
  render() {
    const {
      title,
      value,
      confirmHandler,
      cancelHandler,
      visible,
      cancelText,
      confirmText,
    } = this.props;
    return (
      <Modal
        isVisible={visible}
        useNativeDriver={true}
        onBackButtonPress={cancelHandler}
      >
        <View style={styles.modalView}>
          <View style={styles.modalTitleView}>
            <Text style={styles.modalTitle}>{title}</Text>
          </View>
          <View style={styles.modalValueView}>
            {typeof value === "function" ? (
              value()
            ) : (
              <Text style={styles.modalValue}>
                {typeof value === "string" ? value : ""}
              </Text>
            )}
          </View>
          <View style={styles.modalFooterView}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.modalFooterButton}
              onPress={cancelHandler}
            >
              <Text
                style={[
                  styles.modalFooterButtonText,
                  styles.modalFooterButtonTextLeft,
                ]}
              >
                {cancelText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.modalFooterButton}
              onPress={confirmHandler}
            >
              <Text style={styles.modalFooterButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  modalTitleView: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    textAlign: "center",
  },
  modalValueView: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  modalValue: {
    fontSize: 16,
    textAlign: "center",
  },
  modalFooterView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#E6E6E6",
  },
  modalFooterButton: {
    flex: 1,
  },
  modalFooterButtonText: {
    textAlign: "center",
    lineHeight: 48,
    fontSize: 18,
  },
  modalFooterButtonTextLeft: {
    borderRightWidth: 1,
    borderColor: "#E6E6E6",
  },
});
export default ZnlModal;
