// 获取用户开通的服务
const getUserIdentity = async () => {
  return Cloud.$get('mmhome/getusercenterinfo')
}
// 初始化本地存储的用户数据到redux
const initUserData = async (store) => {
  const UserIdentity = await getUserIdentity(store);
  const AvatarPath = await Cloud.$getStorage(Cloud.$CONFIG.AvatarPath);
  const NickName = await Cloud.$getStorage(Cloud.$CONFIG.NickName);
  const TOKEN = await Cloud.$getStorage(Cloud.$CONFIG.TOKEN);
  const PhoneNumber = await Cloud.$getStorage(Cloud.$CONFIG.PhoneNumber);
  const UserInfo = {};
  if (UserIdentity) {
    UserInfo.UserIdentity = UserIdentity.UserIdentityModel
  }
  if (AvatarPath) {
    UserInfo.AvatarPath = `https:${AvatarPath}`
  }
  if (NickName) {
    UserInfo.NickName = NickName
  }
  if (TOKEN) {
    UserInfo.TOKEN = TOKEN
  }
  if (PhoneNumber) {
    UserInfo.PhoneNumber = PhoneNumber
  }
  store.dispatch({
    type: 'SetUserInfo',
    UserInfo
  })
}

const AppInit = async (store) => {
  await initUserData(store)
}

export {
  AppInit
}