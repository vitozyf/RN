// type UserInfo = {
//   AvatarPath: string,
//   NickName: string,
//   TOKEN: string,
//   PhoneNumber: string,
//   UserIdentity: any,
//   HomeUserInfo: any,
//   HomeUserAuthors: any,
// };
import { ISIOS } from "@src/utils/system";

// 统一声明默认State
export default {
  // Navigations: {
  //   // DrawerNav: null,
  //   SwitchNav: null,
  //   BottomTabNav: null,
  //   SearchStackNav: null
  // },
  UserInfo: {
    AvatarPath:
      "http://bom-ai-read.oss-cn-shenzhen.aliyuncs.com/makesureFile/JCNEeK_1540978339916.jpg",
    NickName: "",
    TOKEN: "",
    PhoneNumber: "",
    UserIdentity: {},
    HomeUserInfo: {},
    HomeUserAuthors: {},
  },
  IsTabBarShow: false, // 是否隐藏tabbar
  HeaderHeight: ISIOS ? 64 : 44,
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
      PageSize: 10,
      isLoading: false,
      showFoot: 0,
    },
    Stocks: {
      // 现货
      datas: [],
      StartIndex: 1,
      TotalCount: 0,
      PageSize: 10,
      isLoading: false,
      showFoot: 0,
    },
  },
};
