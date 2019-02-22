/**
 * signalr连接
 * @flow
 */
import signalr from "react-native-signalr";
import { getStorage } from "./storage";
import CONFIG from "./config";

const getUrl = () => {
  return __DEV__ ? "//test.bom.ai:8088/im/signalr" : "//api.bom.ai/im";
};

// 客户端方法集合
const ClientMethodSets = [
  // 1. 对方发送文本消息后推送
  {
    name: "addNewMsg",
    method: (data, companyName, partno, newmessagecount) => {
      console.log(123456, data, companyName, partno, newmessagecount);
    },
  },
];

const hubConnection = async () => {
  const token = (await getStorage(CONFIG.TOKEN)) || "";
  if (!token) {
    return;
  }
  const connection = signalr.hubConnection(getUrl(), {
    qs: {
      token,
    },
  });

  connection.logging = true; // 启用日志记录

  connection
    .start({
      withCredentials: false,
    })
    .done(() => {
      console.log(11111);
    })
    .fail(() => {
      console.log(2222);
    });

  //connection-handling
  connection.connectionSlow(() => {
    console.log(3333);
  });

  connection.error(error => {
    console.log(4444, error);
  });

  const proxy = connection.createHubProxy("IMHub");
  //   注册客户端方法
  ClientMethodSets.map(item => {
    proxy.on(item.name, item.method);
  });
  Cloud.$connection = connection;
  Cloud.$proxy = proxy;
  return connection;
};

const getStartConnectionData = (methodName, args) => {
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
