// @flow
import { getStorage, removeStorage } from "./storage";
import CONFIG from "./config";
import { Loading, ZnlToast } from "../components";
import store from "../store";
import CustomStore from "./jumpUtils";
import DeviceInfo from "react-native-device-info";
import { NetInfo } from "react-native";
const LOGURL = "appget/addapplog";

/**
 * 错误日志记录
 * @param {*} Address 日志位置/url
 * @param {*} ExpContent 日志内容
 * @param {*} PostParam 参数
 */
const addLog = (Address: string, ExpContent: string, PostParam: string) => {
  const MobileBrand = DeviceInfo.getBrand();
  const Version = DeviceInfo.getVersion();
  const SystemVersion = DeviceInfo.getSystemVersion();
  if (__DEV__) {
    console.log("error-log", Address, ExpContent, PostParam);
  } else {
    const PhoneNumber = store.getState().UserInfo.PhoneNumber || "";
    $post(
      LOGURL,
      {
        PhoneNumber,
        Address,
        ExpContent,
        PostParam,
        ExtInfo: `MobileBrand=${MobileBrand};ActiveRouteName=${
          store.getState().ActiveRouteName
        };Version=${Version};SystemVersion=${SystemVersion}`,
      },
      {
        onlydata: false,
      }
    );
  }
};

type IOption = {
  loading?: boolean, // 是否带全屏loading，默认false
  onlydata?: boolean, // 默认只包含data
  searchApi?: boolean, // 启用搜索站点api
  erpApi?: boolean, // 启用erp站点
  nativeApi?: boolean, // 是否用传入的原生地址请求
};
type IReqConfig = {
  method: string,
  headers: Object,
  referrerPolicy: Object,
  body?: string,
};

/**
 * 封装fetch
 * @param {string} method 请求方式
 * @param {string} url 请求地址
 * @param {any} data 请求数据
 * @param {any} option 附加请求选项
 */
const fetchMethods = async (
  method: string,
  url: string,
  data: Object,
  option: IOption = { onlydata: true }
) => {
  const isConnected = await NetInfo.isConnected.fetch();
  if (!isConnected) {
    return ZnlToast.show("当前网络不可用，请检查网络是否正常");
  }
  let BaseUrl: string = CONFIG.APIBASEURL;
  if (option.loading) {
    Loading.show();
  }
  if (option.nativeApi) {
    BaseUrl = "";
  }
  if (option.searchApi) {
    BaseUrl = CONFIG.SEARCHAPIURL;
  }
  const token = (await getStorage(CONFIG.TOKEN)) || "";
  // 头部 token + UniqueID
  // const AppUniqueID = DeviceInfo.getUniqueID();
  let Authorization = "JWTAPP " + token;
  if (option.erpApi) {
    BaseUrl = CONFIG.ERPAPI;
    Authorization = `ErpApi${token}`;
  }
  // 默认只返回包装层的数据
  const onlydata = option.onlydata;
  const ReqConfig: IReqConfig = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
    referrerPolicy: {
      origin: "https://www.bom.ai",
    },
  };
  if (method === "post") {
    ReqConfig.body = JSON.stringify(data);
  }
  try {
    return new Promise((resolve, reject) => {
      fetch(BaseUrl + url, {
        ...ReqConfig,
      })
        .then(response => response.json())
        .then(response => {
          if (option.loading) {
            Loading.hidden();
          }
          // 原生地址请求直接返回
          if (option.nativeApi) {
            resolve(response);
            return;
          }
          if (response.Code === 200 || response.code === 200) {
            // erp直接返回数据
            if (option.erpApi) {
              return resolve(response.data);
            }
            const completeData = response.Result.Data;
            // bomai按通用封装时只返回数据
            if (onlydata) {
              if (completeData.Code === 0) {
                resolve(completeData.Data);
              } else {
                ZnlToast.show(completeData.Message || "数据获取失败");
                resolve(null);
              }
            } else {
              resolve(response);
            }
          } else if (response.Code === 401 || response.code === 401) {
            ZnlToast.show(response.Message || "权限验证失败");
            // 用户身份失效,清除存储
            removeStorage(CONFIG.TOKEN);
            store.dispatch({ type: "ClearUserInfo" });
            const TIMEID = setTimeout(() => {
              if (CustomStore.navigator) {
                CustomStore.navigator._navigation.navigate("Login");
              }
              clearTimeout(TIMEID);
            }, 300);
          } else {
            ZnlToast.show(response.Message || "系统异常,请稍后重试");
            if (url !== LOGURL) {
              addLog(
                BaseUrl + url,
                response.Message || "系统异常,请稍后重试",
                data ? JSON.stringify(data) : ""
              );
            }
          }
        })
        .catch(error => {
          if (option && option.loading) {
            Loading.hidden();
          }
          reject(error);
          if (url !== LOGURL) {
            addLog(
              BaseUrl + url,
              error.message || "请求错误，未捕获到message",
              data ? JSON.stringify(data) : ""
            );
          }
        });
    });
  } catch (error) {
    if (option && option.loading) {
      Loading.hidden();
    }
    if (url !== LOGURL) {
      addLog(
        BaseUrl + url,
        error.message || "请求错误，未捕获到message",
        data ? JSON.stringify(data) : ""
      );
    }
  }
};

const abort_promise = () => {
  return new Promise((resolve, reject) => {
    const TimeId = setTimeout(() => {
      Loading.hidden();
      clearTimeout(TimeId);
      resolve(null);
    }, CONFIG.TIMEDELAY);
  });
};

const $post = (url: string, data: Object, option: IOption) => {
  const fetch_promise = fetchMethods("post", url, data, option);
  return Promise.race([fetch_promise, abort_promise()]);
};

const $get = (url: string, data: Object, option: IOption) => {
  const fetch_promise = fetchMethods("get", url, data, option);
  return Promise.race([fetch_promise, abort_promise()]);
};

export { fetchMethods, $post, $get, addLog };
