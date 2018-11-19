import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import RootSiblings from "react-native-root-siblings";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

let sibling = undefined;

const BackTop = {
  show: params => {
    const { onPress } = params ? params : {};
    const SiblingEle = (
      <View style={styles.maskStyle}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Text>
            <MaterialCommunityIcons
              name={"arrow-collapse-up"}
              size={30}
              color={"#666"}
              style={styles.MaterialCommunityIcons}
            />
          </Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 25,
    width: 50,
    height: 50,
    right: 30,
    bottom: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#999",
  },
  MaterialCommunityIcons: {
    paddingTop: 2,
  },
});

export { BackTop };
