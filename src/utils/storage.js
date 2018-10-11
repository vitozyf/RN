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
      const value = await AsyncStorage.multiRemove([CONFIG.TOKEN]);
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
  removeAllStorage
}