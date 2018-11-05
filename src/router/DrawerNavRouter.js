import React, { Component } from 'react';
import Home from '@router/router-pages/Home'; // 首页
import Login from '@router/router-pages/Login'; // 登录
import Register from '@router/router-pages/Register'; // 注册
import BaseInfo from '@router/router-pages/BaseInfo'; // 基本信息
import Membership from '@router/router-pages/Membership'; // 会员身份
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import {
    createDrawerNavigator
} from 'react-navigation';
import {connect} from 'react-redux';

const Height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  containerbox: {
    height: Height,
    // backgroundColor: '#ccc',
  },
  header: {
    // backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    // paddingLeft: 10,
    paddingRight: 10,
  },
  headerLeftImg: {
    marginLeft: 10,
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  headerName: {

  },
  NickName: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  UserIdentity: {
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: '#048FE0',
    color: '#fff',
    borderRadius: 3,
  },
  ioscontainer: {
    // height: '100%'
  },
  container: {
    height: Height - 30,
    // height: Height,
    // justifyContent: 'space-between',
  },
  footer: {
    // backgroundColor: '#f2f2f2',
    position: 'absolute',
    bottom: 1,
    height: 50,
  }
});

const items = [
  // {
  //   key: "Home",
  //   routeName: 'HOme'
  // },
  {
    key: "BaseInfo",
    routeName: 'BaseInfo'
  },
  {
    key: "Membership",
    routeName: 'Membership'
  },
  {
    key: "Register",
    routeName: 'Register'
  },
  {
    key: "Login",
    routeName: 'Login'
  }
]


class MyScrollView extends Component {
  // toLogin = () => {
  //   const {mynavigation} = this.props;
  //   Cloud.$clearAllStorage().then(() => {
  //     mynavigation.navigate('Login'); 
  //   });
  // }
  toBaseInfo = () => {
    const {mynavigation} = this.props;
    mynavigation.navigate('BaseInfo'); 
  }
  toMembership = () => {
    const {mynavigation} = this.props;
    mynavigation.navigate('Membership'); 
  }
  render() {
    const {AvatarPath, NickName, UserIdentity} = this.props;
    // console.log(11111, AvatarPath)
    // 用户身份
    let UserIdentityView = [];
     for (const key in UserIdentity) {
       if (UserIdentity[key]) {
        // UserIdentityView.push(<Text style={styles.UserIdentity} key={key}>{key}</Text>)
        UserIdentityView[0] = (<Text onPress={this.toMembership} style={styles.UserIdentity} key={key}>{key}</Text>)
       }

    }
    // 自定义区域
    const CustomDrawer = (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.toBaseInfo}
          activeOpacity={1}
          style={styles.header}>
          <Image 
            style={styles.headerLeftImg}
            source={{
              uri: AvatarPath
            }} />
          <View  style={styles.headerName}>
              <Text style={styles.NickName}>{NickName}</Text>
              <View>
                {UserIdentityView}
              </View>
          </View> 
        </TouchableOpacity>
    
        <DrawerItems {...this.props} items={items}/>
    
        {/* <View style={styles.footer}>
          <Text onPress = {this.toLogin}>登录</Text>
        </View>  */}
      </View>
    );
    // IOS外层包裹安全区域
    const Container = Cloud.$ISIOS ? (
      <SafeAreaView style={styles.ioscontainer} forceInset={{ top: 'always', horizontal: 'never' }}>
        {CustomDrawer}
      </SafeAreaView>
    ) : CustomDrawer;

    return (
      <ScrollView style={styles.containerbox}>
        {Container}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, props) => {
  return Object.assign({}, {
    AvatarPath: state.UserInfo.AvatarPath, 
    NickName: state.UserInfo.NickName, 
    UserIdentity: state.UserInfo.UserIdentity
  }, props);
}

const MyScrollViewWithConnect = connect(
  mapStateToProps
)(MyScrollView);

const CustomDrawerContentComponent = (props) => {
  const {navigation} = props;
  return (<MyScrollViewWithConnect mynavigation = {navigation} {...props}/>);
};

export default class Pages extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <SimpleAppNavigator />
        )
    }
}
const SimpleAppNavigator = createDrawerNavigator({
    Home: {screen: Home},
    Login: {screen: Login},
    Register: {screen: Register},
    BaseInfo: {screen: BaseInfo},
    Membership: {screen: Membership}
},{
     initialRouteName: 'Home',
     drawerPosition: 'left',
     contentComponent: CustomDrawerContentComponent,
     swipeEnabled: true,
     animationEnabled: true,
     lazy: true,
     tabBarPosition:'bottom',
 });

