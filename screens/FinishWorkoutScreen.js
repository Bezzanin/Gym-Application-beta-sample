import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import Tag from '../components/Tag';
import {Grid, Row, Col} from 'react-native-elements';
import Database from '../api/database';
import Colors from '../constants/Colors';
import Common from '../constants/common';
import BigTag from '../components/BigTag';
import _ from 'lodash';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

export default class FinishWorkoutScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        ownProgram: {},
        exercises: {},
    }
  }
  static route = {
    navigationBar: {
      title(params){
        return I18n.t('Feedback')
      }
    },
  };
  componentWillMount(){
    let logs =this.props.route.params.logs

    let totalEx = logs.length
    let totalWeight = logs.map((item) => {
      console.log(item)
        let result = []
        if(Array.isArray(item.weight)){
          item.weight.map((weight) => {
          result.push(parseInt(weight))
        })} else {result.push(parseInt(item.weight))}
        return (result)
    });
    var totalSets =   logs.map((item) => {
        return(item.sets)
    }); 
    var totalReps = logs.map((item) => {
        let result = []
        if(Array.isArray(item.reps)){
        item.reps.map((reps) => {
          result.push(parseInt(reps))
        })} else {result.push(parseInt(item.reps))}
        return (result)
    });

    this.setState({
      totalExercises: totalEx,
      totalWeight: _.sum(_.flatten(totalWeight)),
      totalSets: _.sum(totalSets)+totalEx,
      totalReps: _.sum(_.flatten(totalReps))
    })
  }
 async finishWorkout() {
      
      await AsyncStorage.getItem("ownProgram").then((json) => {
        try {
            const ownProgram = JSON.parse(json);
            this.setState({ownProgram})
        } catch(e) {
            console.log(e)
        }
      })
      //Database.finishWorkout();
      console.log('navigator.pop triggered');
      this.props.navigator.popToTop();
  }
  calculateWorkoutTime(){
    let workoutTime = (this.props.route.params.workoutFinished - this.props.route.params.workoutStarted)/60/60;
    console.log('Time is ' + workoutTime);
    return workoutTime;
  }
  render() {
    return (
    
        <Grid>
          
          <Row size={1}>
            <View style={[Common.centered, {flex: 1}]}>
              <Text style={[Common.centeredText, Common.darkTitleH1]}>{I18n.t('WorkoutIsCompleted')}</Text>
            </View>
          </Row>
          <View style={[Common.sectionBorder, {flex: 1, maxHeight: 30, marginBottom: 10}]}/>
          <Row size={3} containerStyle={Common.sectionBorder}>
            
            <Col size={1}/>
            <Col size={2}>
            <View style={{justifyContent: 'center', flex: 1}}>
              <BigTag
                title={I18n.t('exercisesDone')}
                content={this.state.totalExercises}
                color={'#000'}
              />
              <BigTag
                title={I18n.t('TotalSets')}
                content={this.state.totalSets}
                color={'#000'}
              />
              </View>
            </Col>
            <Col size={2}>
            <View style={{justifyContent: 'center', flex: 1}}>
              <BigTag
                title={I18n.t('TotalReps')}
                content={this.state.totalReps}
                color={'#000'}
              />
              <BigTag
                title={I18n.t('TotalWeight')}
                content={this.state.totalWeight}
                label={"kg"}
                color={'#000'}
              />
              </View>
            {/*<Text>{this.calculateWorkoutTime()} time spent</Text>*/}
            </Col>
            <Col size={1}/>
           <View style={[Common.sectionBorder]}/>
           
          </Row>
          <View style={[Common.sectionBorder]}/>
          <Row size={1} containerStyle={Common.centered}>
            <View style={[Common.centered, {flex: 1}]}>
              <Text style={[Common.darkBodyText, Common.centeredText]}>{I18n.t('FeedbackText')}</Text>
            </View>
            </Row>
          <Row size={1}>
            <Col>
              <TouchableOpacity style={[styles.centered, Common.borderButton]} onPress={() => {console.log(1); Database.rateWorkout(1); this.finishWorkout()}}><Text style={Common.lightActionTitle}>{I18n.t('Bad')}</Text></TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity style={[styles.centered, Common.borderButton]} onPress={() => {console.log(2); Database.rateWorkout(2); this.finishWorkout()}}><Text style={Common.lightActionTitle}>{I18n.t('Fine')}</Text></TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity style={[styles.centered, Common.borderButton]} onPress={() => {console.log(3); Database.rateWorkout(3); this.finishWorkout()}}><Text style={Common.lightActionTitle}>{I18n.t('VeryGood')}</Text></TouchableOpacity>
            </Col>
          </Row>
          <Row/>
          
        </Grid>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 15
  },
  colorBlack: {
    color: Colors.darkBodyTextColor
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
