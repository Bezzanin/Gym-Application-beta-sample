import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Database from '../api/database';
import Common from '../constants/common';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import {withNavigation} from '@expo/ex-navigation';

import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

@withNavigation
class EditModeButton extends Component {

  componentWillMount() {
    this.setState({
      editModeOn: this.props.editModeOn
    })
  }
  addNewExercise() {
    this.props.navigator.push('exercises', {
      filter: 'ALL',
      quickWorkout: true
  })
  }

  render() {
    const {handleToggle} = this.props;
    if (this.state.editModeOn) {
      return (
        <View>
           <TouchableOpacity
            style={[Common.container, Common.sectionBorder]}
            onPress={() => {this.addNewExercise()}}><Text style={[Common.textButton, {fontSize: 18}]}>AddExercise</Text></TouchableOpacity>
          <TouchableOpacity
            style={[Common.container, Common.sectionBorder]}
            onPress={() => { Database.saveDaySequence(this.sortExercises(this.props.exercises, this.props.order), 'day1');
              this.props.navigator.pop();
              }}><Text style={[Common.textButton, {fontSize: 18}]}>Save and return</Text></TouchableOpacity>
          
        </View>
      )
    }
    else {
      return (
        <View>
          <TouchableOpacity
            style={[Common.container, Common.sectionBorder]}
            onPress={() => {
              this.addNewExercise()
              }}><Text style={[Common.textButton, {fontSize: 18}]}>Add Exercise</Text></TouchableOpacity>
          <TouchableOpacity
            style={[Common.container, Common.sectionBorder]}
            onPress={() => { Database.saveDaySequence(this.sortExercises(this.props.exercises, this.props.order), 'day1');
              this.props.navigator.pop();
              }}><Text style={[Common.textButton, {fontSize: 18}]}>Save and return</Text></TouchableOpacity>
        </View>
      )
    }
    
  }
  sortExercises(arr, order) {
    var result = [];
    for(var i=0; i<arr.length; i++) {
      console.log(order[i], arr[i]);
      result[i] = arr[order[i]];
    }
    return result;
  }
}

module.exports = EditModeButton;