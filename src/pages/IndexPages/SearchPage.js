import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import SearchPane from '@components/IndexPages/SearchPane';
import {
  ZnlInput,
} from '@components';

class SearchPage extends Component {
  onPress = () => {
    const {SwitchNav} = this.props;
    SwitchNav.navigate('TabNav');
  }
  render() {
    return (
      <View style={styles.SearchPage}>
        <View style={styles.SearchBox}>
          <ZnlInput 
            style={styles.SearchInput} 
            onFocus={this.onFocus}
            placeholder="请输入型号进行搜索">
            <FontAwesome 
              name={'search'} 
              size={ 24 } 
              style={styles.FontAwesome}/>
          </ZnlInput>
          <TouchableOpacity onPress={ this.onPress }  style={styles.cancelBtn}>
            <Text style={styles.cancelText}>取消</Text>
          </TouchableOpacity>
        </View>

        <SearchPane title="搜索记录"></SearchPane>
        <SearchPane title="热搜型号"></SearchPane>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  SearchPage: {
    paddingTop: 10
  },
  SearchBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  SearchInput: {
    width: 280,
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
    marginLeft: 10,
    width: 50,
  },
  cancelText: {
    fontSize: 20,
    lineHeight: 46,
  }
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, {SwitchNav: state.Navigations.SwitchNav}, props);
}

export default connect(mapStateToProps)(SearchPage);