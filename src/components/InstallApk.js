/**
 * 安装apk
 * @flow
 */

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  NativeModules,
} from "react-native";
import RootSiblings from "react-native-root-siblings";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const RNFS = require("react-native-fs");
let jobId = -1;

let sibling = undefined;

type Props = {
  url: string,
  hiddenHandler: Function,
};
type State = {
  percentage: number,
  percentageStr: string,
};
class InstallView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      percentageStr: "开始下载...",
      percentage: 0,
    };
  }
  render() {
    const { percentage, percentageStr } = this.state;
    return (
      <View style={styles.maskStyle}>
        <View style={styles.backViewStyle}>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{"正在更新"}</Text>
          </View>
          <View style={styles.body}>
            <Text>{percentageStr}</Text>
          </View>
          <View style={styles.percentageBox}>
            <View
              style={{
                backgroundColor: "green",
                width: (260 * percentage) / 100,
              }}
            />
          </View>
        </View>
      </View>
    );
  }
  downloadFileTest = (background, url) => {
    //   if (jobId !== -1) {
    //     this.setState({ output: "A download is already in progress" });
    //   }
    const { hiddenHandler } = this.props;
    const progress = data => {
      const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
      this.setState({
        percentage,
        percentageStr: `下载进度 ${percentage}%`,
      });
      if (percentage === 100) {
        hiddenHandler && hiddenHandler();
      }
    };

    const begin = res => {
      console.log(0, res, "Download has begun");
    };

    const progressDivider = 2;

    // Random file name needed to force refresh...WW
    const downloadDest = `${RNFS.ExternalDirectoryPath}/${(Math.random() *
      1000) |
      0}.apk`;

    const ret = RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadDest,
      begin,
      progress,
      background,
      progressDivider,
    });

    jobId = ret.jobId;
    console.log(888, ret, RNFS.ExternalDirectoryPath, {
      fromUrl: url,
      toFile: downloadDest,
      begin,
      progress,
      background,
      progressDivider,
    });
    ret.promise
      .then(res => {
        console.log(111, res, downloadDest);
        jobId = -1;
        NativeModules.InstallApk.install(downloadDest);
      })
      .catch(err => {
        console.log(222, err);
        jobId = -1;
      });
  };
  componentWillMount() {
    const { url } = this.props;
    this.downloadFileTest(false, url);
  }
}

const InstallApk = {
  show: (url: string) => {
    sibling = new RootSiblings(
      (
        <InstallView
          url={url}
          hiddenHandler={() => {
            if (sibling instanceof RootSiblings) {
              sibling.destroy();
            }
          }}
        />
      )
    );
  },

  hidden: () => {
    if (sibling instanceof RootSiblings) {
      sibling.destroy();
    }
  },
};

const styles = StyleSheet.create({
  maskStyle: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  backViewStyle: {
    backgroundColor: "#fff",
    width: 260,
    height: 120,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerView: {},
  headerText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 40,
    // fontWeight: "bold",
  },
  body: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  percentageBox: {
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default InstallApk;
