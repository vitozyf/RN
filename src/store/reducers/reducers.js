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

export const Navigations = (state = {}, action) => {
  switch (action.type) {
    case 'SetRootNav':
      return Object.assign(state, {rootnav: action.rootnav});
    case 'SetHomeNav':
      return Object.assign(state, {homenav: action.homenav});
    default:
      return state;
  }
}
