/**
 * @flow
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Text,
} from "react-native";
import RootSiblings from "react-native-root-siblings";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

let sibling = undefined;

const Loading = {
  show: (content: string) => {
    sibling = new RootSiblings(
      (
        <View style={styles.maskStyle}>
          <View style={styles.backViewStyle}>
            <ActivityIndicator size="large" color="#000" />
            <Text>{content}</Text>
          </View>
        </View>
      )
    );

    const TimeId = setTimeout(() => {
      if (sibling instanceof RootSiblings) {
        sibling.destroy();
      }
      clearTimeout(TimeId);
    }, 8000);
  },

  hidden: () => {
    if (sibling instanceof RootSiblings) {
      sibling.destroy();
    }
  },
};

const styles = StyleSheet.create({
  maskStyle: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  backViewStyle: {
    backgroundColor: "transparent",
    width: 120,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export { Loading };
