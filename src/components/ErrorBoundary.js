/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  children: any,
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

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <View style={styles.container}>
          <Text style={styles.title}>出错啦</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
});

export default ErrorBoundary;
