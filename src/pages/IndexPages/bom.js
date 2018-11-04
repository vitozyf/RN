import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import {PR} from '@src/utils/system'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  HeaderTitle,
  HeaderRight,
  ZnlInput,
} from '@components';
class HeaderLeft extends Component {
  onPress = () => {
    const {DrawerNav} = this.props;
    DrawerNav.openDrawer();
  }
  render() {
    const { AvatarPath } = this.props;
    // console.log(22222, AvatarPath)
    return (
      <TouchableOpacity
      activeOpacity={0.8}
      onPress={ this.onPress }>
        <Image 
        style={styles.headerLeftImg}
        source={{
          uri: AvatarPath
        }} />
      </TouchableOpacity>
    )
  }
}

const HeaderLeftCom = connect((state, props) => {
  return Object.assign({}, {DrawerNav: state.Navigations.DrawerNav}, state.UserInfo, props);
})(HeaderLeft)

class Bom extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // title: '首页 | BomAi',
      headerTitle: (
        <HeaderTitle title="首页 | BomAi" textStyle={{color: '#fff'}}/>
      ),
      headerLeft: <HeaderLeftCom />,
      headerRight: <HeaderRight />
    };
  };
  toSearchPage = () => {
    const {SwitchNav, navigation} = this.props;
    SwitchNav.navigate('SearchPage');
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.ImgBox}>
          <Image 
          style={styles.HomeLogo}
          source={{
            uri: 'http://bom-ai-read.oss-cn-shenzhen.aliyuncs.com/makesureFile/eBPk33_1539748592007.png',
            cache: 'force-cache'
            }} />
        </View>
        <TouchableOpacity 
          style={styles.SearchBox} 
          onPress={this.toSearchPage}
          activeOpacity={1}>
          {/* <ZnlInput 
            style={styles.SearchInputBoxStyle} 
            inputStyle={styles.SearchInputStyle} 
            editable={false}> */}
            <FontAwesome
              name={'search'}
              size={ 24 }
              style={styles.FontAwesome}/>
          {/* </ZnlInput> */}
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerLeftImg: {
    width: 40, 
    height: 40,
    borderRadius: 20,
    marginLeft: 10
  },
  HomeLogo: {
    width: 432 / PR, 
    height: 80 / PR,
  },
  ImgBox: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 150,
    paddingBottom: 30
  },
  SearchBox: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row',
    // borderWidth: 1,
    // height: 50
    paddingLeft: 40,
    borderRadius: 10,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#ee7700',
    height: 40,
    marginLeft: 30,
    marginRight: 30,
  },
  SearchInputBoxStyle: {
    width: 300,
    height: 40,
  },
  SearchInputStyle: {
    paddingLeft: 40,
    borderRadius: 10,
  },
  FontAwesome: {
    position: 'absolute',
    left: 10,
    top: 8,
    color: '#999'
  }
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, {SwitchNav: state.Navigations.SwitchNav}, props);
}

export default connect(
  mapStateToProps
)(Bom);