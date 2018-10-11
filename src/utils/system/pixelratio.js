import {
  PixelRatio
} from 'react-native';

/**
 * 像素密度
 * 1 mdpi Android devices
 * 1.5 hdpi Android devices
 * 2 xhdpi Android devices(iPhone 4, 4S; iPhone 5, 5C, 5S; iPhone 6, 7, 8)
 * 3 xxhdpi Android devices(iPhone 6 Plus, 7 Plus, 8 Plus; iPhone X, XS, XS Max; Pixel, Pixel 2)
 * 3.5 xxxhdpi Android devices(Nexus 6; Pixel XL, Pixel 2 XL)
 */
const PR = PixelRatio.get();
/**
 * 体大小缩放比例
 * Android 用户选项里的“设置 > 显示 > 字体大小”
 * iOS 设备上直接返回默认的像素密度
 */
const FS = PixelRatio.getFontScale();

export {
  PR,
  FS
}