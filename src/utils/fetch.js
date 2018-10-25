import { getStorage, removeStorage } from './storage';
import CONFIG from './config';
import { Toast } from './system';

/**
 * 
 * @param {string} method 请求方式
 * @param {string} url 请求地址
 * @param {any} data 请求数据
 * @param {any} option 附加请求选项
 */
const fetchMethods = async (method, url, data, option) => {
  const token = await getStorage(CONFIG.TOKEN);
  // 是否只返回数据，默认true
  const onlydata = option ? (typeof option.onlydata === 'undefined' ? true : option.onlydata) : true;
  try {
    return new Promise((resolve, reject) => {
      fetch(CONFIG.APIBASEURL + url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'JWTAPP ' + token
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then(response => {
        console.log('res', response)
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
            resolve(completeData);
          }
        } else if (response.Code === 401) {
          Toast(
            response.Message || '权限验证失败',
            'SHORT',
            'CENTER'
          );
          // 用户身份失效,清除存储
          removeStorage(CONFIG.TOKEN);
        } else {
          throw new Error('网络异常');
        }
      })
      .catch(error => {
        reject(error)
      });
    })
  } catch (error) {
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