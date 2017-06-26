import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import * as firebase from "firebase";
import { ExpoConfigView } from '@expo/samples';
const ActionButton = require('../components/ActionButton');
import CommonStyle from "../constants/common";
import Stats from '../components/Stats';
import Profile from '../components/Profile';
import {Video} from 'expo';
import Expo from 'expo';
import Common from '../constants/common';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

export default class SettingsScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.loadingOFF = this.loadingOFF.bind(this);
    this.state = {
      own: false,
      loading: true
    };
  }
  static route = {
    navigationBar: {
      title: I18n.t('Profile'),
    },
  };
  
  async logout() {

        try {

            await firebase.auth().signOut();
            await AsyncStorage.multiRemove(['ownProgram', 'ownProgramId', 'ownProgramKey', 'logs'])
            this.props.navigator.push('login')

        } catch (error) {
            console.log(error);
        }

    }
    loadingOFF() {
      this.setState({
      loading: false,
    })
    }
    showText = () => {
      
    }
  render() {
    return (
      <ScrollView
        style={Common.containerBasic}>
         <Expo.Video
        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        shouldPlay={true}
        muted={true}
        resizeMode="cover"
        repeat
        style={{ width: 300, height: 300 }}
      />
        <Profile />
        <View style={Common.container}>
          <Text style={Common.darkTitleH1}>{I18n.t('ExercisesThisWeek')}</Text>
        </View>
        <Stats loadingOFF={this.loadingOFF}/>
        {this.state.loading && <View style={Common.loading}>
            <ActivityIndicator
                animating
                size="large"
            />
        </View>}
        <View>
          <ActionButton onPress={this.logout} title={I18n.t('Logout')} />
        </View>
      </ScrollView>
    );
  }
}