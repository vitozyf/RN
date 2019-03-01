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
import InquiryList from "@pages/PersonalPages/components/InquiryList";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {
  navigation: INavigation,
};
type State = {
  active: string,
  data: Array<any>,
  showFoot: boolean,
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
      data: [],
      showFoot: false,
    };
  }

  setActive = (active: string) => {
    if (active !== this.state.active) {
      this.setState({ active });
    }
  };
  _renderSearchRes = () => {
    const { active, data, showFoot } = this.state;
    return (
      <InquiryList
        showFoot={showFoot}
        data={data}
        ActiveRoute="ReceivedInquiry"
        getMoreReceivedInquiryData={this.getMoreReceivedInquiryData}
        getReceivedInquiryData={this.getReceivedInquiryData}
      />
    );
  };
  getMoreReceivedInquiryData = () => {
    const { data } = this.state;
    this.getReceivedInquiryData(5, data[data.length - 1].Id);
  };
  getReceivedInquiryData = (count = 5, minMsgId = 0) => {
    // 模拟数据
    const data = [];
    for (let index = 0; index < 4; index++) {
      data.push({
        id: index + "",
        title: `列表${index}`,
      });
    }
    this.setState({ data });

    // if (minMsgId === 0) {
    //   Cloud.$Loading.show();
    // }
    // Cloud.$get(`im/getappmsglistsync?count=${count}&minMsgId=${minMsgId}`)
    //   .then(res => {
    //     Cloud.$Loading.hidden();
    //     const data = res || [];
    //     if (data.length < 5) {
    //       this.setState({
    //         showFoot: true,
    //       });
    //     }
    //     if (minMsgId === 0) {
    // this.setState({
    //   data
    // })
    //     } else {
    // const ConcatData = this.state.data.concat(data);
    // this.setState({
    //   data: ConcatData
    // })
    //     }
    //   })
    //   .catch(() => {
    //     Cloud.$Loading.hidden();
    //   });
  };
  render() {
    const { active } = this.state;
    const that = this;
    const tabs = [
      {
        value: "我收到的询价",
        key: "received",
      },
      {
        value: "我发出的询价",
        key: "issued",
      },
    ];
    return (
      <View style={styles.SearchPage}>
        <View style={{ flex: 1 }}>
          <KeyboardAwareScrollView>
            {this._renderSearchRes()}
          </KeyboardAwareScrollView>
        </View>
        <View style={{ position: "absolute", top: 0, width: "100%" }}>
          <HeaderTabs
            active={active}
            tabs={tabs}
            onChangeHandler={key => {
              this.setActive(key);
            }}
          />
        </View>
      </View>
    );
  }
  componentWillMount() {
    const { navigation } = this.props;
    const active = navigation.getParam("active");
    const keyword = navigation.getParam("keyword");
    this.setState({ active });
    navigation.setParams({ keyword });
    this.getReceivedInquiryData();
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
