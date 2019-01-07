import { NetInfo } from "react-native";

NetInfo.getConnectionInfo().then(connectionInfo => {
  // console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
});
function handleFirstConnectivityChange(connectionInfo) {
  // console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
  NetInfo.removeEventListener(
    "connectionChange",
    handleFirstConnectivityChange
  );
}
NetInfo.addEventListener("connectionChange", handleFirstConnectivityChange);
