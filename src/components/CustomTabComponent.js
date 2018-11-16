/**
 * 自定义底部渲染
 */
import React from "react";
import { Keyboard, StyleSheet } from "react-native";
import { BottomTabBar } from "react-navigation-tabs";
import { connect } from "react-redux";

class CustomTabComponent extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     visible: true
  //   }
  // }

  render() {
    const { IsTabBarShow } = this.props;
    return (
      IsTabBarShow && (
        <BottomTabBar
          style={[styles.BottomTabBar, !IsTabBarShow ? styles.heightnone : {}]}
          {...this.props}
        />
      )
    );
  }
}

const styles = StyleSheet.create({
  BottomTabBar: {
    backgroundColor: "rgba(248,248,248,0.82)",
  },
  heightnone: {
    height: 0,
  },
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, { IsTabBarShow: state.IsTabBarShow }, props);
};

export default connect(mapStateToProps)(CustomTabComponent);
