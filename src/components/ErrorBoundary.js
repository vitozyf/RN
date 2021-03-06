/**
 * 错误屏
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import ZnlHeader from "@components/ZnlHeader";
// import { connect } from "react-redux";

type Props = {
  children: any,
  CustomStore: any,
};
type State = {
  hasError: boolean,
};
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Object, info: Object) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    Cloud.$addLog(
      "ErrorBoundary",
      "error: " + error.message + "errorinfo: " + JSON.stringify(info)
    );
  }
  // onPressIcon = () => {
  //   console.log(111);
  // };

  render() {
    // if (!this.state.hasError) {
    //   // You can render any custom fallback UI
    //   return (
    //     <View style={styles.container}>
    //       <ZnlHeader title="出错啦" onPressIcon={this.onPressIcon} />
    //       <Text style={styles.title}>刷新</Text>
    //     </View>
    //   );
    // }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    // alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
});

export default ErrorBoundary;
