/**
 * 询报价详情
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
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
};
class MessageDetail extends Component<Props, State> {
  static navigationOptions = ({ navigation }: any) => {
    const goBack = () => {
      navigation.goBack();
    };
    const Model = navigation.getParam("Model");
    return {
      header: <ZnlHeader title={Model} onPressIcon={goBack} />,
    };
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
      MsgType: 2,
      BDLineGuid: "",
    };
  }

  render() {
    const { navigation } = this.props;
    const MsgType = navigation.getParam("MsgType");
    const { data } = this.state;
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
        {data && (
          <InquiryListItem
            data={data}
            ActiveRoute={ActiveRoute}
            sendquotedpriceSuccess={this.sendquotedpriceSuccess}
          />
        )}
      </View>
    );
  }
  getReceivedInquiryData = async () => {
    const { BDLineGuid } = this.state;

    Cloud.$Loading.show();
    return Cloud.$post(
      `im/getappenquirylistsync`,
      {
        msgType: 0,
        pageIndex: 1,
        pageSize: 2,
      },
      { onlydata: false }
    )
      .then(res => {
        Cloud.$Loading.hidden();
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
        Cloud.$Loading.hidden();
      });
  };
  getappsendenquirylistsync = async () => {
    const { BDLineGuid } = this.state;

    Cloud.$Loading.show();
    return Cloud.$post(
      `im/getappsendenquirylistsync`,
      {
        msgType: 0,
        pageIndex: 1,
        pageSize: 2,
      },
      { onlydata: false }
    )
      .then(res => {
        Cloud.$Loading.hidden();
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
        Cloud.$Loading.hidden();
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
    this.getMessageDetail();
  };
  componentWillMount() {
    const { navigation } = this.props;
    const MsgType = navigation.getParam("MsgType");
    const Model = navigation.getParam("Model");
    const BDLineGuid = navigation.getParam("BDLineGuid");

    navigation.setParams({
      Model,
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
    backgroundColor: "#fff",
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
