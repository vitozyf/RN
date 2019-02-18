/**
 * 步骤条
 * @flow
 */
import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

type dataItem = {
  key: string | number,
  value: string,
};
type Props = {
  data: Array<dataItem>,
  active: string | number,
};
class ZnlProgress extends Component<Props> {
  render() {
    const { data, active } = this.props;
    return (
      <View style={styles.progressBox}>
        {data.map((item, index) => {
          return (
            <View key={item.key} style={styles.rowBox}>
              <View style={styles.valueBox}>
                <View
                  style={[
                    styles.keyTextBox,
                    active === item.key ? styles.activeKeyTextBox : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.keyText,
                      active === item.key ? styles.active : null,
                    ]}
                  >
                    {item.key}
                  </Text>
                </View>
                <View style={{ backgroundColor: "#fff" }}>
                  <Text
                    style={[
                      styles.valueText,
                      active === item.key ? styles.activeValue : null,
                    ]}
                  >
                    {item.value}
                  </Text>
                </View>
              </View>
              {index === data.length - 1 ? null : (
                <View
                  style={[
                    styles.itemLine,
                    active === item.key ? styles.activeLine : null,
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  progressBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  valueBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  keyText: {
    color: "#999",
  },
  valueText: {
    color: "#808080",
    fontSize: 14,
  },
  active: {
    color: "#fff",
  },
  activeValue: {
    color: "#EE7700",
  },
  keyTextBox: {
    width: 20,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 3,
  },
  activeKeyTextBox: {
    backgroundColor: "#EE7700",
    borderColor: "#EE7700",
  },

  itemLine: {
    width: 30,
    height: 1,
    backgroundColor: "#808080",
    marginLeft: 3,
    marginRight: 3,
  },
  activeLine: {
    backgroundColor: "#EE7700",
  },
});
export default ZnlProgress;
