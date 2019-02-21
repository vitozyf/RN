/**
 * 测试页
 *
 */
import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
} from "react-native";
import { HeaderTitle, HeaderRight } from "@components";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-navigation";

import { PieChart } from "react-native-charts-wrapper";

type Props = {};
type IV = {
  navigation: INavigation,
};
class TextPage extends Component<Props> {
  static navigationOptions = ({ navigation }: IV) => {
    const goBack = () => {
      navigation.navigate("Home");
    };
    return {
      headerTitle: <HeaderTitle title="测试" />,
      headerLeft: (
        <Icon.Button
          size={26}
          name="md-arrow-back"
          backgroundColor="#fff"
          color="#333"
          iconStyle={{ marginLeft: 5 }}
          onPress={goBack}
        />
      ),
      headerRight: <HeaderRight />,
    };
  };
  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: 15,
        form: "CIRCLE",
        formSize: 15,
        horizontalAlignment: "LEFT",
        verticalAlignment: "CENTER",
        orientation: "VERTICAL",
        wordWrapEnabled: true,
        formToTextSpace: 10,
        yEntrySpace: 5,
      },
      data: {
        dataSets: [
          {
            label: "品牌分布",
            values: [
              { value: 45, label: "TI(德州仪器)" },
              { value: 15, label: "Maxim(美信)" },
              { value: 21, label: "ST(意法)" },
              { value: 15, label: "ON(安森美)" },
              { value: 9, label: "EXAR(艾科嘉)" },
              { value: 45, label: "TI(德州仪器)1" },
              { value: 15, label: "Maxim(美信)1" },
              { value: 21, label: "ST(意法)1" },
              { value: 15, label: "ON(安森美)1" },
              { value: 9, label: "EXAR(艾科嘉)1" },
            ],
            config: {
              // common
              colors: [
                processColor("#7cb5ec"),
                processColor("#434348"),
                processColor("#90ed7d"),
                processColor("#f7a35c"),
                processColor("#8085e9"),
                processColor("#f15c80"),
                processColor("#e4d354"),
                processColor("#2b908f"),
                processColor("#f45b5b"),
                processColor("#91e8e1"),
              ],
              //   highlightEnabled: true,
              //   drawValues: false,
              //   visible: false,
              //   valueFormatterPattern: string or 'largeValue' or 'percent' or 'date',
              //   axisDependency: string,
              valueTextSize: 15,
              valueTextColor: processColor("#fff"),
              valueFormatter: "#.#'%'",
              // pie
              sliceSpace: 3, // 间隙
              selectionShift: 5, // 选中时延长
              //   xValuePosition: "OUTSIDE_SLICE",
              //   yValuePosition: "OUTSIDE_SLICE",
            },
          },
        ],
      },
      currentData: "", // 当前选中的数据内容
      highlights: [{ x: 2 }],
      description: {
        text: "",
        textSize: 15,
        textColor: processColor("darkgray"),
      },
    };
  }
  handleSelect = event => {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({ currentData: "" });
    } else {
      this.setState({ currentData: `${entry.label} ${entry.value}` });
    }

    console.log(event.nativeEvent);
  };

  render() {
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.container}>
          <PieChart
            style={styles.chart}
            logEnabled={false}
            chartBackgroundColor={processColor("#ccc")}
            chartDescription={this.state.description} // 描述
            data={this.state.data}
            legend={this.state.legend} // 图例
            highlights={this.state.highlights}
            // entryLabelColor={processColor("green")}
            // entryLabelTextSize={20}
            drawEntryLabels={false} // 显示lables
            rotationEnabled={true}
            rotationAngle={30} // 旋转角度
            usePercentValues={false} // 显示小数
            styledCenterText={{
              text: this.state.currentData,
              color: processColor("#000"),
              size: 15,
            }}
            centerTextRadiusPercent={60} // 中心文字占的半径百分比
            holeRadius={60} // 中心大小
            holeColor={processColor("#fff")} // 中心背景颜色
            transparentCircleRadius={0} // 中心阴影
            // transparentCircleColor={processColor("#f0f0f088")} // 中心阴影颜色
            maxAngle={360}
            onSelect={this.handleSelect}
            // onChange={event => console.log(event.nativeEvent)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default TextPage;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  chart: {
    // flex: 1,
    width: 360,
    height: 220,
  },
});
