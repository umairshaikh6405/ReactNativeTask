import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../constants/Colors';
import { Fonts, ServerConnection, ConstantsVar } from '../constants';
import { EventRegister } from 'react-native-event-listeners';
import TaskTwo from '../Screens/TaskTwo';
import AsyncStorage from '@react-native-community/async-storage';
import Cart from '../Screens/Cart';

const Tab = createBottomTabNavigator();

export default class BottomTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartAvailable: false,
    };
  }

  componentDidMount() {
    this.checkCart()
    this.UPDATE_CART = EventRegister.addEventListener("UPDATE_CART",() => {
      this.checkCart()
    });
  }

  checkCart= async ()=>{
    let cartSkus = await AsyncStorage.getItem("ADD_TO_CART")
    cartSkus = cartSkus ? JSON.parse(cartSkus) : []
    this.setState({
     isCartAvailable : cartSkus.length > 0
    })
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.UPDATE_CART)
  }


 

  render() {
    
    return (
      <>
        <Tab.Navigator
        backBehavior={"initialRoute"}
          initialRouteName="HomeNavigator"
          barStyle={{ backgroundColor: 'white', }}
          style={{ backgroundColor: 'grey', }}
          tabBarOptions={{
            activeTintColor: Colors.primary,
            inactiveTintColor: Colors.lightGray,
            safeAreaInsets: { bottom: 0, },
            tabStyle: {
              paddingBottom: wp("1%"),
              paddingTop: wp("1%")
            },
            labelStyle: {
              fontSize: wp("2.3%"),
              fontFamily: Fonts.primaryRegular,
            },
            style: {
              height: wp("13.5%"),
            }

          }}

        >
          <Tab.Screen
            name="TaskTwo"
            component={TaskTwo}
            options={{
              tabBarLabel: `Home`,
              tabBarIcon: ({ color }) => (
                <Image style={{ width: wp('6%'), height: wp('6%'), tintColor: color }} source={require('../assets/HomeIcon.png')} />
              ),
            }}
          />
          <Tab.Screen
            name="Cart"
            component={Cart}
            labeled={true}
            options={{
              tabBarLabel: `Cart`,
              tabBarIcon: ({ color }) => (
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={require("../assets/CartIcon.png")}
                    style={{ width: wp('6%'), height: wp('6%'), tintColor: color }}
                  />
                 {this.state.isCartAvailable && <View
                    style={{
                      position: "absolute",
                      top: 0,
                      right: -2,
                      minWidth: 14,
                      height:  14,
                      borderRadius: 15,
                      borderColor: "white",
                      borderWidth: 1.1,
                      backgroundColor: Colors.primary
                    }}
                  />}
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </>

    );
  }

}


