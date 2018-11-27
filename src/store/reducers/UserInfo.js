export const initialState = {
  AvatarPath:
    "http://bom-ai-read.oss-cn-shenzhen.aliyuncs.com/makesureFile/JCNEeK_1540978339916.jpg",
  NickName: "",
  TOKEN: "",
  PhoneNumber: "",
  UserIdentity: {},
  HomeUserInfo: {},
  HomeUserAuthors: {},
  Sales: {},
};

export default (state = {}, action) => {
  switch (action.type) {
    case "SetUserInfo":
      return Object.assign({}, state, action.UserInfo);
    case "ClearUserInfo":
      return initialState;
    default:
      return state;
  }
};
