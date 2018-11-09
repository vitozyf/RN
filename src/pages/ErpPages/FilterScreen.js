import React, {Component} from 'react';
import Modal from "react-native-modal";
import {View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import {ISIOS} from '@src/utils/system';

class Pane extends Component {
    static propTypes = {
        title: PropTypes.string,
        renderBody: PropTypes.func,
    }
    render() {
        const {
            title,
            renderBody
        } = this.props;
        return (
            <View style={styles.pane}>
                <View style={styles.paneTitleView}>
                    <Text style={styles.paneTitle}>{title}</Text>
                </View>
                <View>
                    {renderBody && renderBody()}
                </View>
            </View>
        )
    }
}


class FilterScreen extends Component {
    static propTypes = {
        isVisible: PropTypes.bool,
        closeModal: PropTypes.func,
        confirmHandler: PropTypes.func,
        StkWarehouse: PropTypes.array, // 仓库数据
    }
    static defaultProps = {
        isVisible: false,
        StkWarehouse: []
    }
    constructor(props) {
        super(props);
        this.state = {
            InvType: '',
            InvPosition: '',
            Brand: '',
            MakeYear: '',
            StorageName: '',
            QuotedTimeByStart: '',
            QuotedTimeByEnd: '',
            SupplierName: '', // 供应商名称
            CustomerName: '', // 客户名称
        }
    }
    // 库存类型
    _renderBodyStockType = () => {
        const {InvType} = this.state;
        return (
            <View style={styles.StockTypeBody}>
                <Text 
                    style={[styles.StockTypeText, InvType === '自有' ? styles.activeText : null]} 
                    onPress={() => {this.setState({InvType: InvType === '自有' ? '' : '自有'})}}>
                    自有
                </Text>
                <Text 
                    style={[styles.StockTypeText, InvType === '备货' ? styles.activeText : null]} 
                    onPress={() => {this.setState({InvType: InvType === '备货' ? '':'备货'})}}>
                    备货
                </Text>
                <Text 
                    style={[styles.StockTypeText, InvType === '补货' ? styles.activeText : null]} 
                    onPress={() => {this.setState({InvType: InvType === '补货'?'':'补货'})}}>
                    补货
                </Text>
                <Text 
                    style={[styles.StockTypeText, InvType === '供应商' ? styles.activeText : null]} 
                    onPress={() => {this.setState({InvType: InvType === '供应商'?'':'供应商'})}}>
                    供应商
                </Text>
            </View>
        )
    }
    // 仓库
    _renderBodyWarehouse = () => {
        const {StkWarehouse} = this.props;
        const {InvPosition} = this.state;
        const StkWarehouseVoiw = StkWarehouse.map((item) => {
            return (
                <Text
                    style={[styles.StockTypeText, InvPosition === item.WarehouseId ? styles.activeText : null]} 
                    key={item.WarehouseId}
                    onPress={() => {this.setState({InvPosition: InvPosition === item.WarehouseId ? '' : item.WarehouseId})}}>
                    {item.WarehouseName}
                </Text>
            )
        })
        return (
            <View style={styles.StockTypeBody}>
                {StkWarehouseVoiw}
            </View>
        )
    }
    // 品牌 批号 位置
    _renderBodyInput = (name) => {
        let nameValue = '';
        switch (name) {
            case 'Brand':
                nameValue = '品牌';
                break;
            case 'MakeYear':
                nameValue = '批号';
                break;
            case 'StorageName':
                nameValue = '位置';
                break;
            case 'StorageName':
                nameValue = '供应商名称';
                break;
            case 'CustomerName':
                nameValue = '客户名称';
                break;
            default:
                break;
        }
        return (
            <View style={styles.bodybox}>
                <TextInput 
                    style={styles.inputStyle}
                    placeholder={`请输入${nameValue}`}
                    defaultValue={this.state[name]}
                    onChangeText={value => this.setState({[name]: value})}/>
            </View>
        )
    }
    // 报价时间
    _renderBodyQuotedTime = () => {
        return (
            <View style={styles.DatePickerBox}>
                <DatePicker
                    style={styles.DatePicker}
                    date={this.state.QuotedTimeByStart}
                    mode="date"
                    placeholder="起始时间"
                    format="YYYY-MM-DD"
                    locale="zh-cn"
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    showIcon={false}
                    androidMode="spinner"
                    onDateChange={(date) => {this.setState({QuotedTimeByStart: date})}}
                />
                <Text> - </Text>
                <DatePicker
                    style={styles.DatePicker}
                    date={this.state.QuotedTimeByEnd}
                    mode="date"
                    placeholder="结束时间"
                    format="YYYY-MM-DD"
                    locale="zh-cn"
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    showIcon={false}
                    androidMode="spinner"
                    onDateChange={(date) => {this.setState({QuotedTimeByEnd: date})}}
                />
            </View>
        )
    }
    render() {
        const {
            isVisible,
            closeModal,
            confirmHandler,
            name
        } = this.props;
        return (
            <Modal
                isVisible={isVisible}
                useNativeDriver={true}
                onBackdropPress={closeModal}
                onSwipe={closeModal}
                style={styles.ComprehensiveRankingContainer}
                backdropOpacity={0.3}
                animationInTiming={100}
                animationIn="slideInRight"
                animationOut="slideOutRight">
                <View style={styles.ComprehensiveRankingBox}>
                    <ScrollView style={styles.ComprehensiveRankingScollView}>
                        {(['StkStock'].indexOf(name) > -1)  && <Pane title="库存类型" renderBody={this._renderBodyStockType}></Pane>}
                        {(['StkStock'].indexOf(name) > -1) && <Pane title="仓库" renderBody={this._renderBodyWarehouse}></Pane>}
                        {(['StkInRecord', 'StkInquireRecord'].indexOf(name) > -1) && <Pane title="供应商名称" renderBody={() => {return this._renderBodyInput('SupplierName')}}></Pane>}
                        {(['StkInRecord', 'StkOutByModel', 'HisofferpriceByModel'].indexOf(name) > -1) && <Pane title="客户名称" renderBody={() => {return this._renderBodyInput('CustomerName')}}></Pane>}
                        {(['StkStock', 'StkInRecord', 'StkOutByModel', 'StkInquireRecord', 'HisofferpriceByModel'].indexOf(name) > -1) && <Pane title="品牌" renderBody={() => {return this._renderBodyInput('Brand')}}></Pane>}
                        {(['StkStock', 'StkInRecord', 'StkOutByModel', 'StkInquireRecord', 'HisofferpriceByModel'].indexOf(name) > -1) && <Pane title="批号" renderBody={() => {return this._renderBodyInput('MakeYear')}}></Pane>}
                        {(['StkStock'].indexOf(name) > -1) && <Pane title="位置" renderBody={() => {return this._renderBodyInput('StorageName')}}></Pane>}
                        {(['StkStock', 'StkInRecord', 'StkOutByModel', 'HisofferpriceByModel'].indexOf(name) > -1) && <Pane title="报价时间" renderBody={this._renderBodyQuotedTime}></Pane>}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TouchableOpacity 
                            activeOpacity={0.8} 
                            style={[styles.footerButton, styles.footerButtonCancel]}
                            onPress={closeModal}>
                            <Text style={[styles.footerButtonText, styles.footerButtonTextCancel]}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.8} 
                            style={[styles.footerButton, styles.footerButtonConfirm]}
                            onPress={() => {confirmHandler && confirmHandler(this.state)}}>
                            <Text style={[styles.footerButtonText, styles.footerButtonTextConfirm]}>确定</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}


const styles = StyleSheet.create({
    ComprehensiveRankingContainer: {
        margin: 0,
    },
    ComprehensiveRankingBox: {
        backgroundColor: '#fff',
        width: 260,
        height: '100%',
        position: 'absolute',
        right: 0,
        paddingTop: ISIOS ? 20 : 0,
    },
    ComprehensiveRankingScollView: {
        paddingBottom: 100
    },
    pane: {
        paddingLeft: 10

    },
    paneTitleView: {
        height: 48,
        flexDirection:'row',
        alignItems:'center',
    },
    paneTitle: {
        fontSize: 16
    },
    footer: {
        height: 50,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        flexDirection:'row',
        alignItems:'center',
    },
    footerButton: {
        width: '50%',
        height: '100%',
    },
    footerButtonCancel: {
        backgroundColor: '#f2f2f2',
    },
    footerButtonConfirm: {
        backgroundColor: '#ed9e00',
    },
    footerButtonText: {
        textAlign: 'center',
        lineHeight: 50,
    },
    footerButtonTextCancel: {

    },
    footerButtonTextConfirm: {
        color: '#fff',
    },
    // pane body
    StockTypeBody: {
        flexDirection:'row',
        flexWrap: 'wrap',
    },
    StockTypeText: {
        backgroundColor: '#F0F0F0',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 8,
        paddingRight: 8,
        marginRight: 5,
    },
    activeText: {
        color: '#fff',
        backgroundColor: '#ed9e00',
    },
    bodybox: {
        padding: 0
    },
    inputStyle: {
        width: 240,
        height: 30,
        borderWidth: 1,
        borderColor: '#e6e6e6',
        padding: 0,

    },
    DatePickerBox: {
        flexDirection:'row',
        alignItems:'center',
        height: 50,
    },
    DatePicker: {
        width: 100,
        height: 30,
        padding: 0,
    }
})

export default FilterScreen;