import {
  $post,
  $get,
  config,
  setStorage,
  getStorage,
  removeStorage,
  setArrayStorage,
  removeAllStorage,
  clearAllStorage,
  CustomStore,
} from "@src/utils";
import { ISDEBUG, ISANDROID, ISIOS } from "@src/utils/system";
import { Loading, ZnlToast } from "@src/components";

const Cloud: ICloud = {};

Cloud.$post = $post;
Cloud.$get = $get;

Cloud.$Toast = ZnlToast;
Cloud.$ISANDROID = ISANDROID;
Cloud.$ISIOS = ISIOS;
Cloud.$ISDEBUG = ISDEBUG;
Cloud.$CONFIG = config;
Cloud.$setStorage = setStorage;
Cloud.$getStorage = getStorage;
Cloud.$removeStorage = removeStorage;
Cloud.$setArrayStorage = setArrayStorage;
Cloud.$removeAllStorage = removeAllStorage;
Cloud.$clearAllStorage = clearAllStorage;
Cloud.$Loading = Loading;
Cloud.$CustomStore = CustomStore;

global.Cloud = Cloud;
