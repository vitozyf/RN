/**
 * 询价搜索
 * @flow
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import CONFIG from "@src/utils/config";
import { ZnlHeader } from "@components";
import HeaderTabs from "@pages/PersonalPages/components/HeaderTabs";
import InquiryList from "@pages/PersonalPages/components/InquiryList";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AppInit } from "@src/utils/appInit";

// 设置角标
const setBadge = (Badges: number) => {
  if (Platform.OS == "ios") {
    AppInit.JPushModule.setBadge(Badges, success => {});
  }
};
type Props = {
  navigation: INavigation,
};
type State = {
  active: "ReceivedInquiry" | "OutgoingInquiry",
  keyword: string,
  activeTag: string,
  data: Array<any>,
  showFoot: boolean,
  loading: boolean,
  PageIndex: number,
  withinDays: number | string,
};
class InquirySearch extends Component<Props, State> {
  static navigationOptions = ({ navigation }: any) => {
    const keyword = navigation.getParam("keyword");

    const goBack = () => {
      navigation.goBack();
    };
    return {
      header: (
        <ZnlHeader
          title={keyword}
          onPressIcon={goBack}
          style={{ backgroundColor: "#fff" }}
        />
      ),
    };
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      active: "ReceivedInquiry",
      activeTag: "",
      keyword: "",
      data: [],
      showFoot: false,
      loading: false,
      PageIndex: 1,
      withinDays: 0,
    };
  }

  setActive = (active: "ReceivedInquiry" | "OutgoingInquiry") => {
    this.setState({ active }, () => {
      this.getReceivedInquiryData();
    });
  };

  setActiveTag = (activeTag: string) => {
    let withinDays = 0;
    if (activeTag !== this.state.activeTag) {
      switch (activeTag) {
        case "3天内":
          withinDays = 3;
          break;
        case "7天内":
          withinDays = 7;
          break;
        case "14天内":
          withinDays = 14;
          break;
        case "30天内":
          withinDays = 30;
          break;
        case "半年内":
          withinDays = 180;
          break;

        default:
          break;
      }
      this.setState({ activeTag, withinDays }, () => {
        this.getReceivedInquiryData();
      });
    } else {
      this.setState({ activeTag: "", withinDays: 0 }, () => {
        this.getReceivedInquiryData();
      });
    }
  };
  setActiveTagSearchHandler = () => {};
  _renderSearchRes = () => {
    const { active, data, showFoot, loading } = this.state;
    return (
      <InquiryList
        showFoot={showFoot}
        loading={loading}
        data={data}
        ActiveRoute={active}
        getMoreReceivedInquiryData={this.getMoreReceivedInquiryData}
        getReceivedInquiryData={this.getReceivedInquiryData}
        sendquotedpriceSuccess={() => {
          this.getReceivedInquiryData();
        }}
        headerHeight={96}
      />
    );
  };
  getMoreReceivedInquiryData = () => {
    const { data, PageIndex } = this.state;
    this.getReceivedInquiryData(PageIndex + 1);
  };
  getReceivedInquiryData = (pageIndex = 1) => {
    const { keyword, withinDays, active } = this.state;
    let RqsURL = "im/getappenquirylistsync";
    switch (active) {
      case "ReceivedInquiry":
        RqsURL = "im/getappenquirylistsync";
        break;
      case "OutgoingInquiry":
        RqsURL = "im/getappsendenquirylistsync";
        break;
      default:
        break;
    }
    this.setState({ loading: true });
    if (pageIndex === 1) {
      Cloud.$Loading.show();
    }
    Cloud.$post(
      RqsURL,
      {
        keyWord: keyword,
        withinDays,
        pageIndex,
        pageSize: 10,
      },
      { onlydata: false }
    )
      .then(res => {
        Cloud.$Loading.hidden();
        this.setState({ loading: false });
        try {
          let data = [];
          let PageIndex = pageIndex;
          if (res && res.Result && res.Result.Data.Data) {
            data = res.Result.Data.Data.ResultList || [];
            PageIndex = res.Result.Data.Data.PageIndex;
          }
          if (data.length < 10) {
            this.setState({ showFoot: true });
          }
          let concantData = [];
          if (pageIndex > 1) {
            concantData = this.state.data.concat(data);
            this.setState({ data: concantData, PageIndex });
          } else {
            this.setState({ data, PageIndex });
          }

          const Message = res.Result.Data.Message;
          if (Message) {
            const MessageParse = JSON.parse(Message);
            setBadge(-1 * MessageParse.ReadCnt);
          }
        } catch (error) {
          Cloud.$addLog(
            "InquirySearchRes.js-getReceivedInquiryData",
            error.message
          );
        }
      })
      .catch(() => {
        Cloud.$Loading.hidden();
        this.setState({ loading: false });
      });
  };
  render() {
    const { active, activeTag } = this.state;
    const tabs = [
      {
        value: "我收到的询价",
        key: "ReceivedInquiry",
      },
      {
        value: "我发出的询价",
        key: "OutgoingInquiry",
      },
    ];
    const tabsTime = [
      {
        value: "3天内",
        key: "3天内",
      },
      {
        value: "7天内",
        key: "7天内",
      },
      {
        value: "14天内",
        key: "14天内",
      },
      {
        value: "30天内",
        key: "30天内",
      },
      {
        value: "半年内",
        key: "半年内",
      },
    ];
    return (
      <View style={styles.SearchPage}>
        <View style={{ flex: 1 }}>
          {/* <KeyboardAwareScrollView> */}
          {this._renderSearchRes()}
          {/* </KeyboardAwareScrollView> */}
        </View>
        <View style={{ position: "absolute", top: 0, width: "100%" }}>
          <HeaderTabs
            active={active}
            tabs={tabs}
            onChangeHandler={key => {
              this.setActive(key);
            }}
          />
          <HeaderTabs
            active={activeTag}
            tabs={tabsTime}
            type="tag"
            onChangeHandler={key => {
              this.setActiveTag(key);
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
    this.setState({ active, keyword }, () => {
      this.getReceivedInquiryData();
    });
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
