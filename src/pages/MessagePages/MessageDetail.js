/**
 * 询报价详情
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import { ZnlHeader } from "@components";
import { connect } from "react-redux";
import InquiryListItem from "@pages/PersonalPages/components/InquiryListItem";
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
  data: Object | null,
  MsgType: number,
  BDLineGuid: string,
  loading: boolean,
};
class MessageDetail extends Component<Props, State> {
  static navigationOptions = ({ navigation }: any) => {
    const goBack = () => {
      navigation.goBack();
    };
    const MsgType = navigation.getParam("MsgType");
    return {
      header: (
        <ZnlHeader
          title={MsgType === 2 ? "询价通知" : MsgType === 3 ? "报价通知" : ""}
          onPressIcon={goBack}
        />
      ),
    };
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
      MsgType: 2,
      BDLineGuid: "",
      loading: false,
    };
  }

  render() {
    const { navigation } = this.props;
    const MsgType = navigation.getParam("MsgType");
    const { data, loading } = this.state;
    let ActiveRoute = "";
    switch (MsgType) {
      case 2:
        ActiveRoute = "ReceivedInquiry";
        break;
      case 3:
        ActiveRoute = "OutgoingInquiry";
        break;
      default:
        ActiveRoute = "ReceivedInquiry";
        break;
    }
    return (
      <View style={styles.container}>
        {data && !loading && (
          <ScrollView>
            <InquiryListItem
              data={data}
              ActiveRoute={ActiveRoute}
              sendquotedpriceSuccess={this.sendquotedpriceSuccess}
            />
          </ScrollView>
        )}
        {!data && !loading && (
          <View style={[styles.container, styles.noData]}>
            <Text>没有查到相关数据，看看其他消息吧～</Text>
          </View>
        )}
      </View>
    );
  }
  getReceivedInquiryData = async () => {
    const { BDLineGuid } = this.state;
    this.setState({ loading: true });
    return Cloud.$post(
      `im/getappenquirylistsync`,
      {
        msgType: 0,
        pageIndex: 1,
        pageSize: 2,
        BDLineGuid,
      },
      { onlydata: false, loading: true }
    )
      .then(res => {
        this.setState({ loading: false });
        try {
          let data = [];
          if (res && res.Result && res.Result.Data.Data) {
            data = res.Result.Data.Data.ResultList || [];
          }
          if (data.length > 0) {
            this.setState({ data: data[0] });
          }
          const Message = res.Result.Data.Message;
          if (Message) {
            const MessageParse = JSON.parse(Message);
            setBadge(-1 * MessageParse.ReadCnt);
          }
        } catch (error) {
          Cloud.$addLog(
            "MessageDetail.js-getReceivedInquiryData",
            error.message
          );
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };
  getappsendenquirylistsync = async () => {
    const { BDLineGuid } = this.state;
    this.setState({ loading: true });
    return Cloud.$post(
      `im/getappsendenquirylistsync`,
      {
        msgType: 0,
        pageIndex: 1,
        pageSize: 2,
        BDLineGuid,
      },
      { onlydata: false, loading: true }
    )
      .then(res => {
        this.setState({ loading: false });
        try {
          let data = [];
          if (res && res.Result && res.Result.Data.Data) {
            data = res.Result.Data.Data.ResultList || [];
          }
          if (data.length > 0) {
            this.setState({ data: data[0] });
          }
          const Message = res.Result.Data.Message;
          if (Message) {
            const MessageParse = JSON.parse(Message);
            setBadge(-1 * MessageParse.ReadCnt);
          }
        } catch (error) {
          Cloud.$addLog(
            "MessageDetail.js-getappsendenquirylistsync",
            error.message
          );
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };
  getMessageDetail = () => {
    const { MsgType } = this.state;
    if (MsgType === 2) {
      this.getReceivedInquiryData();
    }
    if (MsgType === 3) {
      this.getappsendenquirylistsync();
    }
  };
  sendquotedpriceSuccess = () => {
    // this.getMessageDetail();
    this.props.navigation.goBack();
  };
  componentWillMount() {
    const { navigation } = this.props;
    const MsgType = navigation.getParam("MsgType");
    const BDLineGuid = navigation.getParam("BDLineGuid");

    navigation.setParams({
      MsgType,
    });
    this.setState(
      {
        MsgType,
        BDLineGuid,
      },
      () => {
        this.getMessageDetail();
      }
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  noData: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, {}, props);
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageDetail);
