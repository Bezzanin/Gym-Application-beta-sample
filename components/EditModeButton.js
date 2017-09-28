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
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
import {withNavigation} from '@expo/ex-navigation';

I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

@withNavigation
class EditModeButton extends Component {
  constructor(props) {
    super(props);

    this.toggleMode = this.toggleMode.bind(this)
  }
  componentWillMount() {
    this.setState({
      editModeOn: this.props.editModeOn
    })
  }
  toggleMode() {
    console.log('triggered toggle')
    this.setState({
      editModeOn: !this.state.editModeOn
    })
  }
  render() {
    const {handleToggle} = this.props;
    if (this.state.editModeOn) {
      return (
        <View>
          <TouchableOpacity onPress={() => {
            console.log(this.props.order);
            this.toggleMode();
            console.log(this.props.handleToggle);
            //this.props.handleToggle();
            Database.saveDaySequence(this.sortExercises(this.props.exercises, this.props.order), 'day1');
            this.props.navigator.pop();
            }}><Text>Done</Text></TouchableOpacity>
        </View>
      )
    }
    else {
      return (
        <View>
          <TouchableOpacity onPress={() => {
            console.log(this.props.order);
            this.toggleMode();
            console.log(this.props.handleToggle);
            this.props.handleToggle();
    
            }}><Text>Edit</Text></TouchableOpacity>
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