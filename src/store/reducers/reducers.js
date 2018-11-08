
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
    case 'SetDrawerNav':
      return Object.assign(state, {DrawerNav: action.DrawerNav});
    case 'SetSwitchNav':
      return Object.assign(state, {SwitchNav: action.SwitchNav});
    case 'SetBottomTabNav':
      return Object.assign(state, {BottomTabNav: action.BottomTabNav});
    case 'SetSearchStackNav':
      return Object.assign(state, {SearchStackNav: action.SearchStackNav});
    default:
      return state;
  }
}

export const IsTabBarShow = (state, action) => {
  switch (action.type) {
    case 'SetIsTabBarShow':
      return action.IsTabBarShow;
    default:
      return true;
  }
}
