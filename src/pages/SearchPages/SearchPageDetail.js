import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {BackTop} from '@components';

import {
  ZnlInput,
} from '@components';
import SerchList from './SerchList';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Keyword: 'LM358',
      PageIndex: 1,
      PageSize: 20,
      TotalCount: 0,
      TotalPage: 1,
      YunExtStocks: [],
      datas: [],
      SupplierProducts: [],
      StartIndex: 0,
      ActiveTab: 'yunext',
      showFoot: 0,
      isLoading: false,
      showHeader: true
    }
  }
  static navigationOptions = ({ navigation }) => {
    const method = navigation.getParam('method', {});
    return {
      headerTitle: (
        <ZnlInput 
          style={styles.SearchInputBox} 
          inputStyle={styles.SearchInput} 
          returnKeyType="search"
          onSubmitEditing={() => method.onSearchHandler(method.ActiveTab)}
          onChangeText={method.onChangeText}
          defaultValue={method.KeyWord}
          placeholder="请输入型号进行搜索">
          <FontAwesome 
            name={'search'} 
            size={ 24 } 
            style={styles.FontAwesome}/>
        </ZnlInput>
      ),
      // headerRight: <HeaderRight style={styles.HeaderRight}/>,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleStyle: {
        color: '#333',
      },
    };
  };
  onSearchHandler = (name = 'yunext', isconcat) => {
    const {
      PageIndex,
      PageSize,
      KeyWord,
      StartIndex,
      datas
    } = this.state;
    // if (KeyWord) {
    //   // 更新搜索记录
    //   Cloud.$setArrayStorage(CONFIG.KeyWords, KeyWord, 8).then(() => {
    //     this.getSearchRecord();
    //   })
    // }
    this.setState({isLoading: true});
    const serchData = {
      PageSize,
      KeyWord
    }
    let searchApi = {searchApi: false};
    let onlydata = {onlydata: true};
    let url = '';
    switch (name) {
      case 'yunext':
        serchData.PageIndex = PageIndex;
        url = `appget/${name}`;
        break;
      case 'getyunexttopstocks':
        serchData.StartIndex = StartIndex;
        searchApi.searchApi = true;
        onlydata.onlydata = false;
        url = `${name}`
        break;
      default:
        serchData.PageIndex = PageIndex;
        break;
    }
    Cloud.$post(url, serchData, {loading: true, ...searchApi, ...onlydata}).then(data => {
      this.setState({isLoading: false});
      if (data) {
        let PageIndex;
        let TotalCount;
        let TotalPage;
        let StartIndex;
        let Datas = [];
        switch (name) {
          case 'yunext':
            const YunExtStocks = data.YunExtStocks;
            PageIndex = YunExtStocks ? YunExtStocks.Data.PageIndex : 1;
            TotalCount = YunExtStocks ? YunExtStocks.Data.TotalCount : 1;
            TotalPage = YunExtStocks ? YunExtStocks.Data.TotalPage : 1;
            Datas = YunExtStocks ? YunExtStocks.Data.ResultList : [];
            this.setState({
              datas: isconcat ? datas.concat(Datas) : Datas,
              PageIndex,
              StartIndex: 0,
              TotalCount,
              TotalPage
            })
            if (PageIndex === TotalPage) {
              this.setState({
                showFoot: 1
              })
            } else {
              this.setState({
                showFoot: 0
              })
            }
            break;
          case 'getyunexttopstocks':
            const SupplierProducts = data.Result.Data.SpotStockResult.Data;
            StartIndex = SupplierProducts ? SupplierProducts.SartIndex : 0;
            TotalCount = SupplierProducts ? SupplierProducts.TotalCount : 0;
            Datas = SupplierProducts ? SupplierProducts.ResultList : [],
            this.setState({
              datas: isconcat ? datas.concat(Datas) : Datas,
              StartIndex,
              PageIndex: 1,
              TotalCount
            })
            if (StartIndex === TotalCount) {
              this.setState({
                showFoot: 1
              })
            } else {
              this.setState({
                showFoot: 0
              })
            }
            break;
          default:
            break;
        }
      }
    }).catch(err => {
      console.log(err)
    })
  }
  onChangeText = (value) => {
    this.setState({
      KeyWord: value
    })
  }
  setActiveTab = (ActiveTab = 'yunext') => {
    this.setState({
      ActiveTab
    }, () => {
      this.onSearchHandler(ActiveTab)
    })
  }
  setStateHandler = (stateName, value, bc) => {
    this.setState({
      [stateName]: value
    }, () => {
      if (bc) {
        bc();
      }
    })
  }
  // 参数传递进header
  passParameterHandler() {
    const {navigation} = this.props;
    const KeyWord = navigation.getParam('KeyWord', '');
    const {
      ActiveTab
    } = this.state;
    const {
      onChangeText,
      onSearchHandler
    } = this;
    navigation.setParams({method: {
      KeyWord,
      onChangeText,
      onSearchHandler,
      ActiveTab
    }})
  }
  render() {
    const {
      datas,
      ActiveTab,
      KeyWord,
      PageIndex,
      StartIndex,
      TotalCount,
      showFoot,
      isLoading,
    } = this.state;
    return (
      <View style={styles.SearchPage}>
        {/* {Header} */}
        <View>
          <SerchList 
            datas={datas} 
            ActiveTab={ActiveTab}
            setActiveTab={this.setActiveTab}
            PageIndex = {PageIndex}
            StartIndex = {StartIndex}
            TotalCount = {TotalCount}
            isLoading = {isLoading}
            setStateHandler = {this.setStateHandler}
            showFoot = {showFoot}
            onSearchHandler = {this.onSearchHandler}
            style={styles.SerchList}
            />
        </View>

      </View>
    )
  }
  componentWillMount() {
    const {navigation} = this.props;
    this.passParameterHandler();
    const KeyWord = navigation.getParam('KeyWord', '')
    this.setState({
      KeyWord
    }, () => {
      this.onSearchHandler();
    })
    this.didBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload => {
        BackTop.hidden();
      }
    );
  }
  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }
}
const styles = StyleSheet.create({
  SearchPage: {
    // paddingTop: 20,
    // paddingLeft: 5,
    // paddingRight: 5,
    backgroundColor: '#fff',
    flex: 1,
  },
  SearchBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  iconStyle: {
    marginRight: 10,
    width: 10
  },
  SearchInputBox: {
    flex: 1,
    height: 40,
    paddingRight: 20
  },
  SearchInput: {
    borderRadius: 10,
    paddingLeft: 40,
    flex: 1,
  },
  FontAwesome: {
    position: 'absolute',
    left: 10,
    top: 8,
    color: '#999'
  },
  cancelBtn: {
    marginLeft: 10
  },
  cancelText: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 46,
  },
  SerchList: {
    height: '100%',
    paddingBottom: 50
  }
});

const mapStateToProps = (state, props) => {
  return props;
}

export default connect(mapStateToProps)(SearchPage);