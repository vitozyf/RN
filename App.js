/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { Provider } from 'react-redux';
import {connect} from 'react-redux';
import createStore from './src/store';
import CONFIG from './src/utils/config';

import Login from './src/pages/Login';
import Index from './src/pages/Index';

import { getStorage } from './src/utils';

const store = createStore()

class CurrentView extends Component {
  render() {
    const {IsLogin, SetIsLogin} = this.props;
    const CurrentPage = IsLogin ? (<Index></Index>) : (<Login></Login>);
    return (<View>
      {CurrentPage}
    </View>)
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

const CurrentViewWidthStore = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentView);


export default class App extends Component {
  render() {
    getStorage(CONFIG.TOKEN).then(data => {
      store.dispatch({
        type: 'SetIsLogin',
        IsLogin: !!data
      })
    })

    return (
      <Provider store = { store }>
        <View style={styles.container}>
          <CurrentViewWidthStore></CurrentViewWidthStore>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
