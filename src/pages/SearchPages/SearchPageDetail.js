import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {$post, setArrayStorage} from '@src/utils';
import CONFIG from '@src/utils/config';
import {
  ZnlInput,
  ZnlButton
} from '@components';
import SerchList from './SerchList';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Keyword: '',
      PageIndex: 1,
      PageSize: 20,
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
  onSubmitEditing = () => {
    const {
      PageIndex,
      PageSize,
      Keyword
    } = this.state;
    if (Keyword) {
      // 更新搜索记录
      setArrayStorage(CONFIG.KeyWords, Keyword, 8)
    }
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
  goBack = () => {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={styles.SearchPage}>
        <View style={styles.SearchBox}>
          <Ionicons.Button 
          name = "ios-arrow-back" 
          size = {26} 
          backgroundColor="transparent" 
          color="#666"
          iconStyle={styles.iconStyle}
          onPress={ this.goBack }/>
          <ZnlInput 
            style={styles.SearchInput} 
            returnKeyType="search"
            onSubmitEditing={this.onSubmitEditing}
            onChangeText={this.onChangeText}
            placeholder="请输入型号进行">
            <FontAwesome 
              name={'search'} 
              size={ 24 } 
              style={styles.FontAwesome}/>
          </ZnlInput>
          <TouchableOpacity onPress={ this.cancelHandler }  style={styles.cancelBtn} activeOpacity={1}>
            <Text style={styles.cancelText}>取消</Text>
          </TouchableOpacity>
        </View>

        <View>
          <SerchList />
        </View>

      </View>
    )
  }
  componentWillMount() {
    const {SetSearchStackNav, navigation} = this.props;
    SetSearchStackNav(navigation);
  }
}
const styles = StyleSheet.create({
  SearchPage: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1
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