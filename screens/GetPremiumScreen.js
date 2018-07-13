import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import BigTag from '../components/BigTag';
import Common from '../constants/common';
import I18n from 'ex-react-native-i18n';
import fi from '../constants/fi';
import en from '../constants/en'; import ru from '../constants/ru';
import CreditCard from '../components/CreditCard'
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

class GetPremiumScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.showTick = this.showTick.bind(this)
    }

    static route = {
        navigationBar: {
          visible: true,
          title: I18n.t('GoPremium'),
        },
      };

    showTick() {
        return (
        <View style={{justifyContent: 'center', alignItems: 'center', height: 19, width: 20, marginTop: 5}}><Ionicons
        name={'ios-checkmark'}
        size={30}
        color={'#CE0707'}
        style={{backgroundColor: 'transparent'}}
      /></View>)
      }
  render() {
    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
        <View style={[Common.centered, {paddingVertical:16}]}>
        <Text style={[Common.darkTitleH1, {marginBottom: 16}]}>{I18n.t('GoPremium')}</Text>
        <Text style = {[Common.darkBodyText, Common.centeredText]}>{I18n.t('PremiumPromo')}</Text>
          <View style={{flexDirection: 'row', marginBottom: 16}}>
          <BigTag
                content={5}
                label={'€/month'}
                color={'#000'}
            />
          </View>
          <View style={{marginLeft: -5}}>
            <Text style = {Common.darkBodyText}>{this.showTick()}{I18n.t('EditingPrograms')}</Text>
            <Text style = {Common.darkBodyText}>{this.showTick()}{I18n.t('QuickWorkoutButton')}</Text>
            <Text style = {Common.darkBodyText}>{this.showTick()}{I18n.t('ExerciseVideos')}</Text>
            <Text style = {Common.darkBodyText}>{this.showTick()}{I18n.t('Workout')} {I18n.t('Statistics')}</Text>
          </View>
        </View>
        <CreditCard />
        </View>
    );
  }
}

export default GetPremiumScreen;