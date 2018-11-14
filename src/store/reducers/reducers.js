export const UserInfo = (state = {}, action) => {
  switch (action.type) {
    case "SetUserInfo":
      return Object.assign({}, state, action.UserInfo);
    case "ClearUserInfo":
      return {
        AvatarPath:
          "http://bom-ai-read.oss-cn-shenzhen.aliyuncs.com/makesureFile/JCNEeK_1540978339916.jpg",
        NickName: "",
        TOKEN: "",
        PhoneNumber: "",
        UserIdentity: {},
        HomeUserInfo: {},
        HomeUserAuthors: {},
      };
    default:
      return state;
  }
};

export const IsTabBarShow = (state = false, action) => {
  switch (action.type) {
    case "SetIsTabBarShow":
      return action.IsTabBarShow;
    default:
      return state;
  }
};

export const BomSearchInfo = (state = {}, action) => {
  switch (action.type) {
    case "SetBomSearchInfo":
      const Yunext = Object.assign(
        {},
        state.Yunext,
        action.BomSearchInfo.Yunext
      );
      const Stocks = Object.assign(
        {},
        state.Stocks,
        action.BomSearchInfo.Stocks
      );
      return Object.assign(
        {},
        state,
        action.BomSearchInfo,
        { Yunext },
        { Stocks }
      );
    default:
      return state;
  }
};
