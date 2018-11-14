import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state, props) => {
  return Object.assign({}, state.BomSearchInfo, props);
};

const mapDispatchToProps = dispatch => {
  return {
    SetBomSearchInfo: BomSearchInfo => {
      return dispatch({
        type: "SetBomSearchInfo",
        BomSearchInfo,
      });
    },
  };
};

// This function takes a component...
function WithSearchHandler(WrappedComponent, params) {
  // ...and returns another component...
  let WithSearchHandlerHOC = class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        test: "111",
      };
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent {...this.props} />;
    }
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithSearchHandlerHOC);
}

export default WithSearchHandler;
