import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
// import CONFIG from '@src/utils/config';
import {
  ZnlInput,
  ZnlHeader
} from '@components';
import SerchList from './SerchList';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Keyword: 'LM358',
      PageIndex: 1,
      PageSize: 20,
      YunExtStocks: [],
      datas: [],
      SupplierProducts: [],
      StartIndex: 0,
      ActiveTab: 'yunext',
      error: false,
      errorInfo: '',
      isLoading: false,
      showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
      isRefreshing: false,

    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  cancelHandler = () => {
    const {SwitchNav} = this.props;
    SwitchNav.navigate('TabNav');
  }
  onSearchHandler = (name = 'yunext') => {
    const {
      PageIndex,
      PageSize,
      KeyWord,
      StartIndex
    } = this.state;
    // if (KeyWord) {
    //   // 更新搜索记录
    //   Cloud.$setArrayStorage(CONFIG.KeyWords, KeyWord, 8).then(() => {
    //     this.getSearchRecord();
    //   })
    // }
    const serchData = {
      PageSize,
      KeyWord
    }
    switch (name) {
      case 'yunext':
        serchData.PageIndex = PageIndex;
        break;
      case 'supplierproduct':
        serchData.StartIndex = StartIndex;
        break;
      default:
        serchData.PageIndex = PageIndex;
        break;
    }
    Cloud.$post(`appget/${name}`, serchData).then(data => {
      if (data) {
        this.setState({
          error: false
        })
        const YunExtStocks = data.YunExtStocks;
        const SupplierProducts = data.Parts;
        switch (name) {
          case 'yunext':
            this.setState({
              datas: YunExtStocks ? YunExtStocks.Data.ResultList : []
            })
            break;
          case 'supplierproduct':
            this.setState({
              datas: SupplierProducts ? SupplierProducts.Data.ResultList : []
            })
          default:
            break;
        }
      }
    }).catch(err => {
      this.setState({
        error: true,
        errorInfo: err.Message || err
      })
    })
  }
  onChangeText = (value) => {
    this.setState({
      Keyword: value
    })
  }
  goBack = () => {
    this.props.navigation.goBack();
  }
  setActiveTab = (ActiveTab = 'yunext') => {
    this.setState({
      ActiveTab
    }, () => {
      this.onSearchHandler(ActiveTab)
    })
  }
  addPageIndexHandler = (PageIndex) => {
    this.setState({
      PageIndex
    }, () => {
      this.onSearchHandler();
    })
  }
  setShowFoot = (showFoot) => {
    this.setState({
      showFoot
    })
  }
  render() {
    const {
      datas, 
      ActiveTab, 
      KeyWord, 
      error, 
      errorInfo,
       PageIndex, 
       showFoot, 
       isLoading,
       isRefreshing} = this.state; 
    return (
      <View style={styles.SearchPage}>
        <ZnlHeader
          leftIcon="md-close"
          onPressIcon={this.goBack}
          centerElement={
            (
              <ZnlInput 
                style={styles.SearchInput} 
                returnKeyType="search"
                onSubmitEditing={this.onSearchHandler}
                onChangeText={this.onChangeText}
                defaultValue={KeyWord}
                placeholder="请输入型号进行搜索">
                <FontAwesome 
                  name={'search'} 
                  size={ 24 } 
                  style={styles.FontAwesome}/>
              </ZnlInput>
            )
          }
          rightElement={
            (
            <TouchableOpacity 
              onPress={ this.cancelHandler }  
              style={styles.cancelBtn} 
              activeOpacity={1}>
              <Text style={styles.cancelText}>取消</Text>
            </TouchableOpacity>
            )
          }
          />

        <View>
          <SerchList 
            datas={datas} 
            ActiveTab={ActiveTab}
            setActiveTab={this.setActiveTab}
            error={error}
            errorInfo={errorInfo} 
            PageIndex = {PageIndex}
            addPageIndexHandler = {this.addPageIndexHandler}
            setShowFoot = {this.setShowFoot}
            showFoot = {showFoot}
            isLoading = {isLoading}
            isRefreshing = {isRefreshing}
            />
        </View>

      </View>
    )
  }
  componentWillMount() {
    const {SetSearchStackNav, navigation} = this.props;
    SetSearchStackNav(navigation);
    const KeyWord = navigation.getParam('KeyWord', '')
    this.setState({
      KeyWord
    }, () => {
      this.onSearchHandler();
    })
  }
}
const styles = StyleSheet.create({
  SearchPage: {
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
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
  SearchInput: {
    height: 48,
    borderRadius: 10,
    paddingLeft: 40,
    flex: 1,
  },
  FontAwesome: {
    position: 'absolute',
    left: 10,
    top: 12,
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
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, 
    {
      SearchStackNav: state.Navigations.SearchStackNav,
      SwitchNav: state.Navigations.SwitchNav 
    }, 
    props);
}
const mapDispatchToProps = (dispatch) => {
  return {
    SetSearchStackNav : (SearchStackNav) => {
      return dispatch({
        type: 'SetSearchStackNav',
        SearchStackNav
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);