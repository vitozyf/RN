import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {ActivityIndicator} from '@components';

const ITEM_HEIGHT = 40; // list行高

class ListRow extends Component {
  render() {
    const {
      value,
      ActiveTab
    } = this.props;
     // 现货类型
    const StockType = value.StockType;
    let StockTypeTextEle = null;
    switch (StockType) {
      case 4:
        StockTypeTextEle = (<Text style={[styles.StockTypeCommon, styles.StockType4]}>正品企业</Text>)
        break;
      case 8:
        StockTypeTextEle = (<Text style={[styles.StockTypeCommon, styles.StockType8]}>正品物料</Text>)
        break;
      case 6:
        StockTypeTextEle = (<Text>保证有料</Text>)
        break;
      case 9:
        StockTypeTextEle = (<Text>优势库存</Text>)
        break;
      default:
        break;
    }
    // 数据区分
    let ComputedData = {};
    switch (ActiveTab) {
      case 'yunext':
        ComputedData.UnitPriceText = value.UnitPriceText; // 价格
        ComputedData.QuotedPhrase = value.QuotedPhrase; // 发布时间
        StockTypeTextEle = null;
        break;
      case 'supplierproduct':
        ComputedData.UnitPriceText = value.Properties;
        ComputedData.QuotedPhrase = value.PDatePhrase;
        break;
      default:
        break;
    }
   

    return (
      <View style={styles.FlatListRow}>
        <View style={styles.FlatListRowTop}>
          <View style={styles.FlatListRowTopTitleBox}>
            <Text 
              style={[
                styles.TextRed, 
                styles.TextCommon,
                styles.FlatListRowTopTitle,
                ]}>
              <Text>{value.PartNo}&nbsp;</Text>
            </Text>
            <View style={[
                styles.StockTypeTextEleBox, 
                ]}>
              {StockTypeTextEle}
            </View>
          </View>

          <View style={styles.FlatListRowTopConteneBox}>
            <Text style={[styles.TextRed, styles.TextCommon]}>
              <Text>({ComputedData.QuotedPhrase}) </Text>
              <Text>{value.QuantityPhrase} </Text>
              <Text style={styles.TextMain}>{ComputedData.UnitPriceText}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.FlatListRowBottom}>
          <Text style={[styles.TextCommon]}>{value.Brand} | {value.Package} | {value.MakeAges}</Text>
          <Text style={[styles.TextCommon]}>{value.SupplierName}</Text>
        </View>
      </View>
    )
  }
}

class SerchList extends Component {
  renderFooter = () => {
    const {showFoot} = this.props;
      if (showFoot === 1) {
          return (
              <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                  <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                      没有更多数据了
                  </Text>
              </View>
          );
      } else if(showFoot === 2) {
          return (
              <View style={styles.footer}>
                  <ActivityIndicator />
                  <Text>正在加载更多数据...</Text>
              </View>
          );
      } else if(showFoot === 0){
          return (
              <View style={styles.footer}>
                  <Text></Text>
              </View>
          );
      }
  }
  onEndReached = () => {
    const {PageIndex, addPageIndexHandler, showFoot, setShowFoot} = this.props;
    console.log(123, PageIndex, addPageIndexHandler);
    //如果是正在加载中或没有更多数据了，则返回
    if(showFoot !== 0 ){
        return ;
    }
    //如果当前页大于或等于总页数，那就是到最后一页了，返回
    if((PageIndex !== 1) && (PageIndex >= 10)){
        return;
    } else {
      addPageIndexHandler(PageIndex + 1);
    }
    //底部显示正在加载更多数据
    setShowFoot(2);
    // //获取数据
    // this.fetchData( pageNo );
  }
  render() {
    const {datas, ActiveTab, setActiveTab} = this.props;
    return (
      <View style={styles.SerchList}>
        <View style={styles.SerchListTitle}>
          <Text 
            style={[styles.SerchListTitleText, ActiveTab === 'yunext' ? styles.ActiveTab : null]}
            onPress={() => {setActiveTab('yunext')}}>
            云价格
          </Text>
          <Text 
            style={[styles.SerchListTitleText, ActiveTab === 'supplierproduct' ? styles.ActiveTab : null]}
            onPress={() => {setActiveTab('supplierproduct')}}>
            现货库存
          </Text>
        </View>

        <FlatList
            data={datas}
            getItemLayout={(data, index) => (
              {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
            )}
            renderItem={
              ({item, index}) => {
                return (
                  <ListRow 
                    key={index} 
                    value={item}
                    ActiveTab={ActiveTab} />
                )
              }
            }
            ListFooterComponent={this.renderFooter}
            onEndReachedThreshold={1}
            onEndReached={this.onEndReached}
          />
      </View>
    )
  }
  componentWillMount() {
    // Cloud.$Loading.show();
  }
}

const styles = StyleSheet.create({
  SerchList: {
    // paddingTop: 10
    // borderWidth: 1
  },
  SerchListTitle: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  SerchListTitleText: {
    fontSize: 18,
    color: '#666',
    marginLeft: 10,
    marginRight: 10,
    fontWeight: '100'
  },
  FlatListRow: {
    borderBottomWidth: 1,
    borderColor: '#E6E6E6'
  },
  TextCommon: {
    lineHeight: ITEM_HEIGHT,
    fontSize: 16,
  },
  FlatListRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  FlatListRowTopTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  FlatListRowTopTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  FlatListRowTopConteneBox: {
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
  },
  TextRed: {
    color: 'red'
  },
  TextMain: {
    color: '#EF7609',
  },
  FlatListRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ActiveTab: {
    color: '#ee7700'
  },
  // 现货类型
  StockTypeTextEleBox: {
    width: 80
  },
  StockTypeCommon: {
    fontSize: 16,
    // lineHeight: 20,
    paddingLeft: 2,
    paddingRight: 2,
    fontWeight: 'bold',
    borderWidth: 1,
    textAlign: 'center',
  },
  StockType4: {
    color: '#fff',
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
  },
  StockType8: {
    color: '#FF0000',
    backgroundColor: '#FDF89F',
    borderColor: '#FF0000',
  },
  // loading
  footer:{
    flexDirection:'row',
    height:24,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10,
  },
})

SerchList.propTypes = {
  datas: PropTypes.array
}

export default SerchList;