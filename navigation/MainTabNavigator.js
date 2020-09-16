import React from "react";
import { Platform } from "react-native";
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import TabBarIcon from "../components/TabBarIcon";
import Colors from "../constants/Colors";
import AlertScreen from "../screens/AlertScreen";
import HomeScreen from "../screens/HomeScreen";
import ReminderScreen from "../screens/ReminderScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Alert: AlertScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "android" ? "ios-home" : "md-home-circle"}
    />
  )
};

const ReminderStack = createStackNavigator({
  Reminder: ReminderScreen
});

ReminderStack.navigationOptions = {
  tabBarLabel: "Add Reminder",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "android" ? "ios-add-circle" : "md-plus-circle"}
    />
  )
};


export default createBottomTabNavigator(
  {
    HomeStack,
    ReminderStack
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.tintColor,
      style: {
        borderTopColor: Colors.primaryColor
      }
    }
  }
);
