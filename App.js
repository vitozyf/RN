import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from '@src/store';
import DrawerNavRouter from '@router/DrawerNavRouter';
import './Global';
import {AppInit} from '@src/utils/appInit';


// const store = createStore();
export default class App extends Component {
  componentWillMount() {
    AppInit(store);
  }
  render() {
    return (
      <Provider store = { store }>
        <DrawerNavRouter />
      </Provider>
    );
  }
}
