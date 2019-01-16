// 全局配置
import config from "./config";
// 数据获取
import { fetchMethods, $post, $get, addLog } from "./fetch";
// 数据存取
import {
  setStorage,
  getStorage,
  removeStorage,
  setArrayStorage,
  removeAllStorage,
  clearAllStorage,
} from "./storage";
// 全局跳转
import CustomStore from "./jumpUtils";

export {
  config,
  fetchMethods,
  $post,
  $get,
  setStorage,
  getStorage,
  removeStorage,
  setArrayStorage,
  removeAllStorage,
  clearAllStorage,
  CustomStore,
  addLog,
};
