import {
  $post,
  $get,
  config,
  setStorage,
  getStorage,
  removeStorage,
  setArrayStorage,
  removeAllStorage,
  cleaarAllStorage
} from '@src/utils'
import { Toast, ISDEBUG } from '@src/utils/system';
import {Loading} from '@src/components'

const Cloud = {};

Cloud.$post = $post;
Cloud.$get = $get;

Cloud.$Toast = Toast;
Cloud.$ISDEBUG = ISDEBUG;
Cloud.$CONFIG = config;
Cloud.$setStorage = setStorage;
Cloud.$getStorage = getStorage;
Cloud.$removeStorage = removeStorage;
Cloud.$setArrayStorage = setArrayStorage;
Cloud.$removeAllStorage = removeAllStorage;
Cloud.$cleaarAllStorage = cleaarAllStorage;
Cloud.$Loading = Loading;

global.Cloud = Cloud;