export const IsLogin = (state = false, action) => {
  switch (action.type) {
    case 'SetIsLogin':
      return action.IsLogin;
    default:
      return state;
  }
}

export const UserInfo = (state = {}, action) => {
  switch (action.type) {
    case 'SetUserInfo':
      return Object.assign({}, state, action.UserInfo);
    default:
      return state;
  }
}
