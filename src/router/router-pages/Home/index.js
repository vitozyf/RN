import React, {Component} from 'react';
import {connect} from 'react-redux';
import SwitchNavRouter from './SwitchNavRouter';

// const store = createStore()


class Home extends Component {
  static navigationOptions = {
    drawerLabel: '首页'
  };
  static router = SwitchNavRouter.router;
  render() {
    return (
        <SwitchNavRouter navigation={this.props.navigation} />
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
)(Home);