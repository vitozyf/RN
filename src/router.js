import React, { Component } from 'react';
import Home from './slide/Home';
import SecondPage from './slide/SecondPage';
import ThirdPage from './slide/ThirdPage';
import FourthPage from './slide/FourthPage';
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
    page2: {screen: SecondPage},
    page3: {screen: ThirdPage},
    page4: {screen: FourthPage}
},{
     initialRouteName: 'Home',
     drawerPosition: 'left',
     swipeEnabled: true,
     animationEnabled: true,
     lazy: false,
     tabBarPosition:'bottom',
 });