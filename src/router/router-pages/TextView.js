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
import { StackNavigator, SafeAreaView } from "react-navigation";
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
        textSize: 12,
        form: "CIRCLE",
        formSize: 10,
        horizontalAlignment: "CENTER",
        verticalAlignment: "BOTTOM",
        orientation: "HORIZONTAL",
        wordWrapEnabled: true,
        formToTextSpace: 10,
        yEntrySpace: 5,
      },
      data: {
        dataSets: [
          {
            label: "",
            values: [
              { value: 0.451, label: "TI(德州仪器)" },
              { value: 0.15, label: "Maxim(美信)" },
              { value: 0.21, label: "ST(意法)" },
              { value: 0.15, label: "ON(安森美)" },
              { value: 0.9, label: "EXAR(艾科嘉)" },
              { value: 0.45, label: "TI(德州仪器)" },
              { value: 0.15, label: "Maxim(美信)" },
              { value: 0.21, label: "ST(意法)" },
              { value: 0.15, label: "ON(安森美)" },
              { value: 0.9, label: "EXAR(艾科嘉)" },
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
              // highlightEnabled: true,
              //   drawValues: false,
              //   visible: false,
              // valueFormatterPattern: "percent",
              //   axisDependency: string,
              valueTextSize: 12,
              valueTextColor: processColor("#fff"),
              valueFormatter: "#.###%",
              // pie
              sliceSpace: 2, // 间隙
              selectionShift: 5, // 选中时延长
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
    if (entry == null || !entry.data) {
      this.setState({ currentData: "" });
    } else {
      this.setState({
        currentData: `${entry.label} ${entry.value.toFixed(2) * 100}%`,
      });
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.container}>
          <PieChart
            style={styles.chart}
            logEnabled={false}
            chartBackgroundColor={processColor("#fff")}
            chartDescription={this.state.description} // 描述
            data={this.state.data}
            legend={this.state.legend} // 图例
            highlights={this.state.highlights}
            // entryLabelColor={processColor("green")}
            // entryLabelTextSize={20}
            drawEntryLabels={false} // 显示lables
            rotationEnabled={true}
            rotationAngle={-90} // 旋转角度
            usePercentValues={false} // 显示小数
            styledCenterText={{
              text: this.state.currentData,
              color: processColor("#000"),
              size: 12,
            }}
            centerTextRadiusPercent={100} // 中心文字占的半径百分比
            holeRadius={50} // 中心大小
            holeColor={processColor("#fff")} // 中心背景颜色
            transparentCircleRadius={10} // 中心阴影
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
    height: 300,
    borderWidth: 1,
  },
});
export default TextPage;
