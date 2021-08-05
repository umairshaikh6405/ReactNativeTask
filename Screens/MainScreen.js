import React, { Component } from 'react';
import { View, Text, Image, Platform, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, ConstantsVar, ConstStyles } from '../constants';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View>


      </View>
    );
  };

  renderFooter = () => {
    return (
      // Flat List Item
      <View>


      </View>
    );
  };


  navigate = (key) => {
    switch (key) {
      case 0:
        this.props.navigation.navigate("TaskOne")
        break;

      case 1:
        this.props.navigation.navigate("BottomTabBar")
        break;
    }
  };


  render() {

    return (
      <View style={styles.container}>

        <TouchableOpacity
          style={styles.box}
          onPress={() => this.navigate(0)}
        >
          <Text>Task One</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.box, { marginTop: wp(10) }]}
          onPress={() => this.navigate(1)}
        >
          <Text>Task Two</Text>
        </TouchableOpacity>


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
  box: {
    width: wp(60),
    height: wp(60),
    ...ConstStyles.shadow,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center"
  }
});
