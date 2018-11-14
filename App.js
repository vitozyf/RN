import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "@src/store";
import DrawerNavRouter from "@router/DrawerNavRouter";
import "./Global";
import { AppInit } from "@src/utils/appInit";
import CustomStore from "./src/utils/jumpUtils";

// const store = createStore();
export default class App extends Component {
  componentWillMount() {
    AppInit(store);
    // Cloud.$get("appget/getversioninfo", null, { onlydata: false }).then(
    //   data => {
    //     console.log(121212, data);
    //   }
    // );
  }
  render() {
    return (
      <Provider store={store}>
        <DrawerNavRouter
          ref={navigator => {
            CustomStore.navigator = navigator;
          }}
        />
      </Provider>
    );
  }
}
