import React, { Component } from "react";
import { View, Text, StyleSheet, Share, TouchableOpacity } from "react-native";
import {FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import Layout from '../constants/Layout';
import Tag from './Tag';

import Common from '../constants/common';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import { Ionicons } from '@expo/vector-icons';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

class ExerciseInput extends Component {
    constructor(props){
    super(props);
    this.state = {
      sets: 3,
      reps: 10,
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    let exerciseName = I18n.t(this.props.name)
    Share.share({
      message: 'Check the ' + exerciseName + 'exercise in Rational Gym app. Available on iOS and Android',
      url: 'https://itunes.apple.com/us/genre/ios-sports/id6004?mt=8',
      title: 'Rational Gym ' + exerciseName
    }, {
      // Android only:
      dialogTitle: 'Rational Gym ' + exerciseName,
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  }

  render() {
    return (
        <View style={[Common.container, Common.sectionBorder, {backgroundColor: 'white', zIndex: 5, marginBottom: 0, flexDirection: 'row'}]}>
        <View style={{flex: 2}}>
          <Text style={Common.darkTitleH1}>{I18n.t(this.props.name)}</Text>
          <View style = {Common.inlineContainer}>
            <Tag
              title={I18n.t('muscleGroup')}
              content={this.props.muscles}
              color={'#000'}/>
            <Tag 
              title={I18n.t('Exercises')}
              content={this.props.type}
              color={'#000'}/>
          </View>
          </View>
          <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.onClick} style={{flex: 1, justifyContent: 'center'}}>
          <Ionicons
              name={'md-share'}
              size={30}
              color={'#CE0707'}
              style={{position: 'absolute', alignSelf: 'center', backgroundColor: 'transparent'}}
            />
          </TouchableOpacity>
    
          </View>
        </View>
    );
  }
}

export default ExerciseInput;