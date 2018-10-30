import React, { Component } from 'react';
import Home from '@router/router-pages/Home';
import Login from '@router/router-pages/Login';
import Register from '@router/router-pages/Register';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import {
    createDrawerNavigator
} from 'react-navigation';

const styles = StyleSheet.create({
  containerbox: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  header: {
    backgroundColor: '#f2f2f2',
    height: 50,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
    height: '100%'
  },
  footer: {
    backgroundColor: '#f2f2f2',
    height: 50,
    flex: 1,
  }
});

const CustomDrawerContentComponent = (props) => {
  const {navigation} = props;
  const items = [
    {
      key: "Home",
      routeName: 'Home'
    }
  ]
  return (
    <ScrollView style={styles.containerbox}>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.header}>
          {/* <Image 
            style={styles.headerLeftImg}
            source={{
              uri: AvatarPath
            }} /> */}
        </View>

        <DrawerItems {...props} items={items}/>

        <View style={styles.footer}>
          <Text onPress = {() => {navigation.navigate('Login')}}>登录</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
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
    Register: {screen: Register}
},{
     initialRouteName: 'Home',
     drawerPosition: 'left',
     contentComponent: CustomDrawerContentComponent,
     swipeEnabled: true,
     animationEnabled: true,
     lazy: true,
     tabBarPosition:'bottom',
 });

