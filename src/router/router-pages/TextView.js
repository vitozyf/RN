/**
 * 测试页
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderTitle, HeaderRight } from "@components";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {};
type IV = {
  navigation: INavigation,
};
class TextPage extends Component<Props> {
  static navigationOptions = ({ navigation }: IV) => {
    const goBack = () => {
      navigation.navigate("Home");
    };
    return {
      headerTitle: <HeaderTitle title="测试" />,
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
    return (
      <View>
        <Text>测试页</Text>
      </View>
    );
  }
}

export default TextPage;
