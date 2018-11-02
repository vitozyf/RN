import React, {Component} from 'react';
import {connect} from 'react-redux';
import BottomTabNavRouter from './BottomTabNavRouter';
import SearchStackNavRouter from './SearchStackNavRouter';
import { 
  createSwitchNavigator,
} from 'react-navigation';


const SwitchNav = createSwitchNavigator(
  {
    TabNav: BottomTabNavRouter,
    SearchPage: SearchStackNavRouter
  },
  {
    initialRouteName: 'TabNav'
  }
)

const SwitchNavRouter = class App extends Component {
  render() {
    return (
      <SwitchNav />
    );
  }
}

// const mapStateToProps = (state, props) => {
//   return props;
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     SetDrawerNav : (DrawerNav) => {
//       return dispatch({
//         type: 'SetDrawerNav',
//         DrawerNav
//       })
//     }
//   }
// }

export default connect(
  // mapStateToProps
)(SwitchNavRouter);