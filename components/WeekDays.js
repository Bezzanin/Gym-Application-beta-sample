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
  AsyncStorage,
} from 'react-native';
import { Constants } from 'expo';
import Common from '../constants/common';
import Database from '../api/database';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import {Slider, CheckBox} from 'react-native-elements';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

import { withNavigation } from '@expo/ex-navigation';
import MultipleChoice from 'react-native-multiple-choice';


@withNavigation
export default class WeekDays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      shouldRender: 'true',
    };
    this.baseState = this.state
    this.onSendData = this.onSendData.bind(this);
    this.allWeekDays = this.allWeekDays.bind(this);
    this.state.options = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  }

  componentDidMount() {
    AsyncStorage.getItem('workoutDays').then((val) => {
      if (val === null) {
        this.setState({ shouldRender: 'true'})
      } else {
        this.setState({ shouldRender: 'false'})
      }
    })

  }

  componentWillReceiveProps() {
    if (this.props.showOrHide) {
      this.setState({ shouldRender: 'true'})
    } else {  this.setState({ shouldRender: 'false'}) }
  }
  onSendData(days) {
    this.setState({
      shouldRender: 'maybe'
    })
    AsyncStorage.setItem('workoutDays', JSON.stringify(days))
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
        if (this.state.shouldRender === 'true') {
          return (
            <View>
              <MultipleChoice
                  options={this.state.options}
                  maxSelectedOptions={this.props.amountOfDays}
                  renderText={(option)=>this._renderText(option)}
                  renderIndicator={(option)=>this._renderIndicator(option)}
                  onSelection={this.allWeekDays}
              />
              <TouchableOpacity onPress={() => {this.onSendData(this.state.days)}}><Text style={[Common.textButton, {fontSize: 18}]}>Save days</Text></TouchableOpacity>
            </View>
          );
        }
        else if (this.state.shouldRender === 'false') {
          return (
            <View/>
          )
        }
        else {
          return (
          <View>
            <Text>The schedule is saved. You can change the days later in the settings</Text>
          </View>
          )
        }
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