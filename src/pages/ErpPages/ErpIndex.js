import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {connect} from 'react-redux';

import {
  HeaderTitle,
  HeaderRight,
} from '@components';
class HeaderLeft extends Component {
  onPress = () => {
    const {DrawerNav} = this.props;
    DrawerNav.openDrawer();
  }
  render() {
    const { AvatarPath } = this.props;
    return (
      <TouchableOpacity
      activeOpacity={0.8}
      onPress={ this.onPress }>
        <Image 
        style={styles.headerLeftImg}
        source={{
          uri: AvatarPath
        }} />
      </TouchableOpacity>
    )
  }
}

const HeaderLeftCom = connect((state, props) => {
  return Object.assign({}, {DrawerNav: state.Navigations.DrawerNav}, state.UserInfo, props);
})(HeaderLeft)

class ErpIndex extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <HeaderTitle title="ERP" textStyle={{color: '#fff'}}/>
      ),
      headerLeft: <HeaderLeftCom />,
      headerRight: <HeaderRight />
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>1111</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerLeftImg: {
    width: 40, 
    height: 40,
    borderRadius: 20,
    marginLeft: 10
  }
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, {SwitchNav: state.Navigations.SwitchNav}, props);
}

export default connect(
  mapStateToProps
)(ErpIndex);