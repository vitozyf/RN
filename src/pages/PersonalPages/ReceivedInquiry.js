/**
 * 收到的询价
 */
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { ZnlHeader } from "@components";
import HeaderTabs from "@pages/PersonalPages/components/HeaderTabs";
import InquiryList from "@pages/PersonalPages/components/InquiryList";
import { connect } from "react-redux";
import Icon from "@components/Iconfont/CloudIcon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AppInit } from "@src/utils/appInit";
// 设置角标
const setBadge = (Badges: number) => {
  if (Platform.OS == "ios") {
    AppInit.JPushModule.setBadge(Badges, success => {});
  }
};
type Props = { navigation: INavigation };
type State = {
  active: string, // all waiting already
  data: Array<any>,
  showFoot: boolean,
  PageIndex: number,
  loading: boolean,
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
            navigation.push("InquirySearch", { active: "ReceivedInquiry" });
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
      PageIndex: 1,
    };
  }
  sendquotedpriceSuccess = active => {
    this.setActive(active);
  };
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

    this.InquiryListRef &&
      this.InquiryListRef.scrollToIndex({
        animated: false,
        index: 0,
        viewOffset: 50,
        viewPosition: 0,
      });
  };
  getMoreReceivedInquiryData = () => {
    const { data, PageIndex } = this.state;
    this.getReceivedInquiryData(PageIndex + 1);
  };
  getReceivedInquiryData = (pageIndex = 1, option: any) => {
    this.setState({ loading: true });
    if (pageIndex === 1) {
      Cloud.$Loading.show();
    }
    let msgType = 0;
    if (option && option.msgType !== undefined) {
      msgType = option.msgType;
    }
    Cloud.$post(
      `im/getappenquirylistsync`,
      {
        msgType,
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
            "ReceivedInquiry.js-getReceivedInquiryData",
            error.message
          );
        }
      })
      .catch(() => {
        Cloud.$Loading.hidden();
        this.setState({ loading: false });
      });
  };
  InquiryListRef: any = null;
  _renderList = () => {
    const { data, showFoot, loading } = this.state;
    return (
      <InquiryList
        showFoot={showFoot}
        data={data}
        ActiveRoute="ReceivedInquiry"
        getMoreReceivedInquiryData={this.getMoreReceivedInquiryData}
        getReceivedInquiryData={this.getReceivedInquiryData}
        loading={loading}
        sendquotedpriceSuccess={this.sendquotedpriceSuccess}
        ref={ref => {
          this.InquiryListRef = ref;
        }}
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
          {/* <KeyboardAwareScrollView> */}
          {this._renderList()}
          {/* </KeyboardAwareScrollView> */}
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
