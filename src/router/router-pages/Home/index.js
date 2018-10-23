import React, {Component} from 'react';
import { Provider } from 'react-redux';
import createStore from '@src/store';
import {connect} from 'react-redux';
import SwitchNavRouter from './SwitchNavRouter';

const store = createStore()


const AppIndex = class App extends Component {
  static navigationOptions = {
    drawerLabel: '首页'
  };
  render() {
    return (
      <Provider store = { store }>
        <SwitchNavRouter />
      </Provider>
    );
  }
  componentWillMount() {
    const {SetDrawerNav, navigation} = this.props;
    SetDrawerNav(navigation);
  }
}

const mapStateToProps = (state, props) => {
  return props;
}

const mapDispatchToProps = (dispatch) => {
  return {
    SetDrawerNav : (DrawerNav) => {
      return dispatch({
        type: 'SetDrawerNav',
        DrawerNav
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppIndex);