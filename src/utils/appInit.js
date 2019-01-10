import JPushModule from "jpush-react-native";
import { Platform } from "react-native";
// 设置别名
const setAlias = PhoneNumber => {
  JPushModule.setAlias(PhoneNumber, map => {
    if (map.errorCode === 0) {
      console.log("set alias succeed");
    } else {
      console.log("set alias failed, errorCode: " + map.errorCode);
    }
  });
};
// 获取ERP用户权限
const getUserInfoByBomAi = async store => {
  return Cloud.$post(
    "Security/GetUserInfoByBomAi",
    { AppSource: 0 },
    { erpApi: true }
  ).then(data => {
    store.dispatch({
      type: "SetErpUserRoleList",
      ErpUserRoleList: data.UserRoleList || [],
    });
  });
};
// 获取用户开通的服务
const getUserIdentity = async () => {
  return Cloud.$get("mmhome/getusercenterinfo");
};
// 获取bomai用户相关信息
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
  const AppWechatInfo = store.getState().AppWechatInfo;
  if (AvatarPath) {
    UserInfo.AvatarPath = AppWechatInfo.AvatarPath
      ? AppWechatInfo.AvatarPath
      : `https:${AvatarPath}`;
  }
  if (NickName) {
    UserInfo.NickName = AppWechatInfo.NickName
      ? AppWechatInfo.NickName
      : NickName;
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
  try {
    await initUserData(store, CustomStore);
  } catch (error) {
    console.log(error);
  }
  const TOKEN = await Cloud.$getStorage(Cloud.$CONFIG.TOKEN);
  if (TOKEN) {
    getUserInfoByBomAi(store);
  }

  if (Platform.OS === "android") {
    JPushModule.initPush();
    JPushModule.notifyJSDidLoad(resultCode => {
      if (resultCode === 0) {
      }
    });
  } else {
    JPushModule.setupPush();
  }
  // 以手机号设置推送设备别名
  const PhoneNumber = store.getState().UserInfo.PhoneNumber;
  if (PhoneNumber) {
    setAlias(PhoneNumber);
  }
};

AppInit.JPushModule = JPushModule;

export { AppInit };
