/* @flow */
import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import { HeaderTitle, HeaderRight } from "@components";

type Props = {
  navigation: INavigation,
  AvatarPath: string,
};
class HeaderLeft extends Component<Props> {
  onPress = () => {
    const { navigation } = this.props;
    navigation.openDrawer();
  };
  render() {
    const { AvatarPath } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.onPress}>
        <Image
          style={styles.headerLeftImg}
          source={{
            uri: AvatarPath,
          }}
        />
      </TouchableOpacity>
    );
  }
}

const HeaderLeftCom = connect((state, props) => {
  return Object.assign({}, { AvatarPath: state.UserInfo.AvatarPath }, props);
})(HeaderLeft);

type ErpIndexProps = {
  navigation: INavigation,
};

class ErpIndex extends Component<ErpIndexProps> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <HeaderTitle title="ERP" textStyle={{ color: "#fff" }} />,
      headerLeft: <HeaderLeftCom navigation={navigation} />,
      headerRight: <HeaderRight />,
    };
  };
  toErpList(name) {
    const { navigation } = this.props;
    navigation.push("ErpList", { name });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.8}
          onPress={() => {
            this.toErpList("StkStock");
          }}
        >
          <Image
            style={styles.titleicon}
            source={require("./img/list-wh_ic.png")}
          />
          <Text style={styles.title}>库存</Text>
          <AntDesign style={styles.icon} name="right" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.8}
          onPress={() => {
            this.toErpList("StkInRecord");
          }}
        >
          <Image
            style={styles.titleicon}
            source={require("./img/list-into-wh_ic.png")}
          />

          <Text style={styles.title}>入库</Text>
          <AntDesign style={styles.icon} name="right" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.8}
          onPress={() => {
            this.toErpList("StkOutByModel");
          }}
        >
          <Image
            style={styles.titleicon}
            source={require("./img/list-go-out-wh_ic.png")}
          />
          <Text style={styles.title}>出库</Text>
          <AntDesign style={styles.icon} name="right" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.8}
          onPress={() => {
            this.toErpList("StkInquireRecord");
          }}
        >
          <Image
            style={styles.titleicon}
            source={require("./img/list-askprice_ic.png")}
          />
          <Text style={styles.title}>询价</Text>
          <AntDesign style={styles.icon} name="right" size={20} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.row}
          activeOpacity={0.8}
          onPress={() => {
            this.toErpList("HisofferpriceByModel");
          }}
        >
          <Image
            style={styles.titleicon}
            source={require("./img/list-quote_ic.png")}
          />
          <Text style={styles.title}>报价</Text>
          <AntDesign style={styles.icon} name="right" size={20} />
        </TouchableOpacity> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerLeftImg: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginLeft: 10,
  },
  row: {
    borderBottomWidth: 1,
    borderColor: "#E6E6E6",
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  title: {
    flex: 1,
    fontSize: 15,
    // textAlign: 'left',
  },
  titleicon: {
    marginLeft: 16,
    marginRight: 8,
  },
  icon: {
    width: 50,
    textAlign: "center",
    color: "#999",
    fontWeight: "bold",
  },
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, props);
};

export default connect(mapStateToProps)(ErpIndex);
