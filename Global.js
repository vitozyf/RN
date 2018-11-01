import {
  $post,
  $get,
  config,
  setStorage,
  getStorage,
  removeStorage,
  setArrayStorage,
  removeAllStorage,
  clearAllStorage
} from '@src/utils'
import { Toast, ISDEBUG, ISANDROID, ISIOS } from '@src/utils/system';
import {Loading} from '@src/components'

const Cloud = {};

Cloud.$post = $post;
Cloud.$get = $get;

Cloud.$Toast = Toast;
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

global.Cloud = Cloud;