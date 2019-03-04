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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = { navigation: INavigation };
type State = {
  active: string, // all waiting already
  data: Array<any>,
  showFoot: boolean,
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
      showFoot: false,
    };
  }
  setActive = (active: string) => {
    if (active !== this.state.active) {
      this.setState({ active });
    }
    let msgType = 0;
    switch (active) {
      case "all":
        msgType = 0;
        break;
      case "waiting":
        msgType = 1;
        break;
      case "already":
        msgType = 2;
        break;
      default:
        break;
    }
    this.getReceivedInquiryData(1, {
      msgType,
    });
  };
  getMoreReceivedInquiryData = () => {
    const { data } = this.state;
    // this.getReceivedInquiryData(5, data[data.length - 1].Id);
  };
  getReceivedInquiryData = (pageIndex = 1, option: any) => {
    console.log(111, option);
    // 模拟数据
    const data = [];
    for (let index = 0; index < 4; index++) {
      data.push({
        id: index + "",
        title: `列表${index}`,
      });
    }
    this.setState({ data });

    // if (pageIndex === 1) {
    //   Cloud.$Loading.show();
    // }
    // Cloud.$post(`im/getappenquirylistsync`, {
    //   msgType: 0,
    //   pageIndex,
    //   pageSize: 10,
    // })
    //   .then(res => {
    //     console.log(11, res);
    //   })
    //   .catch(() => {
    //     Cloud.$Loading.hidden();
    //   });
  };
  _renderList = () => {
    const { data, showFoot } = this.state;
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
  onChangeHandler = key => {
    this.setActive(key);
    // 搜索
  };
  render() {
    const { active } = this.state;
    const tabs = [
      {
        value: "待我报价",
        key: "waiting",
      },
      {
        value: "我已报价",
        key: "already",
      },
      {
        value: "全部",
        key: "all",
      },
    ];
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <KeyboardAwareScrollView>
            {this._renderList()}
          </KeyboardAwareScrollView>
        </View>
        <View style={{ position: "absolute", top: 0, width: "100%" }}>
          <HeaderTabs
            active={active}
            tabs={tabs}
            onChangeHandler={key => {
              this.onChangeHandler(key);
            }}
          />
        </View>
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
  return props;
};
export default connect(mapStateToProps)(ReceivedInquiry);
