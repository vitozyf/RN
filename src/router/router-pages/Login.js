import React, {Component} from 'react';
import LoginScreen from '@pages/LoginPages/Login';

import {connect} from 'react-redux';
import { 
  createStackNavigator
} from 'react-navigation';

const IndexPages = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    }
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
        height: 48,
        lineHeight: 48,
      },
      headerTitleStyle: {
        color: '#333',
        fontSize: 20,
      },
    }
  }
);

const Index =  class Index extends Component{
  static navigationOptions = {
    drawerLabel: '登陆'
  };
  render() {
    return (
        <IndexPages></IndexPages>
    )
  }
}

const mapStateToProps = (state, props) => {
  return props;
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);