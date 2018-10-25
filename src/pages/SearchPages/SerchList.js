import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, FlatList} from 'react-native';

const Datas = [
  {
    Model: 'aaa',
    id: 0,
    Time: '3天内',
    Qty: '5K-10K',
    Price: 10
  },
  {
    Model: 'bbb',
    id: 1,
    Time: '3天内',
    Qty: '5K-10K',
    Price: 10
  }
]

const ITEM_HEIGHT = 30; // list行高

class ListRow extends Component {
  render() {
    const {
      value
    } = this.props;
    return (
      <View style={styles.FlatListRow}>
        <View style={styles.FlatListRowTop}>
          <Text style={styles.TextRed}>{value.Model}</Text>
          <Text style={styles.TextRed}>
            <Text>{value.Time}</Text>
            <Text>{value.Qty}</Text>
            <Text>￥{value.Price}</Text>
          </Text>
        </View>
        <View>
          <Text>{value.Model}</Text>
        </View>
      </View>
    )
  }
}

class SerchList extends Component {
  render() {
    return (
      <View style={styles.SerchList}>
        <View style={styles.SerchListTitle}>
          <Text style={styles.SerchListTitleText}>云价格</Text>
          <Text style={styles.SerchListTitleText}>现货库存</Text>
        </View>

        <FlatList
            data={Datas}
            getItemLayout={(data, index) => (
              {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
            )}
            renderItem={
              ({item}) => {
                return (
                  <ListRow key={item.id} value={item}></ListRow>
                )
              }
            }
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  SerchList: {
    // paddingTop: 10
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
    lineHeight: 30
  },
  FlatListRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextRed: {
    color: 'red'
  }
})

export default SerchList;