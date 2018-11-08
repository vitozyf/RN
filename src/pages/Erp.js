import React, {Component} from 'react';
import ErpIndex from '@pages/ErpPages/ErpIndex';
import ErpList from '@pages/ErpPages/ErpList';

import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import { 
  createStackNavigator
} from 'react-navigation';

const IndexPages = createStackNavigator(
  {
    ErpIndex: {
      screen: ErpIndex,
    },
    ErpList: {
      screen: ErpList
    }
  },
  {
    initialRouteName: 'ErpIndex',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ee7700',
        height: 48,
        lineHeight: 48,
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 20,
      },
    }
  }
);

class Index extends Component{
  static navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    return {
      tabBarVisible,
      title: 'ERP',
      activeTintColor: '#ee7700',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return (
          <Entypo name={'icloud'} size={ 20 } color={focused ? '#ee7700' : '#333'} />
        );
      },
    };
  };
  static router = IndexPages.router;
  render() {
    return (
        <IndexPages navigation={this.props.navigation}></IndexPages>
    )
  }
}

const mapStateToProps = (state, props) => {
  return props;
}

export default connect(
  mapStateToProps,
)(Index);