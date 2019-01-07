// import { ISIOS } from "@src/utils/system";
// import DeviceInfo from "react-native-device-info";

// let HeaderHeightInit = 44;
// if (ISIOS) {
//   switch (DeviceInfo.getModel()) {
//     case "iPhone X":
//     case "iPhone XR":
//     case "iPhone XS":
//     case "iPhone XS Max":
//       HeaderHeightInit = 88;
//       break;
//     default:
//       HeaderHeightInit = 64;
//       break;
//   }
// }
// 统一声明默认State
export default {
  IsTabBarShow: true, // 是否隐藏tabbar
  // HeaderHeight: HeaderHeightInit,
  StatusBarStyle: "light-content", // 状态栏
  SearchRecord: [], // 本地搜索记录
  // 搜索页信息
  BomSearchInfo: {
    KeyWord: "",
    RouterName: "yunext",
    Yunext: {
      // 云价格
      datas: [],
      PageIndex: 1,
      TotalCount: 0,
      TotalPage: 0,
      PageSize: 50,
      isLoading: false,
      showFoot: 0,
    },
    Stocks: {
      // 现货
      datas: [],
      StartIndex: 1,
      TotalCount: 0,
      PageSize: 50,
      isLoading: false,
      showFoot: 0,
    },
  },
  wechat: {},
  ErpUserRoleList: [],
  AppWechatInfo: {
    NickName: "",
    AvatarPath: "",
  },
};
