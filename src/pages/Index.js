import React, {Component} from 'react';
import { View, Text } from 'react-native';
import ZnlButton from '../components/ZnlButton';
import {connect} from 'react-redux';
import {removeStorage} from '../utils';
import CONFIG from '../utils/config';


class Index extends Component{
  constructor(props) {
    super(props);
  }
  logout = () => {
    removeStorage(CONFIG.TOKEN);
    this.props.SetIsLogin(false);
  }
  render() {
    return (
      <View>
        <Text>
          首页
        </Text>
        <ZnlButton onPress={this.logout}>
          退出登录
        </ZnlButton>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return Object.assign({}, {IsLogin: state.IsLogin}, props);
}

const mapDispatchToProps = (dispatch) => {
  return {
    SetIsLogin : (IsLogin) => {
      return dispatch({
        type: 'SetIsLogin',
        IsLogin
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);