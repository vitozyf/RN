import React, { Component } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { HeaderTitle, HeaderRight } from "@components";

class MembershipScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const goBack = () => {
      navigation.goBack();
    };
    return {
      headerTitle: <HeaderTitle title="帮助" />,
      headerLeft: (
        <Icon.Button
          size={26}
          name="md-arrow-back"
          backgroundColor="#fff"
          color="#333"
          iconStyle={{ marginLeft: 5 }}
          onPress={goBack}
        />
      ),
      headerRight: <HeaderRight />,
    };
  };
  render() {
    const { Sales } = this.props;
    return (
      <View style={styles.container}>
        {Sales.SalesName && Sales.telephone && (
          <View style={[styles.service, styles.Sales]}>
            <View style={styles.rowView}>
              <Text style={[styles.textCommon, styles.textTitle]}>业务员</Text>
              <Text style={[styles.textCommon, styles.textValue]}>
                {Sales.SalesName}
              </Text>
            </View>
            <View style={styles.rowView}>
              <Text style={[styles.textCommon, styles.textTitle]}>
                联系电话
              </Text>
              <Text
                style={[styles.textCommon, styles.textValue, styles.telText]}
                onPress={() => {
                  Linking.openURL("tel:400-699-2899");
                }}
              >
                {Sales.telephone}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.service}>
          <View style={styles.rowView}>
            <Text style={[styles.textCommon, styles.textTitle]}>客服</Text>
            <Text style={[styles.textCommon, styles.textValue]}>正能量</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={[styles.textCommon, styles.textTitle]}>联系电话</Text>
            <Text
              style={[styles.textCommon, styles.textValue, styles.telText]}
              onPress={() => {
                Linking.openURL("tel:400-699-2899");
              }}
            >
              400-699-2899
            </Text>
          </View>
        </View>
      </View>
    );
  }
  componentWillMount() {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  service: {
    backgroundColor: "#fff",
  },
  Sales: {
    marginBottom: 10,
  },
  rowView: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
    paddingLeft: 10,
    paddingRight: 10,
  },
  textCommon: {
    fontSize: 15,
  },
  textTitle: {
    textAlign: "center",
  },
  textValue: {
    color: "#999",
  },
  telText: {
    color: "#2288CC",
  },
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, { Sales: state.UserInfo.Sales }, props);
};

export default connect(mapStateToProps)(MembershipScreen);
