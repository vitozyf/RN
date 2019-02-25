/**
 * 发出的询价
 * @flow
 */
import React, { Component } from "react";
import { View, Text } from "react-native";
import { ZnlHeader } from "@components";
type Props = { navigation: INavigation };
class ReceivedInquiry extends Component<Props> {
  static navigationOptions = ({ navigation }: any) => {
    const goBack = () => {
      navigation.goBack();
    };
    return {
      header: <ZnlHeader title="我发出的询价" onPressIcon={goBack} />,
    };
  };
  render() {
    return (
      <View>
        <Text>发出的询价</Text>
      </View>
    );
  }
}

export default ReceivedInquiry;
