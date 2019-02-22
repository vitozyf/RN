import JPushModule from "jpush-react-native";
import { Platform } from "react-native";
import { Loading } from "@components";
import type { IUserInfo, ISales } from "@src/store/reducers/UserInfo";

/**
 * 设置别名
 * @param {*} UserId
 */
const setAlias = UserId => {
  JPushModule.setAlias(UserId, map => {
    if (map.errorCode === 0) {
      console.log("setAlias-success", UserId);
    } else {
      Cloud.$addLog("appInit.js-setAlias-fail", map.errorCode);
    }
  });
};
/**
 * 设置标签
 * @param {*} UserId
 */
const setTags = tags => {
  JPushModule.cleanTags(success => {
    JPushModule.setTags(tags, map => {
      if (map.errorCode === 0) {
        console.log("setTags-success", tags);
      } else {
        console.log("setTags-fail", map);
        Cloud.$addLog("appInit.js-tags-fail", map.errorCode);
      }
    });
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
      Cloud.$addLog("appInit-initUserData-TOKEN", error.message);
    }
  } else {
    const timeid = setTimeout(() => {
      if (CustomStore.navigator) {
        CustomStore.navigator._navigation.navigate("Login");
      }
      clearTimeout(timeid);
    }, 100);
  }
  const Sales: ISales = { SalesName: "", telephone: "" };
  const UserInfo: IUserInfo = { Sales };

  if (UserIdentity) {
    try {
      UserInfo.UserIdentity = UserIdentity.UserIdentityModel;
      UserInfo.Sales.SalesName = UserIdentity.SalesName;
      UserInfo.Sales.telephone = UserIdentity.telephone;
    } catch (error) {
      Cloud.$addLog("appInit-initUserData-UserIdentity", error.message);
    }
  }
  const AppWechatInfo = store.getState().AppWechatInfo;
  if (AppWechatInfo) {
    try {
      UserInfo.AvatarPath = AppWechatInfo.AvatarPath
        ? AppWechatInfo.AvatarPath
        : `https:${HomeInfo.UserInfo.HeadPic}`;
      UserInfo.NickName = AppWechatInfo.NickName
        ? AppWechatInfo.NickName
        : HomeInfo.UserInfo.NickName;
    } catch (error) {
      Cloud.$addLog("appInit-initUserData-AppWechatInfo", error.message);
    }
  }
  if (TOKEN) {
    UserInfo.TOKEN = TOKEN;
  }

  if (HomeInfo) {
    UserInfo.PhoneNumber = HomeInfo.UserInfo.BindMobile;
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
  try {
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
    // UserId设置推送设备别名
    const UserId = store
      .getState()
      .UserInfo.HomeUserInfo.UserId.replace(/-/g, "");
    if (UserId) {
      setAlias(UserId);
    }
    const BindMobile = store.getState().UserInfo.HomeUserInfo.BindMobile;
    const IsMainAccount = store.getState().UserInfo.HomeUserInfo.IsMainAccount
      ? "IsMainAccount"
      : "NotMainAccount";
    const CompanyId = store
      .getState()
      .UserInfo.HomeUserInfo.CompanyId.replace(/-/g, "");
    const Tags = [];
    if (BindMobile) {
      Tags.push(BindMobile);
    }
    if (IsMainAccount) {
      Tags.push(IsMainAccount);
    }
    if (CompanyId) {
      Tags.push(CompanyId);
    }
    setTags(Tags);
  } catch (error) {
    Cloud.$addLog("appInit-jpushHandler", error.message);
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
