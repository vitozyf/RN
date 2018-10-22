import React, { Component } from 'react';
import Home from '@router/router-pages/Home';
import Login from '@router/router-pages/Login';
import ThirdPage from '@router/router-pages/ThirdPage';
import FourthPage from '@router/router-pages/FourthPage';
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
    page3: {screen: ThirdPage},
    page4: {screen: FourthPage}
},{
     initialRouteName: 'Home',
     drawerPosition: 'left',
     swipeEnabled: true,
     animationEnabled: true,
     lazy: true,
     tabBarPosition:'bottom',
 });