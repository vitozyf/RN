import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import SearchPane from '@components/IndexPages/SearchPane';
import {$post, getStorage, removeStorage, setArrayStorage} from '@src/utils';
import CONFIG from '@src/utils/config';
import {
  ZnlInput,
  ZnlButton
} from '@components';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Keyword: '',
      PageIndex: 1,
      PageSize: 20,
      SearchRecord: null
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
  onPressDelete = () => {
    removeStorage(CONFIG.KeyWords).then(() => {
      this.getSearchRecord();
    })
  }
  onPressKeywords = (Keyword) => {
    // console.log(123, Keyword)
    this.setState({Keyword: Keyword});
    // console.log(222, this.state)
    this.onSubmitEditing();
    console.log(this.props);
    // this.props.SearchStackNav.push('SearchPageDetail');
  }
  onSubmitEditing = () => {
    const {
      PageIndex,
      PageSize,
      Keyword
    } = this.state;
    if (Keyword) {
      // 更新搜索记录
      setArrayStorage(CONFIG.KeyWords, Keyword, 8).then(() => {
        this.getSearchRecord();
      })
    }
    console.log(this.state);
    $post('ic', {
      PageIndex,
      PageSize,
      Keyword
    }).then(data => {
      console.log('data', data);
    }).catch(err => {
      console.log('err', err);
    })
  }
  onChangeText = (value) => {
    this.setState({
      Keyword: value
    })
  }
  getSearchRecord() {
    let SearchRecord = null;
    getStorage(CONFIG.KeyWords).then(data => {
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
  render() {
    const {SearchRecord} = this.state;
    return (
      <View style={styles.SearchPage}>
        <View style={styles.SearchBox}>
          <ZnlInput 
            style={styles.SearchInput} 
            autoFocus={true}
            returnKeyType="search"
            onSubmitEditing={this.onSubmitEditing}
            onChangeText={this.onChangeText}
            placeholder="请输入型号进行搜索">
            <FontAwesome 
              name={'search'} 
              size={ 24 } 
              style={styles.FontAwesome}/>
          </ZnlInput>
          <TouchableOpacity onPress={ this.cancelHandler }  style={styles.cancelBtn} activeOpacity={1}>
            <Text style={styles.cancelText}>取消</Text>
          </TouchableOpacity>
        </View>

        <SearchPane title="搜索记录" onPressDelete={this.onPressDelete}>
          <View style={styles.searchBox}>
            {SearchRecord}
          </View>
        </SearchPane>
        <SearchPane title="热搜型号" showDeleteIcon={false}>
        </SearchPane>
      </View>
    )
  }
  componentWillMount() {
    this.getSearchRecord();
    const {SetSearchStackNav, navigation} = this.props;
    SetSearchStackNav(navigation);
  }
}
const styles = StyleSheet.create({
  SearchPage: {
    padding: 20
  },
  SearchBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10
  },
  SearchInput: {
    width: 260,
    height: 48,
    borderRadius: 10,
    paddingLeft: 40
  },
  FontAwesome: {
    position: 'absolute',
    left: 10,
    top: 12,
    color: '#999'
  },
  cancelBtn: {
  },
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