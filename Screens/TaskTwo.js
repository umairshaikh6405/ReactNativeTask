import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { View, Text, Image, Platform, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Counter from '../Component/Counter';
import { Colors, ConstantsVar, ConstStyles, ServerConnection } from '../constants';

export default class TaskOne extends Component {
  constructor(props) {
    super(props);
    this.cartSkus = []
    this.state = {
      skuList: []
    };
  }

  componentDidMount() {
    ConstantsVar.LoadingView.show(true)
    this.getSKU()
  }

  getSKU = async () => {
    // AsyncStorage.removeItem("ADD_TO_CART")
    this.cartSkus = await AsyncStorage.getItem("ADD_TO_CART")
    this.cartSkus = this.cartSkus ? JSON.parse(this.cartSkus) : []

    ServerConnection.getRequest(`https://cb127da4-fd0b-4da0-8dfd-e007eb81a901.mock.pstmn.io/cart`,
      (isSucces, res) => {
        ConstantsVar.LoadingView.show(false)
        if (isSucces) {
          this.setState({
            skuList: res
          })
        }
      })
  }


  ItemView = ({ item, index }) => {

    const cartItemIndex = this.cartSkus.findIndex((i) => item.name == i.name)
    item = cartItemIndex == -1 ? item : this.cartSkus[cartItemIndex] 

    return (
      // Flat List Item
      <View style={[styles.ItemView, { opacity: item.out_of_stock ? 0.5 : 1 }]}>
        <Text style={{ fontSize: wp(4) }}>{item.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: wp(3), marginTop: wp(2) }}>Rs.{item.price}</Text>
            <Text style={{ fontSize: wp(3), marginTop: wp(2) }}>{item.discount} rupees off</Text>
          </View>
          <Counter
            out_of_stock={item.out_of_stock}
            units={item.unit?item.unit :0}
            counterChange={async (unit) => {
              let cartList = await AsyncStorage.getItem("ADD_TO_CART")
              cartList = cartList ? JSON.parse(cartList) : []
              const itemIndex = cartList.findIndex((i) => item.name == i.name)
              let obj = {
                ...item,
                unit: unit
              }
              if (itemIndex == -1) {
                cartList.push(obj)
              } else {
                if(obj.unit == 0){
                  cartList.splice(itemIndex, 1);
                }else{
                   cartList[itemIndex] = obj
                }
              }
              AsyncStorage.setItem("ADD_TO_CART", JSON.stringify(cartList))
              EventRegister.emit("UPDATE_CART")
            }}
          />
        </View>

      </View>
    );
  };

  render() {

    return (
      <View style={styles.container}>

        <FlatList
          data={this.state.skuList}
          keyExtractor={(item, index) => index.toString()}
          enableEmptySections={true}
          renderItem={this.ItemView}
          ListFooterComponent={this.renderFooter}
        />

      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white
  },
  loadMore: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
    backgroundColor: Colors.lightGray,
    borderRadius: wp(3)

  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginVertical: wp(4)
  },
  ItemView: {
    width: wp(100),
    backgroundColor: "white",
    marginTop: wp(3),
    paddingVertical: wp(3),
    justifyContent: "center",
    paddingHorizontal: wp(3),
    ...ConstStyles.shadow
  }
});