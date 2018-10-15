import React, { Component } from 'react';
import FirstPage from './test/FirstPage';
import SecondPage from './test/SecondPage';
import ThirdPage from './test/ThirdPage';
import FourthPage from './test/FourthPage';
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