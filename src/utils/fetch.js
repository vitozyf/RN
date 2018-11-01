import { getStorage, removeStorage } from './storage';
import CONFIG from './config';
import { Toast } from './system';
import {Loading} from '../components';
// import {store} from '../../App';
import createStore from '@src/store';
const store = createStore();

/**
 * 
 * @param {string} method 请求方式
 * @param {string} url 请求地址
 * @param {any} data 请求数据
 * @param {any} option 附加请求选项
 * option:
 *  loading 默认false
 *  onlydata 默认只包含data
 *  searchApi 启用搜索站点api
 */
const fetchMethods = async (method, url, data, option) => {
  let BaseUrl = CONFIG.APIBASEURL;
  if (option && option.loading) {
    Loading.show();
  }
  if (option && option.searchApi) {
    BaseUrl = CONFIG.SEARCHAPIURL;
  }
  const token = await getStorage(CONFIG.TOKEN);
  // 是否只返回数据，默认true
  const onlydata = option ? (typeof option.onlydata === 'undefined' || option.onlydata ? true : option.onlydata) : true;
  try {
    return new Promise((resolve, reject) => {
      fetch(BaseUrl + url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'JWTAPP ' + (token === null ? '' : token)
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then(response => {
        if (option && option.loading) {
          Loading.hidden();
        }
        if (response.Code === 200) {
          const completeData = response.Result.Data;
          if (onlydata) {
            if (completeData.Code === 0) {
              resolve(completeData.Data);
            } else {
              Toast(
                completeData.Message || '数据获取失败',
                'SHORT',
                'CENTER'
              );
              resolve(null);
            }
          } else {
            resolve(response);
          }
        } else if (response.Code === 401) {
          Toast(
            response.Message || '权限验证失败',
            'SHORT',
            'CENTER'
          );
          // 用户身份失效,清除存储
          removeStorage(CONFIG.TOKEN);
          const DrawerNav = store.getState().Navigations.DrawerNav;
          if (DrawerNav) {
            DrawerNav.navigate('Login');
          }
        } else {
          Toast(
            response.Message || '系统异常,请稍后重试',
            'SHORT',
            'CENTER'
          );
        }
      })
      .catch(error => {
        if (option && option.loading) {
          Loading.hidden();
        }
        reject(error)
      });
    })
  } catch (error) {
    if (option && option.loading) {
      Loading.hidden();
    }
    console.log(error)
  }
}

const $post = (url, data, option) => {
  return fetchMethods('post', url, data, option)
}

const $get = (url, data, option) => {
  return fetchMethods('get', url, data, option)
}

export {
  fetchMethods,
  $post,
  $get
};