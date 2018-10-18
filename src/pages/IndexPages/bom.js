import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import {getStorage} from '@src/utils';
import CONFIG from '@src/utils/config';
import {
  HeaderTitle,
  HeaderRight,
  ZnlInput,
  ZnlButton
} from '@components';
import {PR} from '@src/utils/system'

class Bom extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = async ({ navigation }) => {
    const onPress = () => {
      navigation.getParam('rootnav').openDrawer();
    }
    const AvatarPath = await getStorage(CONFIG.AvatarPath);
    const defaultUrl = 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4001431513,4128677135&fm=26&gp=0.jpg';
    const URL = AvatarPath ? `https:${AvatarPath}` : defaultUrl;
    console.log(URL);
    const headerLeft = (
      <TouchableOpacity
      activeOpacity={0.8}
      onPress={ onPress }>
        <Image 
        style={styles.headerLeftImg}
        source={{
          uri: 'http://bom-ai-read.oss-cn-shenzhen.aliyuncs.com/makesureFile/eBPk33_1539748592007.png'
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
  componentWillMount() {
    const {
      navigation,
      rootnav
    } = this.props;
    navigation.setParams({rootnav});
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
        <View style={styles.SearchBox}>
          <ZnlInput />
          <ZnlButton style={styles.SearchButtton}>
            搜索
          </ZnlButton>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  SearchButtton: {
    borderRadius: 0,
    backgroundColor: '#ee7700',
    width: 100
  }
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, {rootnav: state.Navigations.rootnav}, props);
}

export default connect(
  mapStateToProps
)(Bom);