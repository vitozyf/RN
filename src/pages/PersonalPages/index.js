// @flow
import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

type Props = {};
class PersonalCenter extends Component<Props> {
  render() {
    console.log(this.props);
    return (
      <View>
        <Text>123</Text>
      </View>
    );
  }
}
const mapStateToProps = (state, props) => {
  return Object.assign(
    {},
    {
      AvatarPath: state.UserInfo.AvatarPath,
      NickName: state.UserInfo.NickName,
      UserIdentity: state.UserInfo.UserIdentity,
    },
    props
  );
};
export default connect(mapStateToProps)(PersonalCenter);
