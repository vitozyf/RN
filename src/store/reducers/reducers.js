export const IsLogin = (state = false, action) => {
  switch (action.type) {
    case 'SetIsLogin':
      // 设置登录状态失效时清除cookie
      return action.IsLogin
    default:
      return state
  }
}
