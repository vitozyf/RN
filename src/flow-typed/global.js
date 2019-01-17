declare var document: Object;

declare var window: Object;

declare type ICloud = {
  $post: Function,
  $get: Function,
  $Toast: any,
  $ISANDROID: boolean,
  $ISIOS: boolean,
  $ISDEBUG: boolean,
  $CONFIG: IConfig,
  $setStorage: Function,
  $getStorage: Function,
  $removeStorage: Function,
  $setArrayStorage: Function,
  $removeAllStorage: Function,
  $clearAllStorage: Function,
  $Loading: Object,
  $CustomStore: any, // 根路有类
  $addLog: Function,
};

declare var Cloud: ICloud;

// 全局类型定义
declare type IConfig = {
  // 本地数据存储键名
  TOKEN?: string,
  AvatarPath?: string,
  NickName?: string,
  PhoneNumber?: string,
  KeyWords?: string, // 搜索记录
  RegisterDate?: string, // 到期时间
  // 正则验证表达式
  RegPhoneNumber?: RegExp,

  APIBASEURL?: string,
  SEARCHAPIURL?: string,
  ERPAPI?: string,
  appid?: string,
  ClientSecret?: string,
};
declare type INavigation = {
  navigate: Function,
  goBack: Function,
  addListener: Function,
  isFocused: boolean,
  state: Object,
  setParams: Function,
  getParam: Function,
  dispatch: Function,
  dangerouslyGetParent: Function,
  openDrawer: Function,
  push: Function,
};
