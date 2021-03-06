import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import {Grid, Col, Row} from "react-native-elements";
import {withNavigation} from '@expo/ex-navigation';
import Layout from '../constants/Layout';
import Common from '../constants/common';
import Database from '../api/database';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

@withNavigation
class WorkoutExercises extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        numberOfExercises: '',
        exercises: props.data
    }
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

componentWillMount() {
    this.props.exercises
}

_renderItem = ({item, index}) => {
    if (item instanceof Array) {
        let exercises = []
        for (let i = 0; i < item.length; i++) {
            let key = i;
            exercises.push((<Row id={item[key].id}>
                <Col size={5}><View style={{paddingRight: 20}}><Text style={Common.darkBodyText2}>{I18n.t(item[key].name.replace(/[^A-Z0-9]+/ig, ''))}</Text></View></Col>
                <Col size={2}><View style={{alignItems: 'flex-end'}}><Text style={Common.darkBodyText2}>3</Text></View></Col>
                <Col size={2}><View style={{alignItems: 'flex-end'}}><Text style={Common.darkBodyText2}>15</Text></View></Col>
            </Row>))
        } 
        return (
        <View style={{backgroundColor: '#F0F0F0', borderRadius: 8, paddingLeft: 8, paddingTop: 4}}>
            <Text style={{opacity: 0.5, fontWeight: '700'}}>Superset</Text>
            {exercises}
        </View>)
    }
    else {
        if (item.name) {
            return (
                <Row id={item.id}>
                    <Col size={5}><View style={{paddingRight: 20}}><Text style={Common.darkBodyText2}>{I18n.t(item.name.replace(/[^A-Z0-9]+/ig, ''))}</Text></View></Col>
                    <Col size={2}><View style={{alignItems: 'flex-end'}}><Text style={Common.darkBodyText2}>3</Text></View></Col>
                    <Col size={2}><View style={{alignItems: 'flex-end'}}><Text style={Common.darkBodyText2}>15</Text></View></Col>
                </Row>
            )
        }
        else {
            return (        <Row id={item.id}>
                <Col size={5}><View style={{paddingRight: 20}}><Text style={Common.darkBodyText2}>{I18n.t('Superset')}</Text></View></Col>
                <Col size={2}><View style={{alignItems: 'flex-end'}}><Text style={Common.darkBodyText2}>3</Text></View></Col>
                <Col size={2}><View style={{alignItems: 'flex-end'}}><Text style={Common.darkBodyText2}>15</Text></View></Col>
            </Row>)
        }

    }
}
render() {
    const {dayNumber, exercises, program, numberOfExercises, muscles, onMoveUp} = this.props;
    return (
        <View style={[Common.container, Common.sectionBorder]}>
            <Text style={Common.darkBodyText}>{this.getDayOrder()} {I18n.t('Day')}</Text>
            <Text style={[Common.darkTitleH2, {marginBottom: 8}]}>{this.props.muscles.split(', ').map((word) => {console.log(word);return translate(word)}).join(', ').capitalize()}</Text>
            <Text style={[Common.darkBodyText, {marginBottom: 8}]}>{I18n.t('ManageExercisesPromo')}</Text>
            <TouchableOpacity onPress={() => {this.goToAllExercises()}}>
                <Text style={[Common.textButton, {marginBottom: 4}]}>{I18n.t('ManageExercises')}</Text>
            </TouchableOpacity>

            <View>
                <View style={[Common.sectionBorder, {marginVertical: 7}]}/>
                <Grid>
                <Row>
                        <Col size={5}><View style={{paddingRight: 20}}><Text style={Common.darkBodyText}>{this.props.numberOfExercises} {I18n.t('Exercises')}</Text></View></Col>
                        <Col size={2}><View style={{alignItems: 'flex-end'}}><Text style={Common.darkBodyText}>{I18n.t('Sets').toLowerCase()}</Text></View></Col>
                        <Col size={2}><View style={{alignItems: 'flex-end'}}><Text style={Common.darkBodyText}>{I18n.t('Reps').toLowerCase()}</Text></View></Col>
                    </Row>
                </Grid>
                <Grid>

                    <FlatList
                    data = {this.state.exercises}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    />
                </Grid>
            </View>
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

