// import CustomStore from "./jumpUtils";

// 获取用户开通的服务
const getUserIdentity = async () => {
  return Cloud.$get("mmhome/getusercenterinfo");
  // /api/v1/mmhome/gethomeinfo
};
const gethomeinfo = async () => {
  const HomeInfo = await Cloud.$get("mmhome/gethomeinfo");
  return HomeInfo;
};
// 初始化本地存储的用户数据到redux
const initUserData = async (store, CustomStore) => {
  const TOKEN = await Cloud.$getStorage(Cloud.$CONFIG.TOKEN);
  let HomeInfo = { UserInfo: {}, UserAuthors: {} };
  let UserIdentity = { UserIdentityModel: {}, SalesName: "", telephone: "" };

  if (TOKEN) {
    HomeInfo = await gethomeinfo();
    UserIdentity = await getUserIdentity(store);
  } else {
    setTimeout(() => {
      if (CustomStore.navigator) {
        CustomStore.navigator._navigation.navigate("Login");
      }
    }, 100);
  }

  const AvatarPath = await Cloud.$getStorage(Cloud.$CONFIG.AvatarPath);
  const NickName = await Cloud.$getStorage(Cloud.$CONFIG.NickName);
  const PhoneNumber = await Cloud.$getStorage(Cloud.$CONFIG.PhoneNumber);
  const UserInfo = { Sales: {} };
  if (UserIdentity) {
    UserInfo.UserIdentity = UserIdentity.UserIdentityModel;
    UserInfo.Sales.SalesName = UserIdentity.SalesName;
    UserInfo.Sales.telephone = UserIdentity.telephone;
  }
  if (AvatarPath) {
    UserInfo.AvatarPath = `https:${AvatarPath}`;
  }
  if (NickName) {
    UserInfo.NickName = NickName;
  }
  if (TOKEN) {
    UserInfo.TOKEN = TOKEN;
  }
  if (PhoneNumber) {
    UserInfo.PhoneNumber = PhoneNumber;
  }
  if (HomeInfo) {
    UserInfo.HomeUserInfo = HomeInfo.UserInfo;
    UserInfo.HomeUserAuthors = HomeInfo.UserAuthors;
  }
  store.dispatch({
    type: "SetUserInfo",
    UserInfo,
  });
};

const AppInit = async (store, CustomStore) => {
  await initUserData(store, CustomStore);
};

export { AppInit };
