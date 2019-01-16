/* @flow */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import RootSiblings from "react-native-root-siblings";
import DeviceInfo from "react-native-device-info";
import Feather from "react-native-vector-icons/Feather";

const Height = Dimensions.get("window").height;
const Width = Dimensions.get("window").width;

let sibling = undefined;

let HeaderHeightInit = 44;

if (Platform.OS == "ios") {
  switch (DeviceInfo.getModel()) {
    case "iPhone X":
    case "iPhone XR":
    case "iPhone XS":
    case "iPhone XS Max":
      HeaderHeightInit = 88;
      break;
    default:
      HeaderHeightInit = 64;
      break;
  }
}

const Hotpartnos = {
  show: (mapHotpartnos: Array<string>, onPress: Function) => {
    // sibling && sibling.destroy();
    const SiblingEle = (
      <ScrollView style={styles.maskStyle} keyboardShouldPersistTaps="handled">
        {mapHotpartnos.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.hotrow}
              activeOpacity={0.8}
              onPress={() => {
                onPress && onPress(item);
                sibling && sibling.destroy();
              }}
            >
              <View>
                <Text numberOfLines={1} style={styles.model}>
                  {item}
                </Text>
              </View>
              <Feather size={14} name="arrow-up-left" />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
    if (!sibling) {
      sibling = new RootSiblings(SiblingEle);
    } else {
      sibling.update(SiblingEle);
    }
  },

  hidden: () => {
    sibling && sibling.destroy();
  },
};

const styles = StyleSheet.create({
  maskStyle: {
    position: "absolute",
    backgroundColor: "#fff",
    width: Width,
    height: Height - HeaderHeightInit - 50,
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: HeaderHeightInit,
  },
  hotrow: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
  model: {
    maxWidth: 240,
  },
});

export default Hotpartnos;
