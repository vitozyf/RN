import React, {PureComponent} from 'react';
import {View, StyleSheet, Text, FlatList, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {BackTop} from '@components';
import Feather from 'react-native-vector-icons/Feather';
const ITEM_HEIGHT = 40; // list行高
class ListRow extends PureComponent {
  render() {
    const {value} = this.props;
    return (
      <View style={styles.FlatListRow}>
        <View style={styles.FlatListRowTitle}>
            <Text style={styles.FlatListRowModel}>{value.Model}</Text>
            <View style={styles.FlatListRowRightBox}>
                <View >
                    <Text style={styles.FlatListRowInvType}>{value.InvType}</Text>
                </View>
                <View style={styles.FlatListRowInvTypeBox}>
                    <Feather size={16} name="database" style={styles.FlatListRowInvQtyIcon}/>
                    <Text style={styles.FlatListRowInvQty}>{value.InvQty}</Text>
                </View>
            </View>
        </View>

        <View style={styles.FlatListRowTBody}>
            <View style={styles.FlatListRowBodyLeft}>
                <Text>{value.Brand}</Text>
                <Text style={styles.line}>|</Text>
                <Text>{value.Packaging}</Text>
                <Text style={styles.line}>|</Text>
                <Text>{value.MakeYear}</Text>
            </View>

            <View >
                <Text>¥{value.BuyPrice}</Text>
            </View>
            
        </View>
      </View>
    )
  }
}

class SerchList extends PureComponent {
  constructor(props) {
      super(props);
      this.state = {
        selected: (new Map()),
        refreshing: false,
        datas: [],
        // ScrollOffset: 0
      }
  }
  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: '库存',
        headerStyle: {
            backgroundColor: '#fff',
        },
        headerTitleStyle: {
            color: '#333',
        },
    };
  };
  // 渲染头部
  _renderHeader = () => {
    return (
        <View style={styles.SerchListTitle}> 
            {/* <ScrollView 
                keyboardDismissMode={true} // 滚动隐藏软键盘
                horizontal={true}
                > */}
                <Text style={styles.SerchTitleBlock}>综合排序</Text>
                <Text style={styles.SerchTitleBlock}>数量</Text>
                <Text style={styles.SerchTitleBlock}>更新时间</Text>
                <Text style={styles.SerchTitleBlock}>筛选</Text>
            {/* </ScrollView> */}
        </View>
    )
  }
  // 渲染底部
  _renderFooter = () => {
    const {showFoot, datas} = this.props;
      if (showFoot === 1 && datas && datas.length > 0) {
        return (
            <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                    没有更多数据了
                </Text>
            </View>
        );
      } else if(showFoot === 0 || !datas || datas.length === 0){
        return (
            <View style={styles.footer}>
                <Text></Text>
            </View>
        );
      }
  }
  // 渲染空数据 
  _renderEmptyView = () => {
    return (
      <View style={styles.EmptyView}>
        <Text style={styles.EmptyText}>
          暂无数据
        </Text>
      </View>
    )
  }
  // 自定义分割线
  _renderItemSeparatorComponent = () => {
    return  <View style={styles.ItemSeparatorComponent}></View>
  }
  // 下拉刷新
  _renderRefresh = () => {
    console.log('下拉刷新');
  }
  // 加载更多
  onEndReached = () => {
    console.log('加载更多');
  }
  // 滚动
  onScroll = (event) => {
    const that = this;
    let newScrollOffset = event.nativeEvent.contentOffset.y
    if (newScrollOffset > 100) {
      BackTop.show({
        onPress() {
          that.flatList.scrollToIndex({ viewPosition: 0, index: 0 });
          newScrollOffset = 0;
        }
      });
    } else {
      BackTop.hidden();
    }
  }
  // 函数用于为给定的item生成一个不重复的Key。
  _keyExtractor = (item, index) => String(index);
  // 切换tab
  setActiveTabHandler = (name) => {
    const {setActiveTab, datas} = this.props;
    setActiveTab(name);
    if (datas && datas.length > 0) {
      this.flatList.scrollToIndex({ viewPosition: 0, index: 0 });
    }
  }
  // 渲染行
  _renderItem = ({item}) => {
    const {ActiveTab} = this.props;
    return (
      <ListRow 
        value={item} />
    )
  }
  getDatas(name) {
    Cloud.$post(`${name}/Search`, {
        FieldWhereString: '',
        OrderBy: '',
        PageIndex: 1,
        PageSize: 20,
        isZero: true
    },{erpApi: true}).then(data => {
        this.setState({
            datas: data.ResultList
        })
    })
  }
  render() {
    const {
        refreshing, 
        selected,
        datas
    } = this.state;
    return (
      <View style={[styles.SerchList]}>
        {this._renderHeader()}
        <FlatList
            data={datas}
            extraData={selected}
            ref={ ref => this.flatList = ref }
            keyExtractor={ this._keyExtractor }
            getItemLayout={(data, index) => (
              {length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + 1) * index, index}
            )}
            renderItem={this._renderItem}
            ListFooterComponent={this._renderFooter}
            ListEmptyComponent={ this._renderEmptyView }
            ItemSeparatorComponent={ this._renderItemSeparatorComponent }
            onEndReachedThreshold={0.5}
            onEndReached={this.onEndReached}
            onRefresh={ this._renderRefresh }
            refreshing={ refreshing }
            onScroll = {this.onScroll}
          />
      </View>
    )
  }
  componentWillMount() {
    const name = this.props.navigation.getParam('name');
    this.getDatas(name);
  }
}

const styles = StyleSheet.create({
    SerchList: {
        flex: 1,
        backgroundColor: '#fff',
    },
    SerchListTitle: {
        flexDirection: 'row',
        alignItems:'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        height: 50
    },
    SerchTitleBlock: {
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 16
    }, 
    // 分割组件
    ItemSeparatorComponent: {
        height: 1,
        backgroundColor: '#E6E6E6'
    },
    FlatListRow: {
        paddingLeft: 5,
        paddingRight: 5,
        // borderBottomWidth: 1,
        // borderColor: '#E6E6E6'
    },
    FlatListRowTitle: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        height: 40,
    },
    FlatListRowModel: {
        fontSize: 16,
        fontWeight: 'bold',
    }, 
    FlatListRowRightBox: {
        flexDirection: 'row',
        alignItems:'center',
    },
    FlatListRowInvTypeBox: {
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems:'center',
    },
    FlatListRowInvType: {
        color: '#ee7700',
        fontSize: 16,
    },
    FlatListRowInvQtyIcon: {
        color: '#ee7700',
        paddingRight: 3
    },  
    FlatListRowInvQty: {
        color: '#ee7700',
        fontSize: 16,
    },


    FlatListRowTBody: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        height: 40,
    },
    FlatListRowBodyLeft: {
        flexDirection: 'row',
        alignItems:'center',
        // justifyContent: 'space-between',
    },
    line: {
        paddingLeft: 5,
        paddingRight: 5
    },

    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
        // backgroundColor: 'red'
    },
    // 空数据
    EmptyView: {
        alignItems: 'center'
    },
    EmptyText: {
        textAlign: 'center',
        lineHeight: 100
    }
})

SerchList.propTypes = {
  datas: PropTypes.array,
  style: PropTypes.object
}

export default SerchList;