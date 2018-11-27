/**
 * 公司认真资料图片轮播
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";

type Props = {
  isVisible: boolean,
  closeModal: Function,
};
class Swiper extends Component<Props> {
  static defaultProps = {
    isVisible: false,
  };
  render() {
    const { isVisible, closeModal } = this.props;
    return (
      <Modal
        isVisible={isVisible}
        useNativeDriver={true}
        onBackdropPress={() => {
          closeModal && closeModal();
        }}
        style={styles.Container}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={50}
        backdropOpacity={1}
      >
        <View>
          <Text>111</Text>
        </View>
      </Modal>
    );
  }
}

export default Swiper;

const styles = StyleSheet.create({
  Container: {},
});
