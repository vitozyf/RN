import {
  AsyncStorage
} from 'react-native';
import CONFIG from './config';

const setStorage = (key, value) => {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.setItem(key, value);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  })
}


const getStorage = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(key);
      resolve(value)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 将数据以数组形式存储
 * @param {*} key 
 * @param {*} value 
 * @param {*} length 数组最大长度
 */
const setArrayStorage = (key, value, length = 50) => {
  return new Promise(async (resolve, reject) => {
    try {
      let values = [];
      const AlreadyValues = await getStorage(key) || JSON.stringify([]);
      // 获取已有数据
      try {
        values = JSON.parse(AlreadyValues);
      } catch (error) {
        reject(error);
      }
      // 查找已有键值
      let AlreadyIndex = 0;
      const AlreadyItem = values.find((item, index) => {
        AlreadyIndex = index;
        return item === value
      })
      // 长度超过则裁剪
      if (values.length >= length) {
        values.pop();
      }
      // 存在则删除原有
      if (AlreadyItem) {
        values.splice(AlreadyIndex, 1);
      } 
      // 堆栈
      values.unshift(value)
      // 设置
      await AsyncStorage.setItem(key, JSON.stringify(values));
      resolve(true);
    } catch (error) {
      reject(error);
    }
  })
}

const removeStorage = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.removeItem(key);
      resolve(value)
    } catch (error) {
      reject(error)
    }
  })
}

const removeAllStorage = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.multiRemove([
        CONFIG.TOKEN, 
        CONFIG.AvatarPath, 
        CONFIG.NickName
      ]);
      resolve(value)
    } catch (error) {
      reject(error)
    }
  })
}

const cleaarAllStorage = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.multiRemove([
        CONFIG.TOKEN, 
        CONFIG.AvatarPath, 
        CONFIG.NickName, 
        CONFIG.PhoneNumber
      ]);
      resolve(value)
    } catch (error) {
      reject(error)
    }
  })
}

export {
  setStorage,
  getStorage,
  removeStorage,
  setArrayStorage,
  removeAllStorage,
  cleaarAllStorage
}