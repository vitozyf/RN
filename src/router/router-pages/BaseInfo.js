import React, {Component} from 'react';
import BaseInfoScreen from '@pages/BaseInfoPages/BaseInfoScreen';
import {connect} from 'react-redux';
import { 
  createStackNavigator
} from 'react-navigation';

const IndexPages = createStackNavigator(
  {
    BaseInfo: {
      screen: BaseInfoScreen,
    }
  },
  {
    initialRouteName: 'BaseInfo',
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
    drawerLabel: '基本信息'
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