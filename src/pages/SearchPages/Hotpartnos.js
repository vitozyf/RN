/* @flow */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import RootSiblings from "react-native-root-siblings";
import Feather from "react-native-vector-icons/Feather";
import { HeaderHeightInit } from "@src/utils/constant";

const Height = Dimensions.get("window").height;
const Width = Dimensions.get("window").width;

let sibling = undefined;

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
