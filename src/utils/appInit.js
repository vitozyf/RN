const getUserIdentity = (store) => {
  Cloud.$get('mmhome/getusercenterinfo').then(data => {
    if (data) {
      const UserInfo = {};
      UserInfo.UserIdentity = data.UserIdentityModel;
      store.dispatch({
        type: 'SetUserInfo',
        UserInfo
      })
    }
  })
}
const initUserData = async (store) => {
  getUserIdentity(store);
  const AvatarPath = await Cloud.$getStorage(Cloud.$CONFIG.AvatarPath);
  const NickName = await Cloud.$getStorage(Cloud.$CONFIG.NickName);
  const TOKEN = await Cloud.$getStorage(Cloud.$CONFIG.TOKEN);
  const PhoneNumber = await Cloud.$getStorage(Cloud.$CONFIG.PhoneNumber);
  const UserInfo = {};
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