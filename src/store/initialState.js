import { ISIOS } from "@src/utils/system";
import DeviceInfo from "react-native-device-info";
// 统一声明默认State
export default {
  IsTabBarShow: true, // 是否隐藏tabbar
  HeaderHeight: ISIOS
    ? DeviceInfo.getDeviceName() === "iPhone X"
      ? 88
      : 64
    : 44,
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
};
