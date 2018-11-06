import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { 
  createStackNavigator,
} from 'react-navigation';

import SearchPageScreen from '@pages/SearchPages/SearchPage';
import SearchPageDetail from '@pages/SearchPages/SearchPageDetail';


const SearchStackNav = createStackNavigator(
  {
    SearchPage: SearchPageScreen,
    SearchPageDetail: SearchPageDetail
  },
  {
    initialRouteName: 'SearchPage'
  }
)

// const SearchStackNavRouter = class App extends Component {
//   render() {
//     return (
//       <SearchStackNav />
//     );
//   }
// }

export default SearchStackNav;