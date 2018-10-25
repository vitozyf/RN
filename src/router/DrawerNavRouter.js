import React, { Component } from 'react';
import Home from '@router/router-pages/Home';
import Login from '@router/router-pages/Login';
import Register from '@router/router-pages/Register';
import {
    createDrawerNavigator
} from 'react-navigation';
export default class Pages extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <SimpleAppNavigator/>
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
     swipeEnabled: true,
     animationEnabled: true,
     lazy: true,
     tabBarPosition:'bottom',
 });