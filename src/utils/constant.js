/**
 * @flow
 */
import DeviceInfo from "react-native-device-info";
import { ISIOS } from "@src/utils/system";

// top导航栏初始高度
let HeaderHeightInit = 44;
let StatusBarHeader = 20;
if (ISIOS) {
  switch (DeviceInfo.getModel()) {
    case "iPhone X":
    case "iPhone XR":
    case "iPhone XS":
    case "iPhone XS Max":
      HeaderHeightInit = 88;
      StatusBarHeader = 44;
      break;
    default:
      HeaderHeightInit = 64;
      StatusBarHeader = 20;
      break;
  }
}

export { HeaderHeightInit, StatusBarHeader };
