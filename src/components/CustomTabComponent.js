/**
 * 自定义底部渲染
 */
import React from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';
import {connect} from 'react-redux';


class CustomTabComponent extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     visible: true
  //   }
  // }

  // componentDidMount() {
  //   this.kbShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
  //   this.kbHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  // }

  // keyboardWillShow = () => {
  //   const {SetIsTabBarShow} = this.props;
  //   // this.setState({ visible: false });
  //   SetIsTabBarShow(false);
  // };

  // keyboardWillHide = () => {
  //   // this.setState({ visible: true });
  //   const {SetIsTabBarShow} = this.props;
  //   SetIsTabBarShow(true);
  // };

  // componentWillUnmount() {
  //   this.kbShowListener.remove();
  //   this.kbHideListener.remove();
  // }

  render() {
    const {IsTabBarShow} = this.props;
    // return this.state.visible && <BottomTabBar style={styles.BottomTabBar} {...this.props} />;
    return IsTabBarShow && <BottomTabBar style={styles.BottomTabBar} {...this.props} />;
  }
}

const styles = StyleSheet.create({
  BottomTabBar: {
    // borderTopColor: '#ee7700',
  }
})

// export default CustomTabComponent;
const mapStateToProps = (state, props) => {
  return Object.assign({}, {IsTabBarShow: state.IsTabBarShow}, props);
}

const mapDispatchToProps = (dispatch) => {
  return {
    SetIsTabBarShow: (IsTabBarShow) => {
      return dispatch({
        type: 'SetIsTabBarShow',
        IsTabBarShow
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomTabComponent);