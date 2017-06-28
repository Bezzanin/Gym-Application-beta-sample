import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Notifications } from 'expo';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@expo/ex-navigation';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../constants/Layout'
import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import Common from '../constants/common';
import AddActivity from '../components/AddActivity'
import registerForPushNotificationsAsync
  from '../api/registerForPushNotificationsAsync';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

const Home = I18n.t('Home');
const Exercises = I18n.t('Exercises');
const ExercisesLibrary = I18n.t('ExercisesLibrary');
const Diary = I18n.t('Diary');
const Profile = I18n.t('Profile');

export default class RootNavigation extends React.Component {

  componentDidMount() {
    //this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <TabNavigation tabBarHeight={56} initialTab="home" navigatorUID="main">
        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderIcon(Home,'ios-home', isSelected)}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>
        <TabNavigationItem
          id="exercises"
          renderIcon={isSelected => this._renderIcon(ExercisesLibrary,'ios-clipboard', isSelected)}>
          <StackNavigation initialRoute="exercises" />
        </TabNavigationItem>
        
        <TabNavigationItem
          id="plus"
          renderIcon={isSelected => this._renderMiddleIcon('ios-add-circle', isSelected)}>
          <StackNavigation initialRoute="diary" />
        </TabNavigationItem>

        <TabNavigationItem
          id="diary"
          renderIcon={isSelected => this._renderIcon(Diary,'ios-bookmarks', isSelected)}>
          <StackNavigation initialRoute="diary" />
        </TabNavigationItem>

        <TabNavigationItem
          id="settings"
          renderIcon={isSelected => this._renderIcon(Profile,'ios-contact', isSelected)}>
          <StackNavigation initialRoute="settings" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(title, name, isSelected) {
    let color = isSelected ? Colors.tintColor : Colors.borderColor
    let fontWeight = isSelected ? '400' : '300'
    return (
      <View style={Common.tabItemContainer}>
      <Ionicons
        name={isSelected ? name : name + '-outline'}
        size={30}
        color={color}
      />
      <Text style={[Common.tabTitle, {color, fontWeight}]}>{title}</Text>
      </View>
    );
  }

    _renderMiddleIcon(name, isSelected) {
    let color = Colors.tintColor
    let fontWeight = isSelected ? '400' : '300'
    return (
      <View style={Common.tabItemContainer}>
        <AddActivity/>
      </View>
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});