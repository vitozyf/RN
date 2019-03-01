/**
 * 询报价头部tabs
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
type Tab = {
  value: string,
  key: string,
};
type Props = {
  active: string, // all waiting already
  tabs: Array<Tab>,
  onChangeHandler?: Function,
};

class HeaderTabs extends Component<Props> {
  onHeaderTabsChangeHandler = item => {
    const { active, onChangeHandler } = this.props;
    if (item.key === active) {
      return;
    }
    onChangeHandler(item.key);
  };
  render() {
    const { active, tabs } = this.props;
    if (tabs.length === 0) {
      return null;
    }
    return (
      <View style={styles.header}>
        {tabs.map(item => {
          return (
            <TouchableOpacity
              style={styles.headerItem}
              activeOpacity={0.8}
              onPress={() => {
                this.onHeaderTabsChangeHandler(item);
              }}
              key={item.key}
            >
              <View style={styles.headerTitleBox}>
                <View style={styles.headerTitlePadding}>
                  <Text
                    style={[
                      styles.headerItemTitle,
                      active === item.key ? styles.activeTitle : null,
                    ]}
                  >
                    {item.value}
                  </Text>
                </View>
                {active === item.key && <View style={styles.activeLine} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerItem: {
    height: 48,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleBox: {
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitlePadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  headerItemTitle: {},
  activeTitle: {
    color: "#ee7700",
  },
  activeLine: {
    position: "absolute",
    height: 4,
    width: "100%",
    backgroundColor: "#ee7700",
    bottom: 0,
    left: 0,
  },
});

export default HeaderTabs;
