import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {ZnlButton, ZnlModal} from '@components';
import Modal from "react-native-modal";
import {
  HeaderTitle,
  HeaderRight,
} from '@components';

class BaseInfoScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const goBack = () => {
      const DrawerNav = navigation.getParam('DrawerNav', {});
      DrawerNav.navigate('Home');
    }
    return {
      headerTitle: (
        <HeaderTitle title="基本信息"/>
      ),
      headerLeft: (
        <Icon.Button 
        size={26}
        name = 'md-arrow-back'
        backgroundColor="#fff"
        color="#333"
        iconStyle={{marginLeft: 5}}
        onPress={goBack}/>
      ),
      headerRight: <HeaderRight />
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }
  _toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }
  openModal = () => {
    this.setState({
      modalVisible: true
    })
  }
  closeModal = (cb) => {
    this.setState({
      modalVisible: false
    }, () => {
      if (cb) {
        cb();
      }
    })
  }
  logoutHandler = () => {
    const {DrawerNav} = this.props;
    Cloud.$post('user/logout',null, {onlydata: false}).then(data => {
      if (data.Result.isSuccess) {
        this.closeModal(() => {
          DrawerNav.navigate('Login');
        });
      }
    })
  }
  render() {
    const {modalVisible} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.baseRow}>
          <Text style={styles.baseRowTitle}>公司名</Text>
          <Text style={styles.baseRowValue}>深圳市正能量网络技术有限公司</Text>
        </View>

        <View style={styles.baseRow}>
          <Text style={styles.baseRowTitle}>微信</Text>
          <Text style={styles.baseRowValue}>Vito</Text>
        </View>

        <View style={styles.baseRow}>
          <Text style={styles.baseRowTitle}>手机号</Text>
          <Text style={styles.baseRowValue}>13729093675</Text>
        </View>

        <View style={styles.baseRow}>
          <Text style={styles.baseRowTitle}>到期时间</Text>
          <Text style={styles.baseRowValue}>2099年8月2日</Text>
        </View>

        <View style={styles.buttonBox}>
          <ZnlButton style={styles.button} type="warn" onPress={this.openModal}>
            退出登录
          </ZnlButton>
        </View>
        
        <ZnlModal
          visible={modalVisible}
          title="确定要退出登录吗？"
          value="退出登录后，您将无法查看云价格"
          cancelHandler={this.closeModal}
          confirmHandler={this.logoutHandler}
        >
        </ZnlModal>
      </View>
    )
  }
  componentWillMount() {
    const {
      navigation,
      DrawerNav
    } = this.props
    navigation.setParams({DrawerNav});
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  baseRow: {
    height: 48,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
    paddingLeft: 10,
    paddingRight: 10
  },
  baseRowTitle: {
    fontSize: 18
  },
  baseRowValue: {
    maxWidth: 280,
    fontSize: 18,
    color: '#999'
  },
  buttonBox: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    width: '100%',
    height: 40,
    // backgroundColor: '#E64340',
    // color: '#ccc'
  },
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, {DrawerNav: state.Navigations.DrawerNav}, props);
}

export default connect(
  mapStateToProps
)(BaseInfoScreen);