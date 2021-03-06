/* @flow */
import React, { Component } from "react";
import Modal from "react-native-modal";
import { View, StyleSheet, Text, TextInput, ScrollView } from "react-native";
import DatePicker from "react-native-datepicker";
import { ISIOS } from "@src/utils/system";
import { ZnlButton } from "@components";

type Props = {
  title: string,
  renderBody: Function,
};
class Pane extends Component<Props> {
  render() {
    const { title, renderBody } = this.props;
    return (
      <View style={styles.pane}>
        <View style={styles.paneTitleView}>
          <Text style={styles.paneTitle}>{title}</Text>
        </View>
        <View>{renderBody && renderBody()}</View>
      </View>
    );
  }
}

type FilterScreenProps = {
  isVisible: boolean,
  closeModal: Function,
  confirmHandler: Function,
  StkWarehouse: Array<any>,
  name: string,
};
type FilterScreenState = {
  InvType: string,
  InvPosition: string,
  Brand: string,
  MakeYear: string,
  StorageName: string,
  QuotedTimeByStart: string,
  QuotedTimeByEnd: string,
  SupplierName: string, // 供应商名称
  CustomerName: string, // 客户名称
};
class FilterScreen extends Component<FilterScreenProps, FilterScreenState> {
  constructor(props: FilterScreenProps) {
    super(props);
    this.state = {
      InvType: "",
      InvPosition: "",
      Brand: "",
      MakeYear: "",
      StorageName: "",
      QuotedTimeByStart: "",
      QuotedTimeByEnd: "",
      SupplierName: "",
      CustomerName: "",
    };
  }
  // 库存类型
  _renderBodyStockType = () => {
    const { InvType } = this.state;
    return (
      <View style={styles.StockTypeBody}>
        <Text
          style={[
            styles.StockTypeText,
            InvType === "自有" ? styles.activeText : null,
          ]}
          onPress={() => {
            this.setState({ InvType: InvType === "自有" ? "" : "自有" });
          }}
        >
          自有
        </Text>
        <Text
          style={[
            styles.StockTypeText,
            InvType === "备货" ? styles.activeText : null,
          ]}
          onPress={() => {
            this.setState({ InvType: InvType === "备货" ? "" : "备货" });
          }}
        >
          备货
        </Text>
        <Text
          style={[
            styles.StockTypeText,
            InvType === "补货" ? styles.activeText : null,
          ]}
          onPress={() => {
            this.setState({ InvType: InvType === "补货" ? "" : "补货" });
          }}
        >
          补货
        </Text>
        <Text
          style={[
            styles.StockTypeText,
            InvType === "供应商" ? styles.activeText : null,
          ]}
          onPress={() => {
            this.setState({ InvType: InvType === "供应商" ? "" : "供应商" });
          }}
        >
          供应商
        </Text>
      </View>
    );
  };
  // 仓库
  _renderBodyWarehouse = () => {
    const { StkWarehouse } = this.props;
    const { InvPosition } = this.state;
    const StkWarehouseVoiw = StkWarehouse.map(item => {
      return (
        <Text
          style={[
            styles.StockTypeText,
            InvPosition === item.WarehouseName ? styles.activeText : null,
          ]}
          key={item.WarehouseId}
          onPress={() => {
            this.setState({
              InvPosition:
                InvPosition === item.WarehouseName ? "" : item.WarehouseName,
            });
          }}
        >
          {item.WarehouseName}
        </Text>
      );
    });
    return <View style={styles.StockTypeBody}>{StkWarehouseVoiw}</View>;
  };
  // 品牌 批号 位置
  _renderBodyInput = name => {
    let nameValue = "";
    switch (name) {
      case "Brand":
        nameValue = "品牌";
        break;
      case "MakeYear":
        nameValue = "批号";
        break;
      case "StorageName":
        nameValue = "位置";
        break;
      case "StorageName":
        nameValue = "供应商名称";
        break;
      case "CustomerName":
        nameValue = "客户名称";
        break;
      default:
        break;
    }
    return (
      <View style={styles.bodybox}>
        <TextInput
          style={styles.inputStyle}
          placeholder={`请输入${nameValue}`}
          defaultValue={this.state[name]}
          onChangeText={value => this.setState({ [name]: value })}
        />
      </View>
    );
  };
  // 报价时间
  _renderBodyQuotedTime = () => {
    return (
      <View style={styles.DatePickerBox}>
        <DatePicker
          style={styles.DatePicker}
          customStyles={{ dateInput: { height: 32, padding: 0 } }}
          date={this.state.QuotedTimeByStart}
          mode="date"
          placeholder="起始时间"
          format="YYYY-MM-DD"
          locale="zh-cn"
          confirmBtnText="确定"
          cancelBtnText="取消"
          showIcon={false}
          androidMode="spinner"
          onDateChange={date => {
            this.setState({ QuotedTimeByStart: date });
          }}
        />
        <Text>-</Text>
        <DatePicker
          style={styles.DatePicker}
          customStyles={{ dateInput: { height: 32, padding: 0 } }}
          date={this.state.QuotedTimeByEnd}
          mode="date"
          placeholder="结束时间"
          format="YYYY-MM-DD"
          locale="zh-cn"
          confirmBtnText="确定"
          cancelBtnText="取消"
          showIcon={false}
          androidMode="spinner"
          onDateChange={date => {
            this.setState({ QuotedTimeByEnd: date });
          }}
        />
      </View>
    );
  };
  resetHandler = () => {
    const { confirmHandler, closeModal } = this.props;
    this.setState(
      {
        InvType: "",
        InvPosition: "",
        Brand: "",
        MakeYear: "",
        StorageName: "",
        QuotedTimeByStart: "",
        QuotedTimeByEnd: "",
        SupplierName: "", // 供应商名称
        CustomerName: "", // 客户名称
      },
      () => {
        confirmHandler ? confirmHandler(this.state) : closeModal();
      }
    );
  };
  render() {
    const { isVisible, closeModal, confirmHandler, name } = this.props;
    return (
      <Modal
        isVisible={isVisible}
        useNativeDriver={true}
        onBackdropPress={closeModal}
        onSwipe={closeModal}
        style={styles.ComprehensiveRankingContainer}
        backdropOpacity={0.3}
        animationInTiming={100}
        animationIn="slideInRight"
        animationOut="slideOutRight"
      >
        <View style={styles.ComprehensiveRankingBox}>
          <ScrollView style={styles.ComprehensiveRankingScollView}>
            {["StkStock"].indexOf(name) > -1 && (
              <Pane title="库存类型" renderBody={this._renderBodyStockType} />
            )}
            {["StkStock"].indexOf(name) > -1 && (
              <Pane title="仓库" renderBody={this._renderBodyWarehouse} />
            )}
            {["StkInRecord", "StkInquireRecord"].indexOf(name) > -1 && (
              <Pane
                title="供应商名称"
                renderBody={() => {
                  return this._renderBodyInput("SupplierName");
                }}
              />
            )}
            {["StkInRecord", "StkOutByModel", "HisOfferPrice"].indexOf(name) >
              -1 && (
              <Pane
                title="客户名称"
                renderBody={() => {
                  return this._renderBodyInput("CustomerName");
                }}
              />
            )}
            {[
              "StkStock",
              "StkInRecord",
              "StkOutByModel",
              "StkInquireRecord",
              "HisOfferPrice",
            ].indexOf(name) > -1 && (
              <Pane
                title="品牌"
                renderBody={() => {
                  return this._renderBodyInput("Brand");
                }}
              />
            )}
            {[
              "StkStock",
              "StkInRecord",
              "StkOutByModel",
              "StkInquireRecord",
              "HisOfferPrice",
            ].indexOf(name) > -1 && (
              <Pane
                title="批号"
                renderBody={() => {
                  return this._renderBodyInput("MakeYear");
                }}
              />
            )}
            {["StkStock"].indexOf(name) > -1 && (
              <Pane
                title="位置"
                renderBody={() => {
                  return this._renderBodyInput("StorageName");
                }}
              />
            )}
            {[
              "StkStock",
              "StkInRecord",
              "StkOutByModel",
              "HisOfferPrice",
            ].indexOf(name) > -1 && (
              <Pane title="报价时间" renderBody={this._renderBodyQuotedTime} />
            )}
            <View style={styles.footer}>
              <ZnlButton
                onPress={() => {
                  this.resetHandler();
                }}
                style={styles.footerButton}
                textStyle={{ fontSize: 14 }}
              >
                重置
              </ZnlButton>
              <ZnlButton
                type="main"
                onPress={() => {
                  confirmHandler && confirmHandler(this.state);
                }}
                style={styles.footerButton}
                textStyle={{ fontSize: 14 }}
              >
                确定
              </ZnlButton>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  ComprehensiveRankingContainer: {
    margin: 0,
  },
  ComprehensiveRankingBox: {
    backgroundColor: "#fff",
    width: 260,
    height: "100%",
    position: "absolute",
    right: 0,
    paddingTop: ISIOS ? 20 : 0,
  },
  ComprehensiveRankingScollView: {
    paddingBottom: 100,
  },
  pane: {
    paddingLeft: 10,
  },
  paneTitleView: {
    // height: 48,
    flexDirection: "row",
    alignItems: "center",
  },
  paneTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    lineHeight: 17,
    paddingTop: 12,
    paddingBottom: 8,
  },
  footer: {
    marginTop: 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  footerButton: {
    width: 100,
    height: 32,
    borderRadius: 2,
  },
  // pane body
  StockTypeBody: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  StockTypeText: {
    backgroundColor: "#F0F0F0",
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 5,
    lineHeight: 22,
    marginBottom: 5,
    color: "#999",
  },
  activeText: {
    color: "#fff",
    backgroundColor: "#ed9e00",
  },
  bodybox: {
    padding: 0,
  },
  inputStyle: {
    width: 220,
    height: 32,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    padding: 0,
    paddingLeft: 4,
  },
  DatePickerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 32,
  },
  DatePicker: {
    width: 88,
    height: 32,
    padding: 0,
  },
});

export default FilterScreen;
