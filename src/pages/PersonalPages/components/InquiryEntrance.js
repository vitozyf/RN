/**
 * 询价入口
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
type Props = {
  title: string,
  message1: number,
  message2: number,
  message1Title: string,
  message2Title: string,
  titlePress: Function,
  message1Press: Function,
  message2Press: Function,
};
import Icon from "@components/Iconfont/CloudIcon";

class InquiryEntrance extends Component<Props> {
  render() {
    const {
      title,
      message1,
      message2,
      message1Title,
      message2Title,
      titlePress,
      message1Press,
      message2Press,
    } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.header}
          activeOpacity={0.8}
          onPress={titlePress}
        >
          <Text style={styles.baseRowTitle}>{title}</Text>
          <Text style={styles.baseRowValue}>
            <Text style={styles.titlego}>查看全部 &nbsp;</Text>
            <Icon name="right_arrow" size={15} style={styles.iconfont} />
          </Text>
        </TouchableOpacity>
        <View style={styles.messageBox}>
          <TouchableOpacity
            style={[styles.message]}
            activeOpacity={0.8}
            onPress={message1Press}
          >
            <View style={styles.textCenter}>
              <View style={styles.UnreadPromptBox}>
                <View style={styles.UnreadPrompt} />
                <Text style={styles.message1Text}>{message1}</Text>
              </View>
            </View>
            <View style={styles.textCenter}>
              <Text style={styles.messageTitle}>{message1Title}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.message]}
            activeOpacity={0.8}
            onPress={message2Press}
          >
            <View style={styles.textCenter}>
              <View style={styles.UnreadPromptBox}>
                <View style={styles.UnreadPrompt} />
                <Text style={styles.message1Text}>{message2}</Text>
              </View>
            </View>
            <View style={styles.textCenter}>
              <Text style={styles.messageTitle}>{message2Title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  UnreadPromptBox: {
    width: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
  UnreadPrompt: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff2200",
    top: 0,
    right: 0,
  },
  container: {
    backgroundColor: "#fff",
    paddingLeft: 12,
    marginBottom: 8,
    paddingBottom: 12,
  },
  header: {
    height: 48,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
  baseRowTitle: {
    fontSize: 15,
  },
  baseRowValue: {
    fontSize: 15,
    color: "#999",
  },
  titlego: {
    fontSize: 14,
    color: "#666",
    fontWeight: "200",
  },
  iconfont: {
    fontWeight: "bold",
  },
  messageBox: {
    flexDirection: "row",
    paddingTop: 8,
    // height: 88,
  },
  message: {
    flex: 1,
  },
  message1Text: {
    fontSize: 36,
    color: "#000",
    lineHeight: 50,
  },
  messageTitle: {
    fontSize: 12,
    color: "#999",
    lineHeight: 18,
  },
});

export default InquiryEntrance;