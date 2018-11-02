import React, {Component} from 'react';
import BomScreen from '@pages/IndexPages/Bom';
// import SearchPageScreen from '@pages/SearchPages/SearchPage';
// import SearchPageDetailScreen from '@pages/SearchPages/SearchPageDetail';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import { 
  createStackNavigator
} from 'react-navigation';

const IndexPages = createStackNavigator(
  {
    Bom: {
      screen: BomScreen,
    }
    // SearchPage: {
    //   screen: SearchPageScreen
    // },
    // SearchPageDetail: {
    //   screen: SearchPageDetailScreen
    // }
  },
  {
    initialRouteName: 'Bom',
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

const Index =  class Index extends Component{
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'BOM.AI',
      activeTintColor: '#ee7700',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return (
        <Ionicons 
          name={'md-home'} 
          size={ 20 } 
          color={focused ? '#ee7700' : '#333'} />
        );
      },
    };
  };
  render() {
    return (
        <IndexPages></IndexPages>
    )
  }
  componentWillMount() {
    const {SetBottomTabNav, navigation} = this.props;
    SetBottomTabNav(navigation);
  }
}

const mapStateToProps = (state, props) => {
  return props;
}

const mapDispatchToProps = (dispatch) => {
  return {
    SetBottomTabNav : (BottomTabNav) => {
      return dispatch({
        type: 'SetBottomTabNav',
        BottomTabNav
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);