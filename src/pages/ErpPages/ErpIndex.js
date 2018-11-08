import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
// import Icon from '@components/Iconfont/CloudIcon'

import {
  HeaderTitle,
  HeaderRight,
} from '@components';
class HeaderLeft extends Component {
  onPress = () => {
    const {DrawerNav} = this.props;
    DrawerNav.openDrawer();
  }
  render() {
    const { AvatarPath } = this.props;
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

class ErpIndex extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <HeaderTitle title="ERP" textStyle={{color: '#fff'}}/>
      ),
      headerLeft: <HeaderLeftCom />,
      headerRight: <HeaderRight />
    };
  };
  toErpList(name) {
    // const {DrawerNav} = this.props;
    // console.log(DrawerNav)
    // SwitchNav.push('ErpList', {name});

    const {navigation} = this.props;
    // navigation.dispatch('keyboardDidHide');
    navigation.push('ErpList', {name});
    // console.log('keyboardDidHide', navigation)
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={() => {this.toErpList('StkStock')}}>
          <Feather style={styles.icon} name="box" size={20} />
          <Text style={styles.title}>库存</Text>
          <AntDesign style={styles.icon} name="right" size={20}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={() => {this.toErpList('StkInRecord')}}>
          <Feather style={styles.icon} name="box" size={20} />
          {/* <Text style={{fontFamily:'iconfont', fontSize: 20}}>&#xe6ee;</Text> */}
          
          <Text style={styles.title}>入库</Text>
          <AntDesign style={styles.icon} name="right" size={20}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={() => {this.toErpList('StkOutByModel')}}>
          <Feather style={styles.icon} name="box" size={20} />
          <Text style={styles.title}>出库</Text>
          <AntDesign style={styles.icon} name="right" size={20}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={() => {this.toErpList('StkInquireRecord')}}>
          <Feather style={styles.icon} name="box" size={20} />
          <Text style={styles.title}>询价</Text>
          <AntDesign style={styles.icon} name="right" size={20}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={() => {this.toErpList('HisofferpriceByModel')}}>
          <Feather style={styles.icon} name="box" size={20} />
          <Text style={styles.title}>报价</Text>
          <AntDesign style={styles.icon} name="right" size={20}/>
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
  row: {
    borderBottomWidth: 1,
    borderColor: '#E6E6E6',
    height: 50,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  title: {
    flex: 1,
    fontSize: 20,
    // textAlign: 'left',
  },  
  icon: {
    width: 50,
    textAlign: 'center',
    color: '#999',
    fontWeight: 'bold',
  }
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, {DrawerNav: state.Navigations.DrawerNav}, props);
}

export default connect(
  mapStateToProps
)(ErpIndex);