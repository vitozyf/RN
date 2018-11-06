import React, {Component} from 'react';
import MembershipScreen from '@pages/MembershipPages/MembershipScreen';
import HelpPage from '@pages/MembershipPages/HelpPage';

import {connect} from 'react-redux';
import { 
  createStackNavigator
} from 'react-navigation';

const IndexPages = createStackNavigator(
  {
    Membership: {
      screen: MembershipScreen,
    },
    HelpPage: {
      screen: HelpPage,
    }
  },
  {
    initialRouteName: 'Membership',
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
    drawerLabel: '会员身份'
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

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);