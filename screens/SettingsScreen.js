import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import * as firebase from "firebase";
import { ExpoConfigView } from '@expo/samples';
const ActionButton = require('../components/ActionButton');
import CommonStyle from "../constants/common";
import Stats from '../components/Stats';
import Profile from '../components/Profile';
import Common from '../constants/common';

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
      title: 'exp.json',
    },
  };
  
  async logout() {

        try {

            await firebase.auth().signOut();
            await AsyncStorage.setItem('ownProgram', '');
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
        <Profile />
        <View style={Common.container}>
          <Text style={Common.darkTitleH1}>Exercises this week</Text>
        </View>
        <Stats loadingOFF={this.loadingOFF}/>
        {this.state.loading && <View style={Common.loading}>
            <ActivityIndicator
                animating
                size="large"
            />
        </View>}
        <View>
          <ActionButton onPress={this.logout} title="Logout" />
        </View>
      </ScrollView>
    );
  }
}