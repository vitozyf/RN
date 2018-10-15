import {
  ToastAndroid
} from 'react-native';
import {ISANDROID, ISIOS} from './phonesystem';
/**
 * 
 * @param {string} message 
 * @param {string} duration (SHORT LONG)
 * @param {string} gravity (TOP BOTTOM CENTER)
 * @param {number} xOffset 
 * @param {number} yOffset 
 */
const Toast = (message, duration, gravity, xOffset, yOffset) => {
  if (ISANDROID) {
    if (xOffset || yOffset) {
      return ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid[duration],
        ToastAndroid[gravity],
        xOffset,
        yOffset
      );
    } else if (gravity) {
      return ToastAndroid.showWithGravity(
        message,
        ToastAndroid[duration],
        ToastAndroid[gravity]
      );
    } else {
      return ToastAndroid.show(
        message,
        ToastAndroid[duration]
      );
    }
  } else if (ISIOS) {
    // 未处理ios提示
    return false
  }
}

export {
  Toast
}