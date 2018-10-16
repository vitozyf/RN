import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import HeaderTitle from '../../components/HeaderTitle';

class Bom extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => {
    const onPress = () => {
      navigation.getParam('rootnav').openDrawer();
    }
    const headerLeft = (
      <TouchableOpacity
      activeOpacity={0.8}
      onPress={ onPress }>
        <Image 
        style={styles.headerLeftImg}
        source={{uri: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4001431513,4128677135&fm=26&gp=0.jpg'}} />
      </TouchableOpacity>
    )
    return {
      title: '首页 | BomAi',
      headerTitle: (
        <HeaderTitle title="首页 | BomAi"/>
      ),
      headerLeft
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
      <View>
        <Text>
          bom
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  headerLeftImg: {
    width: 40, 
    height: 40,
    borderRadius: 20,
    marginLeft: 10
  }
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, {rootnav: state.Navigations.rootnav}, props);
}

export default connect(
  mapStateToProps
)(Bom);