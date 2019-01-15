/* @flow */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import SearchPane from "@components/IndexPages/SearchPane";
import CONFIG from "@src/utils/config";
import { ZnlHeader, ZnlInput, ZnlButton, HeaderRight } from "@components";

type Props = {
  navigation: INavigation,
  SetBomSearchInfo: Function,
  SetSearchRecord: Function,
  SearchRecord: Array<any>,
};
type State = {
  KeyWord: string,
  HotModelList: Array<any>,
};
class SearchPage extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      KeyWord: "",
      HotModelList: [],
    };
  }
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
          placeholder="请输入型号进行搜索"
          renderLeft={inputRenderLeft}
          autoCapitalize="characters"
        />
      );
    };
    return {
      header: (
        <ZnlHeader
          onPressIcon={() => {
            navigation.goBack();
          }}
          renderCenter={renderCenter}
          renderRight={() => {
            return (
              <HeaderRight
                style={styles.HeaderRight}
                title="搜索"
                onPress={method.onSearchHandler}
              />
            );
          }}
        />
      ),
    };
  };
  onPressDelete = () => {
    Cloud.$removeStorage(CONFIG.KeyWords).then(() => {
      this.getSearchRecord();
    });
  };
  onPressKeywords = KeyWord => {
    this.setState({ KeyWord }, () => {
      this.onSearchHandler();
    });
  };
  onSearchHandler = () => {
    const { KeyWord } = this.state;
    if (KeyWord && KeyWord.length >= 3) {
      Cloud.$setArrayStorage(Cloud.$CONFIG.KeyWords, KeyWord, 8).then(() => {
        this.getSearchRecord();
      });
      this.props.navigation.push("SeatchRes");
      this.props.SetBomSearchInfo({
        KeyWord,
      });
    } else {
      Cloud.$Toast.show("搜索型号必须大于等于3个字符");
    }
  };
  onChangeText = value => {
    this.setState({
      KeyWord: value.toUpperCase(),
    });
  };
  getSearchRecord() {
    let SearchRecord = [];
    const SetSearchRecord = this.props.SetSearchRecord;
    return Cloud.$getStorage(CONFIG.KeyWords).then(data => {
      if (data) {
        SearchRecord = JSON.parse(data).map((item, index) => {
          if (item) {
            return (
              <ZnlButton
                onPress={() => this.onPressKeywords(item)}
                style={styles.searchBoxTag}
                textStyle={styles.searchBoxTagText}
                key={index}
              >
                {item}
              </ZnlButton>
            );
          } else {
            return null;
          }
        });
        SetSearchRecord && SetSearchRecord(SearchRecord);
      } else {
        SetSearchRecord(null);
      }
    });
  }
  // 热搜
  gethotmodelandgdspotcheck() {
    Cloud.$post("appget/gethotmodelandgdspotcheck?count=10", null, {
      onlydata: false,
    }).then(data => {
      if (data && data.Code === 200) {
        this.setState({
          HotModelList: data.Result.HotModelList,
        });
      }
    });
  }
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
  render() {
    const { HotModelList } = this.state;
    const { SearchRecord } = this.props;
    return (
      <View style={styles.SearchPage}>
        {SearchRecord && SearchRecord.length > 0 && (
          <SearchPane title="搜索记录" onPressDelete={this.onPressDelete}>
            <View style={styles.searchBox}>{SearchRecord}</View>
          </SearchPane>
        )}
        <SearchPane title="热搜型号" showDeleteIcon={false}>
          <View style={styles.searchBox}>
            {HotModelList.map((item, index) => {
              return (
                <ZnlButton
                  onPress={() => this.onPressKeywords(item)}
                  style={styles.searchBoxTag}
                  textStyle={styles.searchBoxTagText}
                  key={index}
                >
                  {item}
                </ZnlButton>
              );
            })}
          </View>
        </SearchPane>
      </View>
    );
  }
  componentWillMount() {
    this.getSearchRecord(); // 处理搜索记录
    this.gethotmodelandgdspotcheck(); // 获取热搜
    this.passParameterHandler();
    const { navigation } = this.props;
  }
}
const styles = StyleSheet.create({
  SearchPage: {
    backgroundColor: "#f8f8f8",
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
  // cancelBtn: {
  //   marginLeft: 10
  // },
  cancelText: {
    fontSize: 20,
    lineHeight: 46,
  },
  searchBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchBoxTag: {
    marginRight: 8,
    backgroundColor: "#f5f5f5",
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 2,
    marginBottom: 8,
    height: 32,
    borderWidth: 0,
    width: "auto",
  },
  searchBoxTagText: {
    color: "#666",
    fontSize: 12,
  },
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, { SearchRecord: state.SearchRecord }, props);
};
const mapDispatchToProps = dispatch => {
  return {
    SetBomSearchInfo: BomSearchInfo => {
      return dispatch({
        type: "SetBomSearchInfo",
        BomSearchInfo,
      });
    },
    SetSearchRecord: SearchRecord => {
      return dispatch({
        type: "SetSearchRecord",
        SearchRecord,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
