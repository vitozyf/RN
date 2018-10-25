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

global.$post = $post;
global.$get = $get;

global.$Toast = Toast;
global.$ISDEBUG = ISDEBUG;
global.$CONFIG = config;
global.$setStorage = setStorage;
global.$getStorage = getStorage;
global.$removeStorage = removeStorage;
global.$setArrayStorage = setArrayStorage;
global.$removeAllStorage = removeAllStorage;
global.$cleaarAllStorage = cleaarAllStorage;