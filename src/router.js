import React, { Component } from 'react';
import Home from '@src/slide/Home';
import Login from '@src/slide/Login';
import ThirdPage from '@src/slide/ThirdPage';
import FourthPage from '@src/slide/FourthPage';
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