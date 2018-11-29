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
        textSize: 15,
        form: "CIRCLE",

        horizontalAlignment: "RIGHT",
        verticalAlignment: "CENTER",
        orientation: "VERTICAL",
        wordWrapEnabled: true,
      },
      data: {
        dataSets: [
          {
            values: [
              { value: 45, label: "Sandwiches" },
              { value: 21, label: "Salads" },
              { value: 15, label: "Soup" },
              { value: 9, label: "Beverages" },
              { value: 15, label: "Desserts" },
            ],
            label: "Pie dataset",
            config: {
              colors: [
                // ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
                // '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1']
                processColor("#7cb5ec"),
                processColor("#434348"),
                processColor("#f7a35c"),
                processColor("#8CEAFF"),
                processColor("#8085e9"),
              ],
              valueTextSize: 20,
              valueTextColor: processColor("green"),
              sliceSpace: 5,
              selectionShift: 13,
              // xValuePosition: "OUTSIDE_SLICE",
              // yValuePosition: "OUTSIDE_SLICE",
              valueFormatter: "#.#'%'",
              valueLineColor: processColor("green"),
              valueLinePart1Length: 0.5,
            },
          },
        ],
      },
      highlights: [{ x: 2 }],
      description: {
        text: "This is Pie chart description",
        textSize: 15,
        textColor: processColor("darkgray"),
      },
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null });
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
    }

    console.log(event.nativeEvent);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Text>selected:</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>
          <PieChart
            style={styles.chart}
            logEnabled={true}
            chartBackgroundColor={processColor("#fff")}
            chartDescription={this.state.description}
            data={this.state.data}
            legend={this.state.legend}
            highlights={this.state.highlights}
            entryLabelColor={processColor("green")}
            entryLabelTextSize={20}
            drawEntryLabels={true}
            rotationEnabled={true}
            rotationAngle={45}
            usePercentValues={true}
            styledCenterText={{
              text: "Pie center text!",
              color: processColor("pink"),
              size: 20,
            }}
            centerTextRadiusPercent={100}
            holeRadius={80}
            holeColor={processColor("#f0f0f0")}
            transparentCircleRadius={90}
            transparentCircleColor={processColor("#f0f0f088")}
            maxAngle={350}
            onSelect={this.handleSelect.bind(this)}
            onChange={event => console.log(event.nativeEvent)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default TextPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    flex: 1,
  },
});
