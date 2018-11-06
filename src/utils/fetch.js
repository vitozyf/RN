import { getStorage, removeStorage } from './storage';
import CONFIG from './config';
// import { Toast } from './system';
import {Loading, ZnlToast} from '../components';
import {store} from '../store';

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
 *  erpApi 启用erp站点
 */
const fetchMethods = async (method, url, data, option) => {
  let BaseUrl = CONFIG.APIBASEURL;

  if (option && option.loading) {
    Loading.show();
  }
  // 搜索站地址
  if (option && option.searchApi) {
    BaseUrl = CONFIG.SEARCHAPIURL;
  }

  const token = await getStorage(CONFIG.TOKEN);
  let Authorization = 'JWTAPP ' + (token === null ? '' : token);
  // erp站地址
  if (option && option.erpApi) {
    BaseUrl = CONFIG.ERPAPI;
    Authorization = `ErpApi${(token === null ? '' : token)}`
  }
  // 是否只返回数据，默认true
  const onlydata = option ? (typeof option.onlydata === 'undefined' || option.onlydata ? true : option.onlydata) : true;
  try {
    return new Promise((resolve, reject) => {
      fetch(BaseUrl + url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then(response => {
        if (option && option.loading) {
          Loading.hidden();
        }
        if (response.Code === 200 || response.code === 200) {
          // erp直接返回
          if (option && option.erpApi) {
            return resolve(response.data);
          }
          const completeData = response.Result.Data;
          // bomai按通用封装时只返回数据
          if (onlydata) {
            if (completeData.Code === 0) {
              resolve(completeData.Data);
            } else {
              ZnlToast.show(
                completeData.Message || '数据获取失败'
              );
              resolve(null);
            }
          } else {
            resolve(response);
          }
        } else if (response.Code === 401 || response.code === 401) {
          ZnlToast.show(
            response.Message || '权限验证失败'
          );
          // 用户身份失效,清除存储
          removeStorage(CONFIG.TOKEN);
          const DrawerNav = store.getState().Navigations.DrawerNav;
          if (DrawerNav) {
            DrawerNav.navigate('Login');
          }
        } else {
          ZnlToast.show(
            response.Message || '系统异常,请稍后重试'
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