import React from 'react';
import {
  View,
  StatusBar,
  Dimensions, Text, TextInput
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import ScreenNavigation from './Navigation/ScreenNavigation';
import { Colors, ConstantsVar } from './constants';
import LoadingView from './Component/LoadingView';
import FlashMessage from 'react-native-flash-message';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;



class App extends React.Component {
  constructor(props) {
    super(props);
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
    if (TextInput.defaultProps == null) TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;

  }

  componentDidMount(){
  }


  

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.primary }}>
        <SafeAreaView style={{ backgroundColor: Colors.primary,width: WIDTH, height: HEIGHT + StatusBar.currentHeight }}>
          <View style={{ backgroundColor: "white", flex: 1 }}>
              <View style={{ flex: 1 }}>
                <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
                <ScreenNavigation />
                <LoadingView />
                <FlashMessage position="top" />
              </View>
          </View>
        </SafeAreaView>
      </View>

    )
  }
}

export default App;