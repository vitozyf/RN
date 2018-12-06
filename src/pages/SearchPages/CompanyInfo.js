/**
 * 公司详情
 * @flow
 */
import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Linking,
  Image,
  TouchableOpacity,
} from "react-native";
import { ZnlHeader, DashLine } from "@components";
import Pane from "./Pane";
import SwiperModal from "./Swiper";

const WindowWidth = Dimensions.get("window").width;
const PaddingLR = 14;
type Props = {
  navigation: INavigation,
};
type State = {
  isVisible: boolean,
  index: number,
  CompanyInfo: Object | null,
  listRow: Object,
};
class CompanyInfoPage extends Component<Props, State> {
  static navigationOptions = ({ navigation }: any) => {
    console.log(navigation.getParam());
    return {
      header: (
        <ZnlHeader
          onPressIcon={() => {
            navigation.goBack();
          }}
        />
      ),
    };
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisible: false,
      index: 0,
      CompanyInfo: null,
      listRow: {},
    };
  }
  getData = () => {
    const listRow = this.props.navigation.getParam("listRow");
    this.setState({ listRow });
    const Brand = listRow.Brand;
    const Model = listRow.PartNo;
    const companyId = listRow.Supplier.Id;
    const companyName = listRow.SupplierName;

    if ((companyId || companyName) && !listRow.IsInvisibleSupplier) {
      Cloud.$post("companycard/appget/company", {
        Brand,
        Model,
        companyId,
        companyName,
      }).then(CompanyInfo => {
        if (!CompanyInfo) {
          this.props.navigation.goBack();
        }
        this.setState({ CompanyInfo });
      });
    }
  };
  componentWillMount() {
    this.getData();
  }
  render() {
    const { CompanyInfo, listRow } = this.state;
    if (!CompanyInfo) {
      return (
        <View style={styles.noinfo}>
          <Text>暂无公司信息</Text>
        </View>
      );
    }
    // testdata
    // CompanyInfo.Telephone =
    //   "0755-61329358 蔡小姐,0755-23947880 只做进口原装现货,";
    // CompanyInfo.Name = "深圳市正能量网络技术有限公司";
    // CompanyInfo.Address = "深圳市福田区中航路新亚洲电子城1期5楼523室";
    // CompanyInfo.Mobile = "13729093675";
    // CompanyInfo.AuthenticationInfo = [
    //   {
    //     Description: "经营场所实景照片 前台",
    //     Url:
    //       "//bom-ai-read.oss-cn-shenzhen.aliyuncs.com/makesureFile/h3Zzm2_1530156784919.jpg?x-oss-process=image/resize,m_mfit,h_300,w_300/quality,Q_80",
    //   },
    //   {
    //     Description: "经营场所实景照片 内景",
    //     Url:
    //       "//bom-ai-read.oss-cn-shenzhen.aliyuncs.com/makesureFile/YeFNdQ_1530156813319.jpg?x-oss-process=image/resize,m_mfit,h_300,w_300/quality,Q_80",
    //   },
    // ];
    // CompanyInfo.Labellist = [
    //   {
    //     Id: 0,
    //     IsMine: true,
    //     Label: "置顶",
    //     Qty: 10,
    //   },
    //   {
    //     Id: 0,
    //     IsMine: false,
    //     Label: "原装",
    //     Qty: 20,
    //   },
    //   {
    //     Id: 0,
    //     IsMine: false,
    //     Label: "现货",
    //     Qty: 28,
    //   },
    // ];
    // CompanyInfo.spotChecklist = {};
    // CompanyInfo.spotChecklist.SpotCheckGroup = [
    //   {
    //     SpotCheckDate: "2018年09月29日",
    //     WareHouse: "深圳",
    //     listSpotCheckList: [
    //       {
    //         Brand: "VISHAY",
    //         Model: "SMBJ33CA-E3/52",
    //         Num: 20302,
    //         Reson: null,
    //         Result: true,
    //       },
    //       {
    //         Brand: "VISHAY",
    //         Model: "SMBJ33CA",
    //         Num: 2032,
    //         Reson: null,
    //         Result: false,
    //       },
    //     ],
    //   },
    //   {
    //     SpotCheckDate: "2018年09月29日",
    //     WareHouse: "深圳",
    //     listSpotCheckList: [
    //       {
    //         Brand: "VISHAY",
    //         Model: "SMBJ33CA-E3/52",
    //         Num: 20302,
    //         Reson: null,
    //         Result: true,
    //       },
    //       {
    //         Brand: "VISHAY",
    //         Model: "SMBJ33CA",
    //         Num: 2032,
    //         Reson: null,
    //         Result: true,
    //       },
    //     ],
    //   },
    // ];
    // 联系人
    const Tels = CompanyInfo.Telephone ? CompanyInfo.Telephone.split(",") : [];
    const ContactEle = Tels.map((item, index) => {
      if (item) {
        return (
          <Text key={index} style={[styles.lineHeight30, styles.companyInfo]}>
            <Text
              style={[styles.telText]}
              onPress={() => {
                Linking.openURL(`tel:${item.split(" ")[0]}`);
              }}
            >
              {item.split(" ")[0]}
            </Text>
            <Text>&nbsp;</Text>
            {item.split(" ")[1]}
          </Text>
        );
      }
      return null;
    });
    // 标签
    const Labellist = CompanyInfo.Labellist || [];
    const LabelEle = Labellist.map((item, index) => {
      return (
        <Text
          style={[styles.label, item.IsMine ? styles.IsMine : null]}
          key={index}
        >
          {item.Label}({item.Qty})
        </Text>
      );
    });
    // 认证资料
    const AuthenticationInfo = CompanyInfo.AuthenticationInfo || [];
    const AuthenticationInfoEle = AuthenticationInfo.map((item, index) => {
      const ImageUrl =
        item.Url.indexOf("http:") > -1 || item.Url.indexOf("https:") > -1
          ? item.Url
          : `https:${item.Url}`;
      return (
        <TouchableOpacity
          style={styles.AuthenticationInfoItem}
          key={index}
          activeOpacity={1}
          onPress={() => {
            this.setState({ isVisible: true, index: index });
          }}
        >
          <View>
            <Text style={styles.Description}>{item.Description}</Text>
          </View>
          <Image
            style={styles.AuthenticationInfoImg}
            source={{
              uri: ImageUrl,
            }}
          />
        </TouchableOpacity>
      );
    });
    // 抽查记录
    const SpotCheckGroup = CompanyInfo.spotChecklist
      ? CompanyInfo.spotChecklist.SpotCheckGroup
        ? CompanyInfo.spotChecklist.SpotCheckGroup
        : []
      : [];
    const SpotCheckGroupEle = SpotCheckGroup.map((item, index) => {
      const listSpotCheckList = item.listSpotCheckList || [];
      return (
        <View key={`SpotCheckGroup${index}`} style={styles.SpotCheckGroup}>
          <View style={styles.SpotCheckGroupTitleBox}>
            <Text style={styles.SpotCheckGroupTitle}>{item.SpotCheckDate}</Text>
            <Text style={styles.SpotCheckGroupTitle}>{item.WareHouse}</Text>
          </View>
          <View>
            {listSpotCheckList.map((data, j) => {
              return (
                <View
                  key={`listSpotCheckList${j}`}
                  style={styles.listSpotCheckList}
                >
                  <View style={styles.listSpotCheckListLeft}>
                    <View
                      style={[
                        styles.listSpotCheckListLineMini,
                        !data.Result ? styles.pointNot : null,
                        j === 0 ? { backgroundColor: "transparent" } : null,
                      ]}
                    />
                    <View style={styles.listSpotCheckListPointBox}>
                      <View
                        style={[
                          styles.point,
                          styles.listSpotCheckListPoint,
                          !data.Result ? styles.pointNot : null,
                        ]}
                      />
                    </View>
                    <View
                      style={[
                        styles.listSpotCheckListLine,
                        !data.Result ? styles.pointNot : null,
                      ]}
                    />
                  </View>
                  <View style={styles.listSpotCheckListRight}>
                    <Text style={styles.listSpotCheckListTitle}>
                      型号：{data.Model}
                    </Text>
                    <Text style={styles.listSpotCheckListRow}>
                      品牌 / 数量： {data.Brand} / {data.Num}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      );
    });
    const renderHeaderRight = () => {
      return (
        <View style={styles.headerRight}>
          <View style={styles.rightRow}>
            <View style={[styles.point]} />
            <Text style={[styles.results]}>合格</Text>
          </View>
          <View style={styles.rightRow}>
            <View style={[styles.point, styles.pointNot]} />
            <Text style={[styles.results, styles.resultsNot]}>不合格</Text>
          </View>
        </View>
      );
    };

    const { isVisible, index } = this.state;
    return (
      <ScrollView style={styles.container}>
        <SwiperModal
          isVisible={isVisible}
          closeModal={() => {
            this.setState({ isVisible: false });
          }}
          AuthenticationInfo={AuthenticationInfo}
          index={index}
        />
        {/* header */}
        <View style={styles.header}>
          <View style={[styles.titleTop, styles.title]}>
            <Text style={styles.titleText}>{listRow.PartNo}</Text>
            <Text>
              <Text>{listRow.QuantityPhrase}</Text>
              <Text>&nbsp;&nbsp;</Text>
              <Text style={[styles.colorMain, styles.fontBold]}>
                {listRow.UnitPriceText}
              </Text>
            </Text>
          </View>
          <View style={[styles.titleBottom, styles.title]}>
            <Text style={[styles.textCommon]}>{listRow.Brand}</Text>
            <Text style={[styles.textCommon, styles.line]}>|</Text>
            <Text style={[styles.textCommon]}>{listRow.Package}</Text>
            <Text style={[styles.textCommon, styles.line]}>|</Text>
            <Text style={[styles.textCommon]}>{listRow.MakeAges}</Text>
            <DashLine width={WindowWidth - PaddingLR * 2} />
          </View>
          <View style={styles.offerBox}>
            <View>
              <Text style={styles.lineHeight30}>
                我的备注{" "}
                {CompanyInfo.tradeInfo
                  ? CompanyInfo.tradeInfo.CommentContent
                  : ""}
              </Text>
            </View>
            <View style={styles.offer}>
              <Text style={styles.lineHeight30}>
                <Text>
                  最近一次报价{" "}
                  {CompanyInfo.tradeInfo
                    ? CompanyInfo.tradeInfo.LastQuotePrice
                      ? CompanyInfo.tradeInfo.LastQuotePrice
                      : "-"
                    : "-"}
                </Text>
              </Text>
              <Text style={styles.lineHeight30}>&nbsp;;&nbsp;&nbsp;&nbsp;</Text>
              <Text style={styles.lineHeight30}>
                <Text>历史报价共</Text>
                {CompanyInfo.tradeInfo
                  ? CompanyInfo.tradeInfo.QuoteSumCount
                  : 0}
                次
              </Text>
            </View>
          </View>
        </View>
        <View />
        {/* company */}
        <Pane>
          <View style={styles.company}>
            <View style={styles.companyLeft}>
              <View>
                <Text style={styles.companyTitle}>{CompanyInfo.Name}</Text>
              </View>
              <View style={styles.companyInfoBox}>
                <Text style={[styles.lineHeight30, styles.companyInfoTitle]}>
                  电话：
                </Text>
                <View>{ContactEle}</View>
              </View>
              {CompanyInfo.Mobile && (
                <View style={styles.companyInfoBox}>
                  <Text style={[styles.lineHeight30, styles.companyInfoTitle]}>
                    手机：
                  </Text>
                  <Text
                    style={[
                      styles.lineHeight30,
                      styles.companyInfo,
                      styles.telText,
                    ]}
                    onPress={() => {
                      Linking.openURL(`tel:${CompanyInfo.Mobile}`);
                    }}
                  >
                    {CompanyInfo.Mobile}
                  </Text>
                </View>
              )}
              <View style={styles.companyInfoBox}>
                <Text style={[styles.lineHeight30, styles.companyInfoTitle]}>
                  地址：
                </Text>
                <Text style={[styles.lineHeight30, styles.companyInfo]}>
                  {CompanyInfo.Address}
                </Text>
              </View>
            </View>
            <View style={styles.companyRight} />
          </View>
        </Pane>
        {Labellist.length > 0 && (
          <Pane title="TA的标签">
            <View style={styles.labelBox}>{LabelEle}</View>
          </Pane>
        )}
        {AuthenticationInfo.length > 0 && (
          <Pane title="认证资料">
            <View style={styles.labelBox}>
              <ScrollView horizontal={true}>{AuthenticationInfoEle}</ScrollView>
            </View>
          </Pane>
        )}
        {/* <Pane title="经营分析">
          <View>
            <Text>经营分析</Text>
          </View>
        </Pane> */}
        {SpotCheckGroup.length > 0 && (
          <Pane title="抽查记录" renderHeaderRight={renderHeaderRight}>
            {SpotCheckGroupEle}
          </Pane>
        )}
      </ScrollView>
    );
  }
}
export default CompanyInfoPage;

const styles = StyleSheet.create({
  // common
  colorMain: {
    color: "#ee7700",
  },
  line: {
    color: "#ccc",
  },
  fontBold: {
    fontWeight: "bold",
  },
  lineHeight30: {
    lineHeight: 30,
  },
  telText: {
    color: "#2288CC",
  },
  // page
  container: {
    backgroundColor: "rgba(248,248,248,0.82)",
  },
  // header
  header: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  title: {
    paddingLeft: PaddingLR,
    paddingRight: PaddingLR,
    flexDirection: "row",
  },
  titleTop: {
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 30,
  },
  titleBottom: {
    justifyContent: "flex-start",
  },
  textCommon: {
    lineHeight: 30,
    marginRight: 10,
  },
  // 报价
  offerBox: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  offer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  // 公司
  company: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
  },
  companyLeft: {
    flex: 1,
  },
  companyRight: {
    width: 100,
  },
  companyTitle: {
    lineHeight: 60,
    fontSize: 16,
    fontWeight: "bold",
  },
  companyInfoBox: {
    flexDirection: "row",
  },
  companyInfoTitle: {
    width: 50,
  },
  companyInfo: {
    flex: 1,
  },
  // 标签
  labelBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 10,
    paddingLeft: 20,
  },
  label: {
    lineHeight: 26,
    paddingLeft: 6,
    paddingRight: 6,
    color: "#0f9321",
    borderWidth: 1,
    borderColor: "#0f9321",
    marginRight: 6,
    marginBottom: 5,
  },
  IsMine: {
    color: "#ee7700",
    borderWidth: 1,
    borderColor: "#ee7700",
  },
  // 认证资料
  AuthenticationInfoItem: {
    marginRight: 10,
  },
  Description: {
    lineHeight: 30,
    fontWeight: "bold",
  },
  AuthenticationInfoImg: {
    width: 320,
    height: 240,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
  },
  rightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
  },
  point: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1bb934",
    marginRight: 5,
  },
  results: {
    color: "#1bb934",
  },
  pointNot: {
    backgroundColor: "#ee2929",
  },
  resultsNot: {
    color: "#ee2929",
  },
  // 抽查记录
  SpotCheckGroup: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  SpotCheckGroupTitleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SpotCheckGroupTitle: {
    color: "#999",
    lineHeight: 30,
  },
  listSpotCheckList: {
    flexDirection: "row",
    alignItems: "center",
  },
  listSpotCheckListLeft: {
    width: 20,
    alignItems: "center",
    height: 66,
  },
  listSpotCheckListPointBox: {
    // paddingTop: 10,
  },
  listSpotCheckListPoint: {
    marginRight: 0,
  },
  listSpotCheckListLineMini: {
    width: 1,
    height: 10,
    backgroundColor: "#1bb934",
  },
  listSpotCheckListLine: {
    width: 1,
    flex: 1,
    backgroundColor: "#1bb934",
  },
  listSpotCheckListRight: {
    flex: 1,
  },
  listSpotCheckListTitle: {
    lineHeight: 36,
    fontWeight: "bold",
  },
  listSpotCheckListRow: {
    color: "#333",
    lineHeight: 30,
  },
  // 暂无公司信息
  noinfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
