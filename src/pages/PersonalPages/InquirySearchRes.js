/**
 * 询价搜索
 * @flow
 */
import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import CONFIG from "@src/utils/config";
import { ZnlHeader } from "@components";
import HeaderTabs from "@pages/PersonalPages/components/HeaderTabs";

type Props = {
  navigation: INavigation,
};
type State = {
  active: string,
};
class InquirySearch extends Component<Props, State> {
  static navigationOptions = ({ navigation }: any) => {
    const keyword = navigation.getParam("keyword");

    const goBack = () => {
      navigation.goBack();
    };
    return {
      header: <ZnlHeader title={keyword} onPressIcon={goBack} />,
    };
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      active: "received",
    };
  }

  setActive = (active: string) => {
    if (active !== this.state.active) {
      this.setState({ active });
    }
  };
  _renderSearchRes = () => {
    const SearchRecords = ["LM357", "正能量"];
    return (
      <View>
        <Text>SearchRes</Text>
      </View>
    );
  };
  render() {
    const { active } = this.state;
    const that = this;
    const tabs = [
      {
        value: "我收到的询价",
        key: "received",
        onPress() {
          that.setActive("received");
        },
      },
      {
        value: "我发出的询价",
        key: "issued",
        onPress() {
          that.setActive("issued");
        },
      },
    ];
    return (
      <View style={styles.SearchPage}>
        <HeaderTabs active={active} tabs={tabs} />
        {this._renderSearchRes()}
      </View>
    );
  }
  componentWillMount() {
    const { navigation } = this.props;
    const active = navigation.getParam("active");
    const keyword = navigation.getParam("keyword");
    this.setState({ active });
    navigation.setParams({ keyword });
  }
}
const styles = StyleSheet.create({
  SearchPage: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
});

const mapStateToProps = (state, props) => {
  return props;
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InquirySearch);
