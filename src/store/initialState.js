// 统一声明默认State
export default {
  IsTabBarShow: true, // 是否隐藏tabbar
  StatusBarStyle: {
    TextColor: "light-content", // light-content dark-content
    BackgroundColor: "#2C2D31", // #2C2D31 rgba(248,248,248,0.82)
  }, // 状态栏
  SearchRecord: [], // 本地搜索记录
  ForQuotationSearchRecord: [], // 询报价搜索记录
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
  AppWechatInfo: null,
  // AppWechatInfo: {
  //   NickName: "",
  //   AvatarPath: "",
  // },
  Hotpartnos: [], // 热门型号
  ActiveRouteName: "",
  // 消息列表
  MessageData: [],
};
