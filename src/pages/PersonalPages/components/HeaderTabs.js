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
  type: string, // tab, tag
};

class HeaderTabs extends Component<Props> {
  static defaultProps = {
    type: "tab",
  };
  onHeaderTabsChangeHandler = (item: Tab) => {
    const { active, onChangeHandler, type } = this.props;
    // tab类型 不允许切换选中
    if (item.key === active && type === "tab") {
      return;
    }
    onChangeHandler && onChangeHandler(item.key);
  };
  render() {
    const { active, tabs, type } = this.props;
    if (tabs.length === 0) {
      return null;
    }
    return (
      <View style={[styles.header, type === "tag" ? styles.headerTag : null]}>
        {tabs.map(item => {
          return (
            <TouchableOpacity
              style={[
                styles.headerItem,
                type === "tag" ? styles.headerItemTag : null,
              ]}
              activeOpacity={0.8}
              onPress={() => {
                this.onHeaderTabsChangeHandler(item);
              }}
              key={item.key}
            >
              <View
                style={[
                  styles.headerTitleBox,
                  type === "tag" ? styles.headerTitleBoxTag : null,
                  active === item.key && type === "tag"
                    ? styles.headerTitleBoxTagActive
                    : null,
                ]}
              >
                <View style={styles.headerTitlePadding}>
                  <Text
                    style={[
                      styles.headerItemTitle,
                      type === "tag" ? styles.headerItemTitleTag : null,
                      active === item.key ? styles.activeTitle : null,
                    ]}
                  >
                    {item.value}
                  </Text>
                </View>
                {active === item.key && type === "tab" && (
                  <View style={styles.activeLine} />
                )}
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
  headerTag: {
    backgroundColor: "#fAfAfA",
  },
  headerItem: {
    height: 48,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerItemTag: {
    // height: 32,
  },
  headerTitleBox: {
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleBoxTag: {
    width: 64,
    height: 32,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  headerTitleBoxTagActive: {
    backgroundColor: "#FFF2E6",
    borderColor: "#EDA65F",
  },
  headerTitlePadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  headerItemTitle: {
    color: "#666666",
    fontSize: 16,
  },
  headerItemTitleTag: {
    fontSize: 14,
  },
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
