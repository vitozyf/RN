import React, {Component} from 'react';
import { View, Text } from 'react-native';
import ZnlButton from '../components/ZnlButton';
import {connect} from 'react-redux';
import {removeAllStorage, $post} from '../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
class Index extends Component{
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: '首页',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <Ionicons name={'md-home'} size={ 20 } color={focused ? '#ee7700' : '#333'} />;
      },
    };
  };
  componentWillMount() {
    console.log('index componentWillMount')
  }
  logout = () => {
    $post('user/logout', null, {onlydata: false})
    .then(() => {
      removeAllStorage();
      this.props.SetIsLogin(false);
    })
  }
  render() {
    const {SetHomeNav, navigation, rootnav} = this.props;
    // this.props.navigation.navigate('DrawerOpen')
    SetHomeNav(navigation);
    console.log(123, this.props, rootnav.openDrawer);
    return (
      <View>
        <Text>
          首页
        </Text>
        <ZnlButton onPress={() => {rootnav.openDrawer()}}>
          跳转到cloud
        </ZnlButton>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  console.log(222, state)
  return Object.assign({}, {rootnav: state.Navigations.rootnav}, props);
}

const mapDispatchToProps = (dispatch) => {
  return {
    SetHomeNav : (homenav) => {
      return dispatch({
        type: 'SetHomeNav',
        homenav
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);