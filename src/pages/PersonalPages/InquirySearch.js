/**
 * 询价搜索
 * @flow
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import CONFIG from "@src/utils/config";
import { ZnlHeader, ZnlInput, HeaderRight, ZnlButton } from "@components";
import HeaderTabs from "@pages/PersonalPages/components/HeaderTabs";
import Feather from "react-native-vector-icons/Feather";
import SearchPane from "@components/IndexPages/SearchPane";
import { HeaderHeightInit } from "@src/utils/constant";

const Height = Dimensions.get("window").height;

type Props = {
  navigation: INavigation,
  SET_FORQUOTATIONSEARCHRECORD: Function,
  ForQuotationSearchRecord: Array<string>,
};
type State = {
  active: string,
  KeyWord: string,
};
class InquirySearch extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const method = navigation.getParam("method", {});
    const inputRenderLeft = () => {
      return (
        <View style={styles.lineBox}>
          <FontAwesome name={"search"} size={18} style={styles.FontAwesome} />
          <View style={styles.verticalline} />
        </View>
      );
    };
    const renderCenter = () => {
      return (
        <ZnlInput
          style={styles.SearchInputBox}
          inputStyle={styles.SearchInput}
          autoFocus={true}
          returnKeyType="search"
          onSubmitEditing={method.onSearchHandler}
          onChangeText={method.onChangeText}
          placeholder="请输入公司名或型号"
          renderLeft={inputRenderLeft}
        />
      );
    };
    return {
      header: (
        <ZnlHeader
          hideLeft={true}
          renderCenter={renderCenter}
          renderRight={() => {
            return (
              <HeaderRight
                style={styles.HeaderRight}
                title="取消"
                onPress={() => {
                  navigation.goBack();
                }}
              />
            );
          }}
          style={{ backgroundColor: "#fff" }}
        />
      ),
    };
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      active: "ReceivedInquiry",
      KeyWord: "",
    };
  }

  onSearchHandler = () => {
    const { KeyWord, active } = this.state;
    this.toPage({
      name: "InquirySearchRes",
      params: { keyword: KeyWord, active },
    });
    Cloud.$setArrayStorage(
      Cloud.$CONFIG.ForQuotationSearchRecord,
      KeyWord,
      30
    ).then(() => {
      this.getSearchRecord();
    });
  };
  onChangeText = value => {
    this.setState({
      KeyWord: value,
    });
  };

  // 参数传递进header
  passParameterHandler() {
    const { navigation } = this.props;
    const { onSearchHandler, onChangeText } = this;
    navigation.setParams({
      method: {
        onSearchHandler,
        onChangeText,
      },
    });
  }
  setActive = (active: string) => {
    this.setState({ active });
  };
  onPressDelete = () => {
    Cloud.$removeStorage(Cloud.$CONFIG.ForQuotationSearchRecord).then(() => {
      this.getSearchRecord();
    });
  };

  toPage = ({ name, params }: any) => {
    const { navigation } = this.props;
    navigation.push(name, params);
  };

  getSearchRecord = () => {
    const { SET_FORQUOTATIONSEARCHRECORD } = this.props;
    Cloud.$getStorage(Cloud.$CONFIG.ForQuotationSearchRecord).then(
      ForQuotationSearchRecord => {
        if (ForQuotationSearchRecord) {
          try {
            const SearchRecord = JSON.parse(ForQuotationSearchRecord);
            SET_FORQUOTATIONSEARCHRECORD(SearchRecord);
          } catch (error) {
            Cloud.$addLog("InquirySearch.js-getSearchRecord", error.message);
          }
        } else {
          SET_FORQUOTATIONSEARCHRECORD([]);
        }
      }
    );
  };

  _renderSearchRecords = () => {
    const { active } = this.state;
    // const SearchRecords = ["LM357", "正能量"];
    const { ForQuotationSearchRecord } = this.props;
    return (
      <SearchPane
        title="搜索记录"
        onPressDelete={this.onPressDelete}
        style={styles.maskStyle}
      >
        <View style={{ height: Height - HeaderHeightInit - 85 }}>
          <ScrollView style={[{ flex: 1 }]} keyboardShouldPersistTaps="handled">
            {ForQuotationSearchRecord.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.hotrow}
                  activeOpacity={0.8}
                  onPress={() => {
                    this.setState(
                      {
                        KeyWord: item,
                      },
                      () => {
                        this.onSearchHandler();
                      }
                    );
                  }}
                >
                  <View>
                    <Text numberOfLines={1} style={styles.model}>
                      {item}
                    </Text>
                  </View>
                  <Feather.Button
                    name={"arrow-up-left"}
                    size={18}
                    color="#999"
                    backgroundColor="transparent"
                    iconStyle={styles.Icon}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SearchPane>
    );
  };
  render() {
    const { active } = this.state;
    const that = this;
    const tabs = [
      {
        value: "我收到的询价",
        key: "ReceivedInquiry",
      },
      {
        value: "我发出的询价",
        key: "OutgoingInquiry",
      },
    ];
    return (
      <View style={styles.SearchPage}>
        <HeaderTabs
          active={active}
          tabs={tabs}
          onChangeHandler={key => {
            this.setActive(key);
          }}
        />
        {this._renderSearchRecords()}
      </View>
    );
  }
  componentWillMount() {
    this.passParameterHandler();
    this.getSearchRecord();
    this.setState({
      active: this.props.navigation.getParam("active"),
    });
  }
}
const styles = StyleSheet.create({
  SearchPage: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  HeaderRight: {
    marginRight: 10,
  },
  SearchInputBox: {
    height: 32,
    flex: 1,
    marginRight: 10,
  },
  SearchInput: {
    borderRadius: 0,
    lineHeight: 32,
  },
  FontAwesome: {
    paddingLeft: 5,
    paddingRight: 5,
    color: "#999",
  },
  lineBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  verticalline: {
    width: 1,
    height: 20,
    backgroundColor: "#E6E6E6",
    marginLeft: 4,
    marginRight: 8,
  },
  maskStyle: {
    flex: 1,
    marginTop: 8,
  },
  hotrow: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 12,
    paddingRight: 8,
  },
  model: {
    maxWidth: 240,
  },
  Icon: {
    marginRight: 0,
  },
});

const mapStateToProps = (state, props) => {
  return Object.assign(
    {},
    { ForQuotationSearchRecord: state.ForQuotationSearchRecord },
    props
  );
};
const mapDispatchToProps = dispatch => {
  return {
    SET_FORQUOTATIONSEARCHRECORD: ForQuotationSearchRecord => {
      return dispatch({
        type: "SET_FORQUOTATIONSEARCHRECORD",
        ForQuotationSearchRecord,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InquirySearch);
