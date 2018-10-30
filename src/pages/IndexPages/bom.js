import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import {getStorage} from '@src/utils';
import CONFIG from '@src/utils/config';
import {PR} from '@src/utils/system'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  HeaderTitle,
  HeaderRight,
  ZnlInput,
} from '@components';

class Bom extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => {
    const onPress = () => {
      navigation.getParam('DrawerNav').openDrawer();
      // navigation.getParam('DrawerNav').navigate('Login');
    }
    const UserAvatar = navigation.getParam('AvatarPath');
    const defaultUrl = 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4001431513,4128677135&fm=26&gp=0.jpg';
    const AvatarPath = UserAvatar ? `https:${UserAvatar}` : defaultUrl;
    const headerLeft = (
      <TouchableOpacity
      activeOpacity={0.8}
      onPress={ onPress }>
        <Image 
        style={styles.headerLeftImg}
        source={{
          uri: AvatarPath
        }} />
      </TouchableOpacity>
    )
    return {
      title: '首页 | BomAi',
      headerTitle: (
        <HeaderTitle title="首页 | BomAi"/>
      ),
      headerLeft,
      headerRight: <HeaderRight />
    };
  };
  toSearchPage = () => {
    const {SwitchNav} = this.props;
    SwitchNav.navigate('SearchPage');
  }
  componentWillMount() {
    const {
      navigation,
      DrawerNav
    } = this.props;
    getStorage(CONFIG.AvatarPath).then(AvatarPath => {
      navigation.setParams({DrawerNav, AvatarPath});
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.ImgBox}>
          <Image 
          style={styles.HomeLogo}
          source={{
            uri: 'http://bom-ai-read.oss-cn-shenzhen.aliyuncs.com/makesureFile/eBPk33_1539748592007.png',
            cache: 'force-cache'
            }} />
        </View>
        <TouchableOpacity 
          style={styles.SearchBox} 
          onPress={this.toSearchPage}
          activeOpacity={1}>
          <ZnlInput 
            style={styles.SearchInput} 
            editable={false}>
            <FontAwesome
              name={'search'}
              size={ 24 }
              style={styles.FontAwesome}/>
          </ZnlInput>
        </TouchableOpacity>
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
  },
  HomeLogo: {
    width: 432 / PR, 
    height: 80 / PR,
  },
  ImgBox: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 150,
    paddingBottom: 30
  },
  SearchBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  SearchInput: {
    width: 300,
    height: 40,
    borderRadius: 10,
    paddingLeft: 40
  },
  FontAwesome: {
    position: 'absolute',
    left: 10,
    top: 8,
    color: '#999'
  }
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, {SwitchNav: state.Navigations.SwitchNav, DrawerNav: state.Navigations.DrawerNav}, props);
}

export default connect(
  mapStateToProps
)(Bom);