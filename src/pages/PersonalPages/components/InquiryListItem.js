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
} from "react-native";
import Icon from "@components/Iconfont/CloudIcon";
import { DashLine, ZnlInput } from "@components";
const WindowWidth = Dimensions.get("window").width;
const PaddingLR = 20;

type Props = {
  id: string,
  title: string,
};
type State = {
  showMoreParams: boolean,
};
class InquiryListItem extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showMoreParams: false,
    };
  }
  render() {
    const { showMoreParams } = this.state;
    return (
      <TouchableOpacity style={styles.ListRow} activeOpacity={1}>
        <View style={styles.timeView}>
          <View style={styles.timebox}>
            <Text style={styles.time}>8:10</Text>
          </View>
        </View>

        <View style={styles.InquiryInfo}>
          <View style={styles.InquiryHeader}>
            <Text style={styles.InquiryTitle}>深圳市圣禾堂科技有限公司</Text>
            <Text
              style={[styles.telIcon]}
              onPress={() => {
                Linking.openURL("tel:400-699-2899");
              }}
            >
              <Icon name="phone_ic" size={20} />
            </Text>
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
                STW20NK50ZSTW20NK50ZSTW20NK50ZSTW20NK50ZSTW20NK50Z
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
                ST
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
                8000
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
                是
              </Text>
            </View>

            <View style={[styles.leftrightstyle, styles.paddingLeftRight8]}>
              <Text style={styles.binding}>备注</Text>
              <Text selectable={true} style={styles.value}>
                --
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

            <View
              style={[
                styles.leftrightstyle,
                styles.paddingLeftRight8,
                styles.paddingTopBottom4,
              ]}
            >
              <View style={[styles.leftrightstyle, styles.formTitle]}>
                <Text style={styles.binding}>报价数量</Text>
                <Text style={styles.colorRed}>*</Text>
              </View>
              <View style={[styles.flex1, styles.inputBox]}>
                <ZnlInput
                  placeholder="请输入报价数量"
                  style={{ height: 36 }}
                  inputStyle={{ fontSize: 14 }}
                />
              </View>
            </View>

            <View
              style={[
                styles.leftrightstyle,
                styles.paddingLeftRight8,
                styles.paddingTopBottom4,
              ]}
            >
              <View style={[styles.leftrightstyle, styles.formTitle]}>
                <Text style={styles.binding}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报价
                </Text>
                <Text style={styles.colorRed}>*</Text>
              </View>
              <View style={[styles.flex1, styles.inputBox]}>
                <ZnlInput
                  placeholder="请输入报价"
                  style={{ height: 36 }}
                  inputStyle={{ fontSize: 14 }}
                />
              </View>
            </View>
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

          {showMoreParams && (
            <View
              style={[
                styles.leftrightstyle,
                styles.paddingLeftRight8,
                styles.paddingTopBottom4,
              ]}
            >
              <View style={[styles.leftrightstyle, styles.formTitle]}>
                <Text style={styles.binding}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;税点
                </Text>
              </View>
              <View style={[styles.flex1, styles.inputBox]}>
                <ZnlInput
                  placeholder="请输入税点"
                  style={{ height: 36 }}
                  inputStyle={{ fontSize: 14 }}
                />
              </View>
            </View>
          )}

          {showMoreParams && (
            <View
              style={[
                styles.leftrightstyle,
                styles.paddingLeftRight8,
                styles.paddingTopBottom4,
              ]}
            >
              <View style={[styles.leftrightstyle, styles.formTitle]}>
                <Text style={styles.binding}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年份
                </Text>
              </View>
              <View style={[styles.flex1, styles.inputBox]}>
                <ZnlInput
                  placeholder="请输入年份"
                  style={{ height: 36 }}
                  inputStyle={{ fontSize: 14 }}
                />
              </View>
            </View>
          )}

          {showMoreParams && (
            <View
              style={[
                styles.leftrightstyle,
                styles.paddingLeftRight8,
                styles.paddingTopBottom4,
              ]}
            >
              <View style={[styles.leftrightstyle, styles.formTitle]}>
                <Text style={styles.binding}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品质
                </Text>
              </View>
              <View style={[styles.flex1, styles.inputBox]}>
                <ZnlInput
                  placeholder="请输入品质"
                  style={{ height: 36 }}
                  inputStyle={{ fontSize: 14 }}
                />
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  colorRed: {
    color: "red",
  },
  flex1: {
    flex: 1,
  },
  ListRow: {},
  timeView: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  timebox: {
    width: 48,
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
    width: 70,
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
});

export default InquiryListItem;
