import React, {Component} from 'react';
import {View, StyleSheet,TextInput, TouchableOpacity, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import SearchPane from '@components/IndexPages/SearchPane';
import CONFIG from '@src/utils/config';
import {
  ZnlInput,
  ZnlButton,
  ZnlHeader,
  HeaderTitle,
  HeaderRight,
} from '@components';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      KeyWord: '',
      SearchRecord: null,
      HotModelList: []
    }
  }
  static navigationOptions = ({ navigation }) => {
    const method = navigation.getParam('method', {});
    return {
      // headerBackTitle: null,
      headerTitle: (
        <ZnlInput 
          style={styles.SearchInputBox} 
          inputStyle={styles.SearchInput} 
          autoFocus={true}
          returnKeyType="search"
          onSubmitEditing={method.onSearchHandler}
          onChangeText={method.onChangeText}
          placeholder="请输入型号进行搜索">
          <FontAwesome 
            name={'search'} 
            size={ 24 } 
            style={styles.FontAwesome}/>
        </ZnlInput>
      ),
      // headerRight: <HeaderRight style={styles.HeaderRight} title="取消" onPress={method.cancelHandler}/>,
      headerStyle: {
        backgroundColor: '#fff',
        borderWidth: 0
      },
    };
  };
  cancelHandler = () => {
    const {SwitchNav} = this.props;
    SwitchNav.navigate('TabNav');
  }
  onPressDelete = () => {
    Cloud.$removeStorage(CONFIG.KeyWords).then(() => {
      this.getSearchRecord();
    })
  }
  onPressKeywords = (KeyWord) => {
    this.setState({KeyWord}, () => {
      this.onSearchHandler();
    });
  }
  onSearchHandler = () => {
    const {KeyWord} = this.state;
    Cloud.$setArrayStorage(Cloud.$CONFIG.KeyWords, KeyWord, 8).then(() => {
      this.getSearchRecord();
    });
    this.props.navigation.push('SearchPageDetail', {KeyWord});
  }
  onChangeText = (value) => {
    this.setState({
      KeyWord: value
    })
  }
  getSearchRecord() {
    let SearchRecord = null;
    Cloud.$getStorage(CONFIG.KeyWords).then(data => {
      if (data) {
        SearchRecord = JSON.parse(data).map((item, index) => {
          return (
            <ZnlButton 
              onPress={() => this.onPressKeywords(item)}
              style={styles.searchBoxTag} 
              textStyle={styles.searchBoxTagText}
              key={index}>
              {item}
            </ZnlButton>
          )
        })
      }
      this.setState({SearchRecord})
    })
  }
  // 热搜
  gethotmodelandgdspotcheck() {
    Cloud.$post('appget/gethotmodelandgdspotcheck?count=10', null, {onlydata: false}).then(data => {
      if (data.Code === 200) {
        this.setState({
          HotModelList: data.Result.HotModelList
        })
      }
    })
  }
  // 参数传递进header
  passParameterHandler() {
    const {navigation} = this.props;
    const {
      onSearchHandler,
      onChangeText,
      cancelHandler
    } = this;
    navigation.setParams({method: {
      onSearchHandler,
      onChangeText,
      cancelHandler
    }})
  }
  render() {
    const {SearchRecord, HotModelList} = this.state;
    return (
      <View style={styles.SearchPage}>
        <SearchPane title="搜索记录" onPressDelete= {this.onPressDelete}>
          <View style={styles.searchBox}>
            {SearchRecord}
          </View>
        </SearchPane>
        <SearchPane title="热搜型号" showDeleteIcon={false}>
          <View style={styles.searchBox}>
            {
              HotModelList.map((item, index) => {
                return (
                  <ZnlButton 
                    onPress={() => this.onPressKeywords(item)}
                    style={styles.searchBoxTag} 
                    textStyle={styles.searchBoxTagText}
                    key={index}>
                    {item}
                  </ZnlButton>
                )
              })
            }
          </View>
        </SearchPane>
      </View>
    )
  }
  componentWillMount() {
    this.getSearchRecord(); // 处理搜索记录
    this.gethotmodelandgdspotcheck(); // 获取热搜
    this.passParameterHandler();
    const {navigation} = this.props;
    // SetSearchStackNav(navigation);
    this.willFocusListener = navigation.addListener('willFocus', this.willFocusHandler);
  }
  componentWillUnmount() {
    this.willFocusListener.remove();
  }
  willFocusHandler = () => {
      const {SetIsTabBarShow} = this.props;
      SetIsTabBarShow(false);
  }
}
const styles = StyleSheet.create({
  SearchPage: {
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#fff',
    flex: 1
  },
  HeaderRight: {
    marginRight: 10,
  },
  SearchInputBox: {
    height: 40,
    flex: 1,
    paddingRight: 20
  },
  SearchInput: {
    borderRadius: 10,
    paddingLeft: 40,
    // borderWidth: 0,
    // borderBottomWidth: 1,
  },
  FontAwesome: {
    position: 'absolute',
    left: 10,
    top: 8,
    color: '#999'
  },
  // cancelBtn: {
  //   marginLeft: 10
  // },
  cancelText: {
    fontSize: 20,
    lineHeight: 46,
  },
  searchBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  searchBoxTag: {
    marginRight: 10,
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 2,
    marginBottom: 10,
    width: 'auto'
  },
  searchBoxTagText: {
    color: '#666'
  }
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, 
    {
      SwitchNav: state.Navigations.SwitchNav 
    }, 
    props);
}
const mapDispatchToProps = (dispatch) => {
  return {
    SetIsTabBarShow: (IsTabBarShow) => {
        return dispatch({
            type: 'SetIsTabBarShow',
            IsTabBarShow
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);