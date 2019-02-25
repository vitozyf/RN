/**
 * 收到的询价
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ZnlHeader } from "@components";
import HeaderTabs from "@pages/PersonalPages/components/HeaderTabs";
import InquiryList from "@pages/PersonalPages/components/InquiryList";
import { connect } from "react-redux";

type Props = { navigation: INavigation, ActiveRouteName: string };
type State = {
  active: string, // all waiting already
};
class ReceivedInquiry extends Component<Props, State> {
  static navigationOptions = ({ navigation }: any) => {
    const goBack = () => {
      navigation.goBack();
    };
    return {
      header: <ZnlHeader title="我收到的询价" onPressIcon={goBack} />,
    };
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      active: "all",
    };
  }
  setActive = (active: string) => {
    if (active !== this.state.active) {
      this.setState({ active });
    }
  };
  render() {
    const { active } = this.state;
    const { ActiveRouteName } = this.props;
    const that = this;
    const tabs = [
      {
        value: "待我报价",
        key: "waiting",
        onPress() {
          that.setActive("waiting");
        },
      },
      {
        value: "我已报价",
        key: "already",
        onPress() {
          that.setActive("already");
        },
      },
      {
        value: "全部",
        key: "all",
        onPress() {
          that.setActive("all");
        },
      },
    ];
    const data = [];
    for (let index = 0; index < 20; index++) {
      data.push({
        id: index + "",
        title: `列表${index}`,
      });
    }
    return (
      <View style={styles.container}>
        <HeaderTabs active={active} tabs={tabs} />
        <InquiryList data={data} ActiveRouteName={ActiveRouteName} />
      </View>
    );
  }
  componentWillMount() {
    const { navigation } = this.props;
    const active = navigation.getParam("active");
    this.setActive(active);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, { ActiveRouteName: state.ActiveRouteName }, props);
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceivedInquiry);
