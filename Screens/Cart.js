import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { View, Text, Image, Platform, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Counter from '../Component/Counter';
import { Colors, ConstantsVar, ConstStyles, ServerConnection } from '../constants';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cartSkusList: []
    };
  }

  componentDidMount() {
    this.getSKU()
  
  this._unsubscribe = this.props.navigation.addListener('focus', () => {
    this.getSKU();
  });
}

componentWillUnmount() {
  this._unsubscribe();
}


    getSKU = async () => {
        let cartSkus = await AsyncStorage.getItem("ADD_TO_CART")
        cartSkus = cartSkus ? JSON.parse(cartSkus) : []
        this.setState({
            cartSkusList: cartSkus
        })
    }


  ItemView = ({ item, index }) => {

    return (
      // Flat List Item
      <View style={[styles.ItemView, { opacity: item.out_of_stock ? 0.5 : 1 }]}>
        <Text style={{ fontSize: wp(4) }}>{item.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Rs.{item.price}</Text>
            <Text style={styles.text}>{item.discount} rupees off</Text>
          </View>
          <Text style={{ fontSize: wp(4), marginTop: wp(2) }}>Units: {item.unit}</Text>
        </View>

      </View>
    );
  };

  render() {

    return (
      <View style={styles.container}>

        <FlatList
          data={this.state.cartSkusList}
          keyExtractor={(item, index) => index.toString()}
          enableEmptySections={true}
          renderItem={this.ItemView}
          ListFooterComponent={this.renderFooter}
        />
        {this.state.cartSkusList.length == 0 && <Text style={{position:"absolute"}}>NO ITEMS IN CART</Text>}
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
  ItemView: {
    width: wp(100),
    backgroundColor: "white",
    marginTop: wp(3),
    paddingVertical: wp(3),
    justifyContent: "center",
    paddingHorizontal: wp(3),
    ...ConstStyles.shadow,
  },
  text: { 
    fontSize: wp(3),
    marginTop: wp(2)
  }
});