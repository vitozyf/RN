import React, {Component} from 'react';
import { Provider } from 'react-redux';
import createStore from '@src/store';
import Pages from '@router/DrawerNavRouter';
import './Global';
import {AppInit} from '@src/utils/appInit';


const store = createStore();
export default class App extends Component {
  componentWillMount() {
    AppInit(store);
  }
  render() {
    return (
      <Provider store = { store }>
        <Pages />
      </Provider>
    );
  }
}
