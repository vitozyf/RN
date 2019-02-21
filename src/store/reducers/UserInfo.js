/**
 * @flow
 */
import { clearAllStorage } from "@src/utils/storage";
export type ISales = {
  SalesName?: string,
  telephone?: string,
};
export type IUserInfo = {
  AvatarPath?: string,
  NickName?: string,
  TOKEN?: string,
  PhoneNumber?: string,
  UserIdentity?: any,
  HomeUserInfo?: any,
  HomeUserAuthors?: any,
  Sales?: ISales,
};
type IAction = {
  UserInfo?: IUserInfo,
  type: string,
};
export const initialState = {
  // AvatarPath:
  //   "http://bom-ai-read.oss-cn-shenzhen.aliyuncs.com/makesureFile/JCNEeK_1540978339916.jpg",
  AvatarPath: "",
  NickName: "",
  TOKEN: "",
  PhoneNumber: "",
  UserIdentity: {},
  HomeUserInfo: {},
  HomeUserAuthors: {},
  Sales: {},
};

export default (
  state: IUserInfo = (initialState: IUserInfo),
  action: IAction
) => {
  switch (action.type) {
    case "SetUserInfo":
      return Object.assign({}, state, action.UserInfo);
    case "ClearUserInfo":
      clearAllStorage();
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};
