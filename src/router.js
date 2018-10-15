import React, { Component } from 'react';
import FirstPage from './slide/FirstPage';
import SecondPage from './slide/SecondPage';
import ThirdPage from './slide/ThirdPage';
import FourthPage from './slide/FourthPage';
import {
    StackNavigator,
    TabNavigator,
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
    page1: {screen: FirstPage},
    page2: {screen: SecondPage},
    page3: {screen: ThirdPage},
    page4: {screen: FourthPage}
},{
     initialRouteName: 'page1',
     drawerPosition: 'left',
     swipeEnabled: true,
     animationEnabled: true,
     lazy: false,
     tabBarPosition:'bottom',
 });