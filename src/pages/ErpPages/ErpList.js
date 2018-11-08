import React, {PureComponent} from 'react';
import {View, StyleSheet, Text, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {BackTop} from '@components';
import Feather from 'react-native-vector-icons/Feather';
import Modal from "react-native-modal";
import FilterScreen from './FilterScreen';

const ITEM_HEIGHT = 40; // list行高
class ListRow extends PureComponent {
  render() {
    const {value, name} = this.props;
    const StkStockView = (
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
    let TimeKey = '';
    let CompanyKey = 'SupplierName'
    let PriceKey = 'Price'
    switch (name) {
        case 'StkInRecord':
            TimeKey = 'ReceiveTime';
            break;
        case 'StkOutByModel':
            TimeKey = 'ShipTime';
            CompanyKey = 'CustomerName';
            break;
        case 'StkInquireRecord':
            TimeKey = 'CreatedTime';
            break;
        case 'HisofferpriceByModel':
            TimeKey = 'QuotedTime';
            CompanyKey = 'CustomerName';
            PriceKey = 'QuotePrice';
            break;
        default:
            break;
    }
    const OtherView = (
        <View style={styles.FlatListRow}>
        <View style={styles.FlatListRowTitle}>
            <Text style={styles.FlatListRowModel}>{value.Model}</Text>
            <View style={styles.FlatListRowRightBox}>
                <View style={styles.FlatListRowInvTypeBox}>
                    <Text style={styles.FlatListRowInvQtyIcon}>¥</Text>
                    <Text style={styles.FlatListRowInvQty}>{value[PriceKey]}</Text>
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

            <View style={styles.FlatListRowInvTypeBox}>
                <Feather size={14} name="database"/>
                <Text>{value.Qty}</Text>
            </View>
            
        </View>

        <View style={styles.FlatListRowTBody}>
            <View style={styles.FlatListRowBodyLeft}>
                <Text>{value[CompanyKey]}</Text>
            </View>

            <View style={styles.FlatListRowInvTypeBox}>
                <Text>{ value[TimeKey] ? value[TimeKey].substr(0, 10) : null}</Text>
            </View>
            
        </View>
      </View>
    )
    return name === 'StkStock' ? StkStockView : OtherView;
  }
}

class SerchList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: (new Map()),
            refreshing: false,
            datas: [],
            name: '',
            // ScrollOffset: 0
            showComprehensiveRanking: false, // 综合排序是否显示
            MakeYear: '', // 综合排序条件 MakeYear ASC， MakeYear DESC
            InvQty: '', // 数量条件 InvQty ASC， InvQty DESC
            UpdatedTime: '', // 更新时间条件 UpdatedTime ASC， UpdatedTime DESC
            PageIndex: 1,
            PageSize: 20,
            TotalCount: 0,
            TotalPage: 0,
            DataOver: false, // 无更多数据
            loading: false,
            isFilterScreenShow: false, // 显示筛选条件
            StkWarehouse: [], // 仓库地址
            FieldWhereString: '', // 筛选条件
        }
    }
    static navigationOptions = ({ navigation }) => {
        const name = navigation.getParam('name');
        let Title = '';
        switch (name) {
            case 'StkStock':
                Title = '库存';
                break;
            case 'StkInRecord':
                Title = '入库';
                break;
            case 'StkOutByModel':
                Title = '出库';
                break;
            case 'StkInquireRecord':
                Title = '询价';
                break;
            case 'HisofferpriceByModel':
                Title = '报价';
                break;
            default:
                break;
        }
        return {
            headerTitle: Title,
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTitleStyle: {
                color: '#333',
            },
        };
    };
    showComprehensiveRankingHandler = (value) => {
        this.setState({
            showComprehensiveRanking: value
        })
    }
    // 触发搜索
    onSearch(state) {
        this.setState(state, () => {
            this.getDatas(this.state.name);
        })
        this.setState({
            showComprehensiveRanking: false
        })
    }
    // 点击数量
    qtyHandler = () => {
        const {InvQty} = this.state;
        let newInvQty = '';
        if (!InvQty) {
            newInvQty = 'InvQty ASC'
        } else if (InvQty === 'InvQty ASC') {
            newInvQty = 'InvQty DESC'
        } else if (InvQty === 'InvQty ASC') {
            newInvQty = ''
        }
        this.onSearch({
            InvQty: newInvQty
        })
    }
    // 点击更新时间
    createdTimeHandler = () => {
        const {UpdatedTime} = this.state;
        let newUpdatedTime = '';
        if (!UpdatedTime) {
            newUpdatedTime = 'UpdatedTime ASC'
        } else if (UpdatedTime === 'UpdatedTime ASC') {
            newUpdatedTime = 'UpdatedTime DESC'
        } else if (UpdatedTime === 'UpdatedTime ASC') {
            newUpdatedTime = ''
        }
        this.onSearch({
            UpdatedTime: newUpdatedTime
        })
    }
    
    // 渲染综合排序
    _renderComprehensiveRanking = () => {
        const {showComprehensiveRanking} = this.state;
        return (
            <Modal
                isVisible={showComprehensiveRanking}
                useNativeDriver={true}
                onBackdropPress={() => this.setState({ showComprehensiveRanking: false })}
                onSwipe={() => this.setState({ showComprehensiveRanking: false })}
                style={styles.ComprehensiveRankingContainer}
                backdropOpacity={0.3}
                animationInTiming={100}>
                <View style={styles.ComprehensiveRankingBox}>
                    <TouchableOpacity style={styles.ComprehensiveRankingRow} activeOpacity={1} onPress={() => {this.onSearch({MakeYear: ''})}}>
                        <Text style={styles.ComprehensiveRankingText }>综合排序</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ComprehensiveRankingRow} activeOpacity={1} onPress={() => {this.onSearch({MakeYear: 'MakeYear ASC'})}}>
                        <Text style={styles.ComprehensiveRankingText }>批号由近到远</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ComprehensiveRankingRow} activeOpacity={1} onPress={() => {this.onSearch({MakeYear: 'MakeYear DESC'})}}>
                        <Text style={styles.ComprehensiveRankingText }>批号由远到近</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
    // 渲染筛选条件
    _renderFilterScreen = () => {
        const {
            isFilterScreenShow, 
            StkWarehouse,
            name
        } = this.state;
        return (
            <FilterScreen 
            isVisible={isFilterScreenShow}
            closeModal={() => {this.setState({isFilterScreenShow: false})}}
            confirmHandler={(params) => {this.FieldWhereStringHandler(params)}}
            StkWarehouse={StkWarehouse}
            name={name}>
            </FilterScreen>
        )
    }
    // 处理筛选条件
    FieldWhereStringHandler = (params) => {
        const {name} = this.state;
        let fieldArray = [];
        for (const key in params) {
            if (params.hasOwnProperty(key) && params[key]) {
                fieldArray.push(`"${key}":"${params[key]}"`)
            }
        }
        this.setState({isFilterScreenShow: false});
        this.setState({FieldWhereString: `{${fieldArray.join(',')}}`}, () => {
            this.getDatas(name);
        })

    }
    // 渲染头部
    _renderHeader = () => {
        const {
            MakeYear,
            InvQty,
            UpdatedTime,
            showComprehensiveRanking,
            FieldWhereString} = this.state;
        return (
            <View style={styles.SerchListTitle}> 
                {/* <ScrollView 
                    keyboardDismissMode={true} // 滚动隐藏软键盘
                    horizontal={true}
                    > */}
                <Text style={[styles.SerchTitleBlock, MakeYear ? styles.colorMain : null]} onPress={() => {this.showComprehensiveRankingHandler(!showComprehensiveRanking)}}>综合排序</Text>
                <Text style={[styles.SerchTitleBlock, InvQty ? styles.colorMain : null]} onPress={this.qtyHandler}>数量</Text>
                <Text style={[styles.SerchTitleBlock, UpdatedTime ? styles.colorMain : null]} onPress={this.createdTimeHandler}>更新时间</Text>
                <Text style={[styles.SerchTitleBlock, (FieldWhereString && FieldWhereString !== '{}') ? styles.colorMain : null]} onPress={() => {this.setState({isFilterScreenShow: true})}}>筛选</Text>
                {/* </ScrollView> */}
                {this._renderComprehensiveRanking()}
            </View>
        )
    }
    // 渲染底部
    _renderFooter = () => {
        const {DataOver, datas} = this.state;
        if (DataOver && datas.length > 0) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else {
            return null;
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
        this.getDatas(this.state.name);
    }
    // 加载更多
    onEndReached = () => {
        const {name, PageIndex} = this.state;
        this.getDatas(name, PageIndex + 1, true);
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
            value={item}
            name={this.state.name} />
        )
    }
    getDatas(name, PageIndex = 1, isMoreData) {
        const  {MakeYear, InvQty, UpdatedTime, PageSize, datas, DataOver, loading, FieldWhereString} = this.state;
        const searchParams = [];
        if (MakeYear) {
            searchParams.push(MakeYear);
        }
        if (InvQty) {
            searchParams.push(InvQty);
        }
        if (UpdatedTime) {
            searchParams.push(UpdatedTime);
        }
        const OrderBy = searchParams.join(',');

        // 已无数据或正在加载数据时，直接返回
        if (DataOver || loading) {
            return null;
        }

        this.setState({
            loading: true
        })

        
        Cloud.$post(`${name}/Search`, {
            FieldWhereString,
            OrderBy,
            PageIndex,
            PageSize,
            isZero: true
        },{erpApi: true, loading: true}).then(data => {
            this.setState({
                loading: false
            })
            if (data) {
                this.setState({
                    datas: isMoreData ? datas.concat(data.ResultList || []) : data.ResultList,
                    PageIndex: data.PageIndex,
                    PageSize: data.PageSize,
                    TotalCount: data.TotalCount,
                    TotalPage: data.TotalPage
                }, () => {
                    // 当前请求页为最后一页时设置DataOver为true
                    if (data.PageIndex >= this.state.TotalPage) {
                        this.setState({
                            DataOver: true
                        })
                    }
                })
            }
        }).catch(() => {
            this.setState({
                loading: false
            })
        })
    }
    // 获取仓库
    getStkWarehouse() {
        Cloud.$post('StkWarehouse/Search', null, {erpApi: true}).then(data => {
            if (data) {
                this.setState({
                    StkWarehouse: data
                })
            }
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
            {this._renderFilterScreen()}
        </View>
        )
    }
    componentWillMount() {
        const name = this.props.navigation.getParam('name');
        this.setState({
            name
        })
        this.getDatas(name);
        if (name === 'StkStock') {
            this.getStkWarehouse();
        }
    }
}

const styles = StyleSheet.create({
    //通用
    colorMain: {
        color: '#ee7700'
    },
    // 组件
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
        height: 30,
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
    },

    // 综合排序
    ComprehensiveRankingContainer: {
        // paddingLeft: 0,
        // paddingRight: 0,
        margin: 0,
    },
    ComprehensiveRankingBox: {
        position: 'absolute',
        top: 110,
        width: '100%',
        // left: -18,
        // width: 360,
        backgroundColor: '#fff',
    },
    ComprehensiveRankingRow: {
        height: 40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
    },
    ComprehensiveRankingText: {

    }
})

SerchList.propTypes = {
  datas: PropTypes.array,
  style: PropTypes.object
}

export default SerchList;