import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import SearchPane from '@components/IndexPages/SearchPane';
import CONFIG from '@src/utils/config';
import {
  ZnlInput,
  ZnlButton,
  ZnlHeader
} from '@components';

class SearchPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  
  render() {
    return (
      <View style={styles.SearchPage}>
      
      </View>
    )
  }
  componentWillMount() {
    this.getSearchRecord(); // 处理搜索记录
    this.gethotmodelandgdspotcheck(); // 获取热搜
    const {SetSearchStackNav, navigation} = this.props;
    SetSearchStackNav(navigation);
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