import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import Modal from "react-native-modal";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Colors, ConstantsVar, Fonts } from "../constants";
const Width = Dimensions.get("window").width;
export default class LoadingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowDialog: false,
    };
    ConstantsVar.LoadingView = this
  }
  show = (value) => {
    this.setState({
      ShowDialog: value,
    });
  };

  render() {
    return (
      <Modal
        style={{ felx: 1, width: "100%" }}
        isVisible={this.state.ShowDialog}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        backdropOpacity={0.5}

      >
        <View style={{ width: "90%", height:wp(40),alignItems: "center", backgroundColor:"#f7f7f7", borderRadius:wp(5), overflow:"hidden"}}>
            <Image
            style={{width:"50%", height:wp(40), resizeMode:"contain",marginTop:-wp(5)}}
            source={require("../assets/ic_loding.gif")}
            
            />
            <Text style={{position:"absolute", bottom:wp(10), fontSize:wp(5), fontWeight:"bold", fontStyle:"italic", color:Colors.primary}}>Please Wait...</Text>
        
        </View>
      </Modal>
    );
  }
}
