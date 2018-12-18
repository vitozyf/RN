export const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SetWechat":
      return action.wechat;
    default:
      return state;
  }
};
