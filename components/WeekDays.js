import React, { Component } from 'react';
import {
  Modal,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import { Constants } from 'expo';
import Common from '../constants/common';
import Database from '../api/database';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
import {Slider, CheckBox} from 'react-native-elements';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};
import MultipleChoice from 'react-native-multiple-choice';

export default class WeekDays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
    };
    this.onSendData = this.onSendData.bind(this);
    this.allWeekDays = this.allWeekDays.bind(this);
  }

  onSendData(days) {
    Database.setWorkoutDays(days);
  }

    _renderText(option) {
    return (
      <View style={styles.textBoxStyle}>
    <Text style={styles.textStyle}>{option}</Text></View>
    );
    }

_renderIndicator(option) { 
  return (
    <View style={styles.indicator}></View>
    );
    }


  allWeekDays(weekday) {
    allDays = this.state.days
    if (allDays.includes(weekday)) {
      var index = allDays.indexOf(weekday)
      if (index > -1) {
        allDays.splice(index, 1);
      }
    
    } else {
      allDays.push(weekday)
  }
    this.setState({
      days: allDays
    })
  }

  render() {
        
    return (
      <View>

<MultipleChoice
    options={['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su']}
    maxSelectedOptions={3}
    renderText={(option)=>this._renderText(option)}
    renderIndicator={(option)=>this._renderIndicator(option)}
    onSelection={this.allWeekDays}
    selectedOptionsList={(optionList)=>console.log(optionList + ' was selected!')}
/>

      <TouchableOpacity onPress={() => {this.onSendData(this.state.days)}}><Text>AA</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  indicator: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(163, 168, 175, 0.48)',
    position: 'absolute',
    left: -40,
  },
  textBoxStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderWidth: 0.5,
  },
  paragraph: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 30,
  },
  hideButton: {
    position: 'absolute',
    bottom: 20,
    width: 200,
    borderRadius: 100,
    borderColor: '#000',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  inlineContainer: {
    marginVertical: 100,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    doneButton: {
      marginTop: 200,
    },
    ActionButton: {
        width: 200,
      borderRadius: 100,
      borderColor: '#FFFFFF',
      borderWidth: 1,
      alignSelf: 'center',
      marginTop: 30,
      backgroundColor: 'green'
    },
    InputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
});