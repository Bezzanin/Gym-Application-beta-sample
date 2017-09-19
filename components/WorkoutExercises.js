import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {withNavigation} from '@expo/ex-navigation';
import Layout from '../constants/Layout';
import Common from '../constants/common';
import BigTag from '../components/BigTag';
import DashboardExercisesList from '../components/DashboardExercisesList'
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
    this.handleMoveUp = this.handleMoveUp.bind(this);
  }

goToAllExercises() {
    this.props.navigator.push('XDayExercises', {
        dayNumber: this.props.dayNumber,
        exercises: this.props.exercises,
        program: this.props.program,
        day: this.props.day
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
handleMoveUp(number) {
    this.props.onMoveUp(number, this.props.dayNumber);
    this.forceUpdate();
}
render() {
    const {dayNumber, exercises, program, numberOfExercises, muscles, onMoveUp} = this.props;
    return (
        <View style={[Common.container, Common.sectionBorder]}>
            <TouchableOpacity onPress={() => {this.goToAllExercises()}}>
                <View>
                    <Text style={Common.darkBodyText}>{this.getDayOrder()} {I18n.t('Day')}</Text>
                    <Text style={Common.darkTitleH2}>{this.props.muscles.split(', ').map((word) => {console.log(word);return translate(word)}).join(', ').capitalize()}</Text>
                </View>
            </TouchableOpacity>
            <DashboardExercisesList
                onMoveUp={this.handleMoveUp}
                //onMoveDown={this.props.onMoveDown(number)}
                data={this.props.exercises}
                numberOfExercises={this.props.numberOfExercises}/>
        </View> 
    );
  }
}

breakIntoWords = (str) => {
    return 
}
translate = (word) => {
    return I18n.t(word).toLowerCase()
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default WorkoutExercises;

