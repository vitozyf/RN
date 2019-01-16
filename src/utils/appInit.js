/**
 *
 */
import JPushModule from "jpush-react-native";
import { Platform } from "react-native";
import { Loading } from "@components";
import type { IUserInfo, ISales } from "@src/store/reducers/UserInfo";
/**
 * 设置别名
 * @param {*} PhoneNumber
 */
const setAlias = PhoneNumber => {
  JPushModule.setAlias(PhoneNumber, map => {
    if (map.errorCode === 0) {
      console.log("set alias succeed");
    } else {
      console.log("set alias failed, errorCode: " + map.errorCode);
    }
  });
};

/**
 * 获取ERP用户权限
 * @param {*} store
 */
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

/**
 * 获取用户开通的服务
 */
const getUserIdentity = async () => {
  return Cloud.$get("mmhome/getusercenterinfo");
};

/**
 * 获取bomai用户相关信息
 */
const gethomeinfo = async () => {
  const HomeInfo = await Cloud.$get("mmhome/gethomeinfo");
  return HomeInfo;
};

/**
 * 初始化本地存储的用户数据到redux
 * @param {*} store
 * @param {*} CustomStore
 */
const initUserData = async (store, CustomStore) => {
  const TOKEN = await Cloud.$getStorage(Cloud.$CONFIG.TOKEN);
  let HomeInfo = { UserInfo: {}, UserAuthors: {} };
  let UserIdentity = null;
  if (TOKEN) {
    try {
      HomeInfo = await gethomeinfo();
      UserIdentity = await getUserIdentity();
    } catch (error) {
      Cloud.$addLog("appInit-initUserData", error.message);
    }
  } else {
    const timeid = setTimeout(() => {
      if (CustomStore.navigator) {
        CustomStore.navigator._navigation.navigate("Login");
      }
      clearTimeout(timeid);
    }, 100);
  }

  const AvatarPath = await Cloud.$getStorage(Cloud.$CONFIG.AvatarPath);
  const NickName = await Cloud.$getStorage(Cloud.$CONFIG.NickName);
  const PhoneNumber = await Cloud.$getStorage(Cloud.$CONFIG.PhoneNumber);
  const Sales: ISales = { SalesName: "", telephone: "" };
  const UserInfo: IUserInfo = { Sales };
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

/**
 * jpush方法
 * @param {} store
 */
const jpushHandler = store => {
  // 初始化jpush
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

// 读取热搜型号（前3000）
const gethotpartnos = async store => {
  const Hotpartnos = await Cloud.$getStorage(Cloud.$CONFIG.Hotpartnos);
  let HotpartnosParse = [];
  try {
    HotpartnosParse = JSON.parse(Hotpartnos) || [];
  } catch (error) {
    Cloud.$addLog("appInit-gethotpartnos", error.message);
  }
  if (HotpartnosParse.length > 0) {
    store.dispatch({
      type: "SetHotpartnos",
      Hotpartnos: HotpartnosParse,
    });
  } else {
    Cloud.$get("appget/gethotpartnos?PageSize=3000", null, {
      onlydata: false,
    }).then(data => {
      if (data.Code === 200) {
        let result = "";
        try {
          result = JSON.stringify(data.Result);
          Cloud.$setStorage(Cloud.$CONFIG.Hotpartnos, result);
        } catch (error) {
          Cloud.$addLog("appInit-gethotpartnos", error.message);
        }
        store.dispatch({
          type: "SetHotpartnos",
          Hotpartnos: data.Result,
        });
      }
    });
  }
};

/**
 * 初始化
 * @param {} store
 * @param {*} CustomStore
 */
const AppInit = async (store: any, CustomStore: any) => {
  Loading.show();
  // 同步执行
  try {
    await initUserData(store, CustomStore);
  } catch (error) {
    Loading.hidden();
    Cloud.$addLog("appInit-AppInit", error.message);
  }
  Loading.hidden();
  const TOKEN = await Cloud.$getStorage(Cloud.$CONFIG.TOKEN);
  if (TOKEN) {
    getUserInfoByBomAi(store);
  }

  // 异步执行
  jpushHandler(store);
  gethotpartnos(store);
};

AppInit.JPushModule = JPushModule;

export { AppInit };
