import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {withNavigation} from '@expo/ex-navigation';
import Layout from '../constants/Layout';
import Common from '../constants/common';
import BigTag from '../components/BigTag';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

@withNavigation
class WorkoutExercises extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        numberOfExercises: ''
    } 
  }

goToAllExercises() {
    this.props.navigator.push('XDayExercises', {
        dayNumber: this.props.dayNumber,
        exercises: this.props.exercises,
        program: this.props.program
    })
}
getDayOrder() {
    switch(this.props.dayNumber) {
        case 1: return I18n.t('First')
        case 2: return I18n.t('Second')
        case 3: return I18n.t('Third')
        case 4: return I18n.t('Fourth')
        case 5: return I18n.t('Sixth')
        case 6: return I18n.t('Seventh')
    }
}
    
render() {
    const {dayNumber, exercises, program, numberOfExercises, muscles} = this.props;
    return (
        <View style={[Common.container, Common.sectionBorder]}>
            <TouchableOpacity onPress={() => {this.goToAllExercises()}}>
                <View>
                    <Text style={Common.darkTitleH2}>{this.getDayOrder()} {I18n.t('Day')}</Text>
                    <Text style={Common.darkBodyText}>{this.props.muscles}</Text>
                    <Text style={Common.darkBodyText}>{this.props.numberOfExercises} {I18n.t('Exercises')}</Text>
                </View>
                    </TouchableOpacity>
        </View> 
    );
  }
}

export default WorkoutExercises;

