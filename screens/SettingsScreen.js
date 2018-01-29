import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import * as firebase from "firebase";
import { ExpoConfigView } from '@expo/samples';
const ActionButton = require('../components/ActionButton');
import CommonStyle from "../constants/common";
import Stats from '../components/Stats';
import Profile from '../components/Profile';
import CreditCard from '../components/CreditCard'
import Expo from 'expo';
import Common from '../constants/common';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};
import moment from "moment";


export default class SettingsScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.loadingOFF = this.loadingOFF.bind(this);
    this.state = {
      own: false,
      loading: true,
      weekNumber: moment().format("W")
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
    loadingOFF(weekNumber) {
      this.setState({
        weekNumber,
      loading: false,
    })
  }
    showText = () => {
      
    }
  render() {
    return (
      <ScrollView
        style={Common.containerBasic}>
        <Profile />
        <View style={Common.container}>
          <Text style={Common.darkTitleH1}>{I18n.t('inWeek')} {this.state.weekNumber} {I18n.t('Exercises')}</Text>
        </View>
        <Stats loadingOFF={this.loadingOFF}/>
        {this.state.loading && <View style={Common.loading}>
            <ActivityIndicator
                animating
                size="large"
            />
        </View>}
        <View>
          <CreditCard />
          <ActionButton onPress={this.logout} title={I18n.t('Logout')} />
        </View>
      </ScrollView>
    );
  }
}