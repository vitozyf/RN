/**
 * @flow
 */
import DeviceInfo from "react-native-device-info";
import { ISIOS } from "@src/utils/system";

// top导航栏初始高度
let HeaderHeightInit = 44;
if (ISIOS) {
  switch (DeviceInfo.getModel()) {
    case "iPhone X":
    case "iPhone XR":
    case "iPhone XS":
    case "iPhone XS Max":
      HeaderHeightInit = 88;
      break;
    default:
      HeaderHeightInit = 64;
      break;
  }
}

export { HeaderHeightInit };
