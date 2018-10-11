import { getStorage, removeStorage } from './storage';
import CONFIG from './config';

/**
 * 
 * @param {string} method 请求方式
 * @param {string} url 请求地址
 * @param {any} data 请求数据
 */
const fetchMethods = async (method, url, data) => {
  const token = await getStorage(CONFIG.TOKEN);
  try {
    return new Promise((resolve, reject) => {
      fetch(CONFIG.APIBASEURL + url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'JWT ' + token
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then(response => {
        if (response.Code === 200) {
          resolve(response.Result.Data);
        } else if (response.Code === 401) {
          // 用户身份失效
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

const $post = (url, data) => {
  return fetchMethods('post', url, data)
}

const $get = (url, data) => {
  return fetchMethods('get', url, data)
}

export {
  fetchMethods,
  $post,
  $get
};