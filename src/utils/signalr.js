/**
 * signalr连接
 * @flow
 */
import signalr from "react-native-signalr";
import { getStorage } from "./storage";
import CONFIG from "./config";
import store from "@src/store";

const connectionInfo = {
  IsConnectionSuccess: false,
};

// 客户端方法集合
const ClientMethodSets = [
  // 消息推送处理方法
  {
    name: "addAppMsg",
    method: (data, ConnectionID) => {
      Cloud.$addLog("signalr-ConnectionID", ConnectionID);
      // 消息列表更新
      store.dispatch({
        type: "ADD_MESSAGE_DATA",
        Message: data.msgResult,
      });
      Cloud.$get("im/getappenquiryandquotecntsync")
        .then(res => {
          if (res && res.length > 0) {
            // 个人中心询报价条数更新
            store.dispatch({
              type: "SET_ENQUIRYANDQUOTECNT",
              EnquiryAndQuoteCnt: res,
            });
          }
        })
        .catch(err => {
          Cloud.$addLog("getinquirycount", err.Message);
        });
    },
  },
  {
    name: "addAppOwnCompanyMsg",
    method: data => {
      // 个人中心询报价条数更新
      store.dispatch({
        type: "SET_ENQUIRYANDQUOTECNT",
        EnquiryAndQuoteCnt: data.cntList,
      });
    },
  },
];

const hubConnection = async () => {
  const token = (await getStorage(CONFIG.TOKEN)) || "";
  if (!token) {
    return;
  }
  const connection = await signalr.hubConnection(Cloud.$CONFIG.IMURL, {
    qs: {
      token,
    },
  });
  connection.logging = true; // 启用日志记录

  const proxy = await connection.createHubProxy("IMHub");

  //   注册客户端方法
  ClientMethodSets.map(item => {
    proxy.on(item.name, item.method);
  });

  connection
    .start({
      withCredentials: false,
    })
    .done(res => {
      console.log("signalr-connection-success", Cloud.$CONFIG.IMURL, res);
      connectionInfo.IsConnectionSuccess = true;
    })
    .fail(error => {
      Cloud.$addLog("signalr.js", "connection-start-error: " + error.message);
      connectionInfo.IsConnectionSuccess = false;
    });

  //connection-handling
  connection.connectionSlow(() => {
    Cloud.$addLog("signalr.js", "connectionSlow");
  });

  connection.error(error => {
    connectionInfo.IsConnectionSuccess = false;
    Cloud.$addLog("signalr.js", "connection-error: " + error.message);
  });

  Cloud.$connection = connection;
  Cloud.$proxy = proxy;
  return connection;
};

const getStartConnectionData = async (methodName, args) => {
  if (!Cloud.$connection || !connectionInfo.IsConnectionSuccess) {
    await hubConnection();
  }
  return new Promise((resolve, reject) => {
    Cloud.$connection
      .start({
        withCredentials: false,
      })
      .done(() => {
        Cloud.$proxy
          .invoke(methodName, args)
          .done(response => {
            return resolve(response);
          })
          .fail(err => {
            return reject(err);
          });
      });
  });
};

Cloud.$cnh = getStartConnectionData;

export { hubConnection };
