/**
 * 公司认证资料图片轮播
 *
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import AntDesign from "react-native-vector-icons/AntDesign";

type Props = {
  isVisible: boolean,
  closeModal: Function,
  AuthenticationInfo: Array<any>,
  index: number,
};
type State = {
  pageIndex: number,
};
class SwiperModal extends Component<Props, State> {
  static defaultProps = {
    isVisible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
    };
  }
  componentWillMount() {
    this.setState({
      pageIndex: this.props.index + 1,
    });
  }
  render() {
    const { isVisible, closeModal, AuthenticationInfo, index } = this.props;
    const { pageIndex } = this.state;
    console.log(AuthenticationInfo);
    const AuthenticationInfoEle = AuthenticationInfo.map((item, index) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          key={index}
          onPress={() => {
            closeModal && closeModal();
          }}
          style={styles.slide}
        >
          <View>
            <Image
              style={styles.AuthenticationInfoImg}
              source={{
                uri: item.Url,
              }}
            />
          </View>
        </TouchableOpacity>
      );
    });
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
        <View style={styles.Header}>
          <Text style={styles.text}>
            {pageIndex}/{AuthenticationInfo.length}
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              closeModal && closeModal();
            }}
          >
            <AntDesign
              name="close"
              size={18}
              style={styles.icon}
              backgroundColor="#000"
            />
          </TouchableOpacity>
        </View>
        <Swiper
          style={styles.wrapper}
          index={index}
          onIndexChanged={index => {
            this.setState({ pageIndex: index + 1 });
          }}
        >
          {AuthenticationInfoEle}
        </Swiper>
      </Modal>
    );
  }
}

export default SwiperModal;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    // flexDirection: "row",
    // alignItems: "center",
  },
  wrapper: {
    // height: 260,
    // backgroundColor: "#ccc",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
  },
  Header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
  },
  textin: {
    color: "red",
  },
  icon: {
    color: "#fff",
  },
  AuthenticationInfoImg: {
    height: 260,
  },
});
