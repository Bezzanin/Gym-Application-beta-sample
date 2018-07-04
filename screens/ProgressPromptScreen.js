import React, { Component } from "react";
import { Platform, View, Text, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from "react-native";
import Layout from '../constants/Layout';

import Database from '../api/database';
import Common from '../constants/common';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

export default class ProgressPromptScreen extends Component {

  static route = {
    navigationBar: {
      visible: true,
      title: 'Congratulations',
    },
  };

  constructor(props) {
        super(props);       
  }

  leaveProgram = () => {
    Alert.alert(
        I18n.t('LeaveProgram'),
        I18n.t('LeaveProgramAlert'),
        [   { text: 'Cancel', onPress: () => {console.log('Cancelled')}, style: 'cancel' },
            { text: I18n.t('LeaveProgram'), onPress: () => {
                 AsyncStorage.setItem('ownProgramId', '');
                AsyncStorage.setItem('ownProgramKey', '');
               Database.leaveProgram();

    this.props.navigator.push('programs', {
      cameFromPrompt: true
    });
                
            } }
        ]
    );
}

  chooseNewProgram() {
    this.leaveProgram();
  }

  render() {
    return (
        <View style={[Common.container, Common.centered]}>
          <Text style={[Common.darkTitleH1, Common.centeredText]}>{I18n.t('Continue')} {I18n.t('Workouts')}</Text>
          <View style={{height: 18}}/>
          <Text style={[Common.darkTitleH3, Common.centeredText]}>{I18n.t('MoreThan4Weeks')}</Text>
          <View style={{height: 54}}/>
          <TouchableOpacity style={Common.brightButtonRounded} onPress={() => {this.chooseNewProgram()}}><Text style={Common.lightActionTitle}>{I18n.t('ChooseProgram')}</Text></TouchableOpacity>
          <View style={{height: 18}}/>
          <TouchableOpacity style={Common.brightButtonRounded} onPress={() => {this.props.navigator.popToTop()}}><Text style={Common.lightActionTitle}>{I18n.t('Cancel')}</Text></TouchableOpacity>
        </View>
    );
  }
}