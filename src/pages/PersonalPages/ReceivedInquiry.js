/**
 * 收到的询价
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ZnlHeader } from "@components";
import HeaderTabs from "@pages/PersonalPages/components/HeaderTabs";
import InquiryList from "@pages/PersonalPages/components/InquiryList";
import { connect } from "react-redux";
import Icon from "@components/Iconfont/CloudIcon";

type Props = { navigation: INavigation, ActiveRouteName: string };
type State = {
  active: string, // all waiting already
  data: Array<any>,
};
class ReceivedInquiry extends Component<Props, State> {
  static navigationOptions = ({ navigation }: any) => {
    const goBack = () => {
      navigation.goBack();
    };
    const renderRight = () => {
      return (
        <TouchableOpacity
          style={{ width: 36 }}
          activeOpacity={0.9}
          onPress={() => {
            navigation.push("InquirySearch");
          }}
        >
          <Icon name="input_search_ic" size={20} />
        </TouchableOpacity>
      );
    };
    return {
      header: (
        <ZnlHeader
          title="我收到的询价"
          onPressIcon={goBack}
          renderRight={renderRight}
        />
      ),
    };
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      active: "all",
      data: [],
    };
  }
  setActive = (active: string) => {
    if (active !== this.state.active) {
      this.setState({ active });
    }
  };
  getReceivedInquiryData = () => {
    // 模拟数据
    const data = [];
    for (let index = 0; index < 1; index++) {
      data.push({
        id: index + "",
        title: `列表${index}`,
      });
    }

    this.setState({ data });
  };
  render() {
    const { active, data } = this.state;
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
    this.getReceivedInquiryData();
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
