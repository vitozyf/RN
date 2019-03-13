/**
 * 询价列表行渲染
 * @flow
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
  Picker,
  findNodeHandle,
  Platform,
  Alert,
} from "react-native";
import Icon from "@components/Iconfont/CloudIcon";
import { DashLine, ZnlInput } from "@components";
import RNPicker from "@components/RNPicker";
import { underline } from "ansi-colors";

const WindowWidth = Dimensions.get("window").width;
const PaddingLR = 20;

const TaxPointData = [
  { key: 0, value: "0" },
  { key: 0.15, value: "15" },
  { key: 0.16, value: "16" },
  { key: 0.17, value: "17" },
];
const TheQualityOfData = [
  { key: "原装", value: "原装" },
  { key: "翻新", value: "翻新" },
  { key: "散新", value: "散新" },
  { key: "国产", value: "国产" },
  { key: "台产", value: "台产" },
  { key: "不确定", value: "不确定" },
  { key: "旧货", value: "旧货" },
];

type SelectData = {
  key: string | number | boolean,
  value: string,
};
type IQuotedPrice = {
  SupplierStatus?: number, //  供应商状态(1?: 未回复， 2：已回复， 3：供应商已忽略)
  sNeedInvoice?: boolean, // 是否需要发票
  TaxRate?: number, //  税点
  SupplierName?: string, //  供应商名称
  SupplierID?: string, // 供应商ID
  Model?: string, //型号
  Qty?: number, // 数量
  Price?: number, // 单价
  Quality?: string, //  品质
  Brand?: string, // 品牌
  SalesPrice?: number, // 销售定价
  InvQty?: number, // 库存量
  MakeYear?: string, //  年份
  BDLineGuid?: string, //  报价明细Guid
  IQGuid?: string, // 询价GUID
};
type Props = {
  data: Object,
  sendquotedpriceSuccess?: Function,
  ActiveRoute: "ReceivedInquiry" | "OutgoingInquiry",
};
type State = {
  showMoreParams: boolean,
  QuotedPrice: IQuotedPrice,
  CurrentStatus: number, // 修改内部按钮状态
  SendAgain: boolean,
};
class InquiryListItem extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showMoreParams: false,
      QuotedPrice: {},
      CurrentStatus: 1,
      SendAgain: true,
    };
  }
  onPickerConfirm = (data: SelectData) => {
    this.setState({
      QuotedPrice: Object.assign({}, this.state.QuotedPrice, {
        TaxRate: Number(data.key),
      }),
    });
  };
  onPickerConfirm1 = (data: SelectData) => {
    this.setState({
      QuotedPrice: Object.assign({}, this.state.QuotedPrice, {
        Quality: String(data.key),
      }),
    });
  };
  IgnoreHandler = () => {
    const Title = Platform.select({
      ios: {
        title: "确认忽略该询价吗？",
      },
      android: {
        title: "",
      },
    });
    const Content = Platform.select({
      ios: {
        content: "",
      },
      android: {
        content: "确认忽略该询价吗？",
      },
    });
    Alert.alert(Title.title, Content.content, [
      { text: "取消" },
      {
        text: "忽略",
        onPress: () => {
          this.sendQuotation(3);
        },
      },
    ]);
  };
  ResendInquiry = () => {
    const { data } = this.props;
    const HttpParams = {
      IsNeedInvoice: data.IsNeedInvoice, // 是否需要发票
      SupplierName: data.SupplierName, //  供应商名称
      SupplierID: data.SupplierID,
      Remark: data.Remark,
      Model: data.Model, //型号
      Qty: data.QuotationQty,
      Brand: data.Brand, // 品牌
      RequiredQty: data.RequiredQty,
      BDLineGuid: "",
    };
    Cloud.$post(`im/resendappenquirysync`, {
      IQGUID: data.IQGUID,
    }).then((res: string) => {
      if (res) {
        Cloud.$Toast.show("发送成功", { icon: "tips_right" });
        HttpParams.BDLineGuid = res;
        this.setState({ SendAgain: false });
        //再次发送成功调第二个接口
        Cloud.$cnh("SendEnquiry", [HttpParams])
          .then(data => {
            if (!data.Data) {
              Cloud.$addLog(
                "InquiryListItem.js-sendQuotation-code-0",
                JSON.stringify(data),
                JSON.stringify(HttpParams)
              );
            }
          })
          .catch(error => {
            Cloud.$addLog("InquiryListItem.js-ResendInquiry", error.message);
          });
      } else {
        Cloud.$Toast.show("发送失败", { icon: "tips_warning" });
        Cloud.$addLog(
          "InquiryListItem.js-ResendInquiry-im/resendappenquirysync",
          res
        );
      }
      //
    });
  };
  sendQuotation = (SupplierStatus: number) => {
    const { QuotedPrice } = this.state;
    const { data } = this.props;
    const { Qty, Price } = QuotedPrice;
    if (!Qty && SupplierStatus === 2) {
      Cloud.$Toast.show("数量必填", { icon: "tips_warning" });
      return this.QuotationNumInput && this.QuotationNumInput.focus();
    }
    if (!Price && SupplierStatus === 2) {
      Cloud.$Toast.show("报价必填", { icon: "tips_warning" });
      return this.QuotationInput && this.QuotationInput.focus();
    }
    const HttpParams = [
      {
        SupplierStatus,
        IsNeedInvoice: data.IsNeedInvoice, // 是否需要发票
        TaxRate: QuotedPrice.TaxRate, //  税点
        SupplierName: data.CompanyName, //  供应商名称
        SupplierID: data.CompanyID, // 供应商ID
        Model: data.Model, //型号
        Qty: Number(QuotedPrice.Qty), // 数量
        Price: Number(QuotedPrice.Price), // 单价
        Brand: data.Brand, // 品牌
        BDLineGuid: data.BDLineGUID, //  报价明细Guid
        IQGuid: data.IQGUID, // 询价GUID
        Quality: QuotedPrice.Quality, //  品质
        MakeYear: QuotedPrice.MakeYear, //  年份
        DataFrom: "imbomai",
        // SalesPrice: number, // 销售定价
        // InvQty: number, // 库存量
      },
    ];
    Cloud.$post(`im/sendquotedprice`, HttpParams).then(data => {
      if (data && data.length > 0) {
        const { sendquotedpriceSuccess } = this.props;
        if (SupplierStatus === 2) {
          Cloud.$Toast.show("报价成功！", { icon: "tips_right" });
          this.setState({ CurrentStatus: 2 });
          //报价成功调第二个接口
          Cloud.$cnh("SendQuotedPrice", HttpParams)
            .then(res => {
              if (res.Code === 0 && res.Data.length > 0) {
                Cloud.$addLog(
                  "InquiryListItem.js-sendQuotation-code-0",
                  JSON.stringify(res.Data),
                  JSON.stringify(HttpParams)
                );
              }
            })
            .catch(error => {
              Cloud.$addLog("InquiryListItem.js-sendQuotation", error.message);
            });

          const TimeID = setTimeout(() => {
            sendquotedpriceSuccess && sendquotedpriceSuccess("already");
            clearTimeout(TimeID);
          }, 500);
        } else if (SupplierStatus === 3) {
          Cloud.$Toast.show("已忽略该条报价！", { icon: "tips_warning" });
          const TimeID = setTimeout(() => {
            sendquotedpriceSuccess && sendquotedpriceSuccess("all");
            clearTimeout(TimeID);
          }, 500);
        }
      }
    });
  };
  onChangeText = (key: string, value: string | number) => {
    this.setState({
      QuotedPrice: Object.assign({}, this.state.QuotedPrice, { [key]: value }),
    });
  };
  QuotationNumInput: any;
  QuotationInput: any;
  render() {
    const { showMoreParams, CurrentStatus } = this.state;
    const { data, ActiveRoute } = this.props;

    let companyName = ""; // 公司名
    let BottomTitle = ""; // 报价标题
    let TimePhrase = ""; // 时间短语
    let QuotationQty = ""; // 报价数量
    let QuotationPrice = ""; // 报价

    let showInput = false; // 显示输入框
    let showText = false; // 显示已有数据

    let AlreadyOffer = true; // 供方已报价
    switch (ActiveRoute) {
      case "ReceivedInquiry":
        companyName = data.CompanyName;
        BottomTitle = "";
        TimePhrase = data.EnquiryPhrase;
        QuotationQty = data.Qty;
        QuotationPrice = data.Price;
        showInput = data.Status === 1 || CurrentStatus === 1;
        showText = data.Status === 2 && CurrentStatus === 2;
        AlreadyOffer = true;
        break;
      case "OutgoingInquiry":
        companyName = data.SupplierName;
        BottomTitle = data.SupplierStatus === 2 ? "供方报价" : "";
        TimePhrase = data.TimePhrase;
        QuotationQty = data.QuotationQty;
        QuotationPrice = data.QuotationPrice;
        showInput = false;
        showText = true;
        AlreadyOffer = data.SupplierStatus === 2;
        break;

      default:
        break;
    }

    return (
      <TouchableOpacity style={styles.ListRow} activeOpacity={1}>
        <View style={styles.timeView}>
          <View style={styles.timebox}>
            <Text style={styles.time}>{TimePhrase}</Text>
          </View>
        </View>

        <View style={styles.InquiryInfo}>
          <View style={styles.InquiryHeader}>
            <Text style={styles.InquiryTitle}>{companyName}</Text>
            {data.PhoneNumber && data.PhoneNumber.length > 0 && (
              <Text
                style={[styles.telIcon]}
                onPress={() => {
                  Linking.openURL(`tel:${data.PhoneNumber[0].Number}`);
                }}
              >
                <Icon name="phone_ic" size={20} />
              </Text>
            )}
          </View>

          <View style={styles.InquiryTop}>
            <View style={[styles.leftrightstyle, styles.paddingLeftRight8]}>
              <Text style={styles.binding}>型号</Text>
              <Text
                selectable={true}
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.value}
              >
                {data.Model}
              </Text>
            </View>

            <View style={[styles.leftrightstyle, styles.paddingLeftRight8]}>
              <Text style={styles.binding}>品牌</Text>
              <Text
                selectable={true}
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.value}
              >
                {data.Brand ? data.Brand : "--"}
              </Text>
            </View>

            <View style={[styles.leftrightstyle, styles.paddingLeftRight8]}>
              <Text style={styles.binding}>需求数量</Text>
              <Text
                selectable={true}
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.value}
              >
                {data.RequiredQty}
              </Text>
            </View>

            <View style={[styles.leftrightstyle, styles.paddingLeftRight8]}>
              <Text style={styles.binding}>是否打印发票</Text>
              <Text
                selectable={true}
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.value}
              >
                {data.IsNeedInvoice ? "是" : "否"}
              </Text>
            </View>

            <View style={[styles.leftrightstyle, styles.paddingLeftRight8]}>
              <Text style={styles.binding}>备注</Text>
              <Text selectable={true} style={styles.value}>
                {data.Remark ? data.Remark : "--"}
              </Text>
            </View>
            {/* 装饰、虚线 */}
            <View style={[styles.edges, styles.edgesLeft]} />
            <View style={[styles.edges, styles.edgesRight]} />
            <DashLine
              width={WindowWidth - PaddingLR * 2}
              backgroundColor="#CBCED2"
            />
          </View>

          <View style={styles.InquiryBottom}>
            {/* 装饰 */}
            <View style={[styles.edges, styles.edgesLeftBottom]} />
            <View style={[styles.edges, styles.edgesRightBottom]} />

            {/* Bottom */}
            {!!BottomTitle && (
              <View>
                <Text
                  style={{
                    color: "#333",
                    lineHeight: 22,
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {BottomTitle}
                </Text>
              </View>
            )}

            {AlreadyOffer && (
              <View style={[styles.leftrightstyle, styles.paddingLeftRight8]}>
                <View style={[styles.leftrightstyle, styles.formTitle]}>
                  <Text style={styles.binding}>
                    报价数量 &nbsp;
                    {!!showInput && <Text style={styles.colorRed}>*</Text>}
                  </Text>
                </View>
                {!!showInput && (
                  <View
                    style={[
                      styles.flex1,
                      styles.inputBox,
                      styles.paddingTopBottom4,
                    ]}
                  >
                    <ZnlInput
                      placeholder="请输入报价数量"
                      style={{ height: 36 }}
                      inputStyle={{ fontSize: 14 }}
                      keyboardType={"numeric"}
                      ref={ref => (this.QuotationNumInput = ref)}
                      onChangeText={value => this.onChangeText("Qty", value)}
                      defaultValue={
                        data.RequiredQty ? data.RequiredQty.toString() : ""
                      }
                    />
                  </View>
                )}
                {!!showText && (
                  <Text
                    selectable={true}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.value}
                  >
                    {QuotationQty ? QuotationQty : "--"}
                  </Text>
                )}
              </View>
            )}

            {AlreadyOffer && (
              <View style={[styles.leftrightstyle, styles.paddingLeftRight8]}>
                <View style={[styles.leftrightstyle, styles.formTitle]}>
                  <Text style={styles.binding}>
                    报价 &nbsp;
                    {!!showInput && <Text style={styles.colorRed}>*</Text>}
                  </Text>
                </View>
                {!!showInput && (
                  <View
                    style={[
                      styles.flex1,
                      styles.inputBox,
                      styles.paddingTopBottom4,
                    ]}
                  >
                    <ZnlInput
                      placeholder="请输入报价"
                      style={{ height: 36 }}
                      inputStyle={{ fontSize: 14 }}
                      keyboardType={"numeric"}
                      ref={ref => {
                        this.QuotationInput = ref;
                      }}
                      onChangeText={value => this.onChangeText("Price", value)}
                    />
                  </View>
                )}
                {!!showText && (
                  <Text
                    selectable={true}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.value}
                  >
                    {QuotationPrice ? QuotationPrice : "--"}
                  </Text>
                )}
              </View>
            )}
          </View>

          {!showMoreParams && (
            <TouchableOpacity
              style={styles.moreParams}
              activeOpacity={0.8}
              onPress={() => {
                this.setState({ showMoreParams: true });
              }}
            >
              <Text style={styles.moreParamsText}>
                更多参数 <Icon name="drop_down" size={12} />
              </Text>
            </TouchableOpacity>
          )}

          {showMoreParams && AlreadyOffer && (
            <View style={[styles.leftrightstyle, styles.paddingLeftRight8]}>
              <View style={[styles.leftrightstyle, styles.formTitle]}>
                <Text style={styles.binding}>税点</Text>
              </View>
              {!!showInput && (
                <View
                  style={[
                    styles.flex1,
                    styles.inputBox,
                    styles.paddingTopBottom4,
                  ]}
                >
                  <RNPicker
                    data={TaxPointData}
                    onPickerConfirm={this.onPickerConfirm}
                    key="point"
                  />
                </View>
              )}
              {!!showText && (
                <Text
                  selectable={true}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.value}
                >
                  {data.TaxRate ? data.TaxRate : "--"}
                </Text>
              )}
            </View>
          )}

          {showMoreParams && AlreadyOffer && (
            <View style={[styles.leftrightstyle, styles.paddingLeftRight8]}>
              <View style={[styles.leftrightstyle, styles.formTitle]}>
                <Text style={styles.binding}>年份</Text>
              </View>
              {!!showInput && (
                <View
                  style={[
                    styles.flex1,
                    styles.inputBox,
                    styles.paddingTopBottom4,
                  ]}
                >
                  <ZnlInput
                    placeholder="请输入年份"
                    style={{ height: 36 }}
                    inputStyle={{ fontSize: 14 }}
                    keyboardType={
                      Platform.OS === "ios"
                        ? "numbers-and-punctuation"
                        : "numeric"
                    }
                    onChangeText={value => this.onChangeText("MakeYear", value)}
                  />
                </View>
              )}
              {!!showText && (
                <Text
                  selectable={true}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.value}
                >
                  {data.MakeYear ? data.MakeYear : "--"}
                </Text>
              )}
            </View>
          )}

          {showMoreParams && AlreadyOffer && (
            <View style={[styles.leftrightstyle, styles.paddingLeftRight8]}>
              <View style={[styles.leftrightstyle, styles.formTitle]}>
                <Text style={styles.binding}>品质</Text>
              </View>
              {!!showInput && (
                <View
                  style={[
                    styles.flex1,
                    styles.inputBox,
                    styles.paddingTopBottom4,
                  ]}
                >
                  <RNPicker
                    data={TheQualityOfData}
                    onPickerConfirm={this.onPickerConfirm1}
                    key="quality"
                  />
                </View>
              )}
              {!!showText && (
                <Text
                  selectable={true}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.value}
                >
                  {data.Quality ? data.Quality : "--"}
                </Text>
              )}
            </View>
          )}
          {!!showInput && ActiveRoute === "ReceivedInquiry" && (
            <View style={styles.sendBtnView}>
              <View style={[styles.sendBtnBox, styles.sendBtnViewLeft]}>
                <TouchableOpacity
                  style={[styles.sendBtnCom, styles.sendBtnLeft]}
                  activeOpacity={0.8}
                  onPress={this.IgnoreHandler}
                >
                  <Text style={[styles.sendBtnText, styles.sendBtnTextLeft]}>
                    忽略
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.sendBtnBox, styles.sendBtnViewRight]}>
                <TouchableOpacity
                  style={[styles.sendBtnCom, styles.sendBtnRight]}
                  activeOpacity={0.8}
                  onPress={() => {
                    this.sendQuotation(2);
                  }}
                >
                  <Text style={[styles.sendBtnText, styles.sendBtnTextRight]}>
                    发送报价
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {!AlreadyOffer && (
            <View style={styles.sendBtnView}>
              <View style={[styles.sendBtnBox, styles.sendBtnViewLeft]}>
                <Text style={styles.sendBtnTitleText}>等待供方报价</Text>
              </View>
              <View style={[styles.sendBtnBox, styles.sendBtnViewRight]}>
                {data.EnquiryCnt <= 1 && this.state.SendAgain && (
                  <TouchableOpacity
                    style={[styles.sendBtnCom, styles.sendBtnAgain]}
                    activeOpacity={0.8}
                    onPress={this.ResendInquiry}
                  >
                    <Text style={[styles.sendBtnText, styles.sendBtnTextAgain]}>
                      再次发送
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

          {!!showText && ActiveRoute === "ReceivedInquiry" && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.setState({ CurrentStatus: 1 });
              }}
              style={{ borderTopWidth: 1, borderColor: "#f0f0f0" }}
            >
              <Text style={[styles.sendBtnText, styles.sendBtnTextLeft]}>
                重新报价
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  componentWillMount() {
    let showMoreParams = false;
    this.state.QuotedPrice.Qty = this.props.data.RequiredQty;
    switch (this.props.ActiveRoute) {
      case "ReceivedInquiry":
        if (this.props.data.Status === 2) {
          showMoreParams = true;
        }
        break;
      case "OutgoingInquiry":
        showMoreParams = true;
        break;
      default:
        break;
    }

    this.setState({
      CurrentStatus: this.props.data.Status,
      showMoreParams: showMoreParams,
    });
  }
}

const styles = StyleSheet.create({
  colorRed: {
    color: "red",
  },
  flex1: {
    flex: 1,
  },
  ListRow: {
    marginBottom: 10,
  },
  timeView: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  timebox: {
    // width: 48,
    paddingLeft: 2,
    paddingRight: 2,
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 2,
  },
  time: {
    fontSize: 14,
    color: "#fff",
    lineHeight: 20,
    textAlign: "center",
  },
  InquiryInfo: {
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  InquiryHeader: {
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  InquiryTitle: {
    color: "#000",
    fontSize: 16,
  },
  telIcon: {
    color: "#ee7700",
  },
  InquiryTop: {
    paddingBottom: 10,
  },
  leftrightstyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paddingLeftRight8: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  paddingTopBottom4: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  binding: {
    fontSize: 14,
    color: "#333",
    lineHeight: 24,
  },
  value: {
    color: "#666",
    fontSize: 14,
    lineHeight: 24,
    maxWidth: 220,
  },
  edges: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: "absolute",

    backgroundColor: "#f5f5f5",
  },
  edgesLeft: { left: -15, bottom: -15 },
  edgesRight: { right: -15, bottom: -15 },
  edgesLeftBottom: {
    left: -15,
    top: -15,
  },
  edgesRightBottom: {
    right: -15,
    top: -15,
  },
  InquiryBottom: {
    paddingTop: 10,
  },
  formTitle: {
    width: 75,
  },
  inputBox: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  moreParams: {
    height: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  moreParamsText: {
    color: "#999",
    fontSize: 14,
  },
  sendBtnView: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    marginTop: 14,
  },
  sendBtnBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnViewLeft: {},
  sendBtnViewRight: {},
  sendBtnCom: {
    width: 96,
    height: 40,
    borderRadius: 4,
  },
  sendBtnLeft: {},
  sendBtnRight: {
    backgroundColor: "#ee7700",
  },
  sendBtnAgain: {
    height: 30,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  sendBtnTitleText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  sendBtnText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 40,
  },
  sendBtnTextLeft: {
    color: "#aaa",
  },
  sendBtnTextRight: {
    color: "#fff",
  },
  sendBtnTextAgain: {
    color: "#666",
    lineHeight: 28,
  },
});

export default InquiryListItem;
