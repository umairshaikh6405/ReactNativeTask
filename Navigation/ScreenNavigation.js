import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from "@react-navigation/stack";

import MainScreen from "../Screens/MainScreen";
import TaskTwo from "../Screens/TaskTwo";
import TaskOne from "../Screens/TaskOne";
import BottomTabBar from "./BottomTabBar";



const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width + 100, 0],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
}

const Stack = createStackNavigator();
const ScreenNavigator = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: true, ...MyTransition }}
      >

        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="TaskOne" component={TaskOne} />
        <Stack.Screen name="TaskTwo" component={TaskTwo} />
        <Stack.Screen name="BottomTabBar" component={BottomTabBar} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigator;
