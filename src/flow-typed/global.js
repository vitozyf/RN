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
  $connection: any,
  $proxy: any,
  $cnh: Function,
};

// 全局类型定义
declare type IConfig = {
  // 本地数据存储键名
  TOKEN: string,
  KeyWords: string, // 搜索记录
  RegisterDate: string, // 到期时间
  LoginCompanyName: string, // 公司名
  LoginPhoneNumber: string, // 手机号
  LoginAccountName: string, // 账号
  Hotpartnos: string, // 联想用热搜型号
  // 正则验证表达式
  RegPhoneNumber: RegExp,
  // appid
  appid: string,
  secret: string,
  TIMEDELAY: number,
  APIBASEURL: string,
  SEARCHAPIURL: string,
  ERPAPI: string,
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

declare var Cloud: ICloud;
