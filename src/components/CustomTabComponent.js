/**
 * 自定义底部渲染
 */
import React from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';


export default class CustomTabComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }

  componentDidMount() {
    this.kbShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.kbHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

  keyboardWillShow = () => {
    this.setState({ visible: false });
  };

  keyboardWillHide = () => {
    this.setState({ visible: true });
  };

  componentWillUnmount() {
    this.kbShowListener.remove();
    this.kbHideListener.remove();
  }

  render() {
    return this.state.visible && <BottomTabBar style={styles.BottomTabBar} {...this.props} />;
  }
}

const styles = StyleSheet.create({
  BottomTabBar: {
    // borderTopColor: '#ee7700',
  }
})