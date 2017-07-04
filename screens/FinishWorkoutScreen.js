import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import Tag from '../components/Tag';
import {Grid, Row, Col} from 'react-native-elements';
import Database from '../api/database';
import Colors from '../constants/Colors';
import Common from '../constants/common';
import BigTag from '../components/BigTag';
import _ from 'lodash'

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
        return `Congratulations!`
      }
    },
  };
  componentWillMount(){
    let logs =this.props.route.params.logs

    let totalEx = logs.length
    let totalWeight = logs.map((item) => {
        let result = []
        item.weight.map((weight) => {
          result.push(parseInt(weight))
        })
        return (result)
    });
    var totalSets =   logs.map((item) => {
        return(item.sets)
    }); 
    var totalReps = logs.map((item) => {
        let result = []
        item.reps.map((reps) => {
          result.push(parseInt(reps))
        })
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
      Database.finishWorkout();
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
              <Text style={[Common.centeredText, Common.darkTitleH1]}>Workout is completed</Text>
            </View>
          </Row>
          <View style={[Common.sectionBorder, {flex: 1, maxHeight: 30, marginBottom: 10}]}/>
          <Row size={3} containerStyle={Common.sectionBorder}>
            
            <Col size={1}/>
            <Col size={2}>
            <View style={{justifyContent: 'center', flex: 1}}>
              <BigTag
                title={'exercises finished'}
                content={this.state.totalExercises}
                color={'#000'}
              />
              <BigTag
                title={'total sets'}
                content={this.state.totalSets}
                color={'#000'}
              />
              </View>
            </Col>
            <Col size={2}>
            <View style={{justifyContent: 'center', flex: 1}}>
              <BigTag
                title={'total reps'}
                content={this.state.totalReps}
                color={'#000'}
              />
              <BigTag
                title={'total weight'}
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
              <Text style={[Common.darkBodyText, Common.centeredText]}>Please, rate workout difficulty, so that we make it more suitable for you</Text>
            </View>
            </Row>
          <Row size={1}>
            <Col>
              <TouchableOpacity  style={styles.centered} onPress={() => {console.log(1); Database.rateWorkout(1); this.finishWorkout()}}><Text style={styles.colorBlack}>Bad</Text></TouchableOpacity>
            </Col>
            <Col containerStyle={styles.centered}>
              <TouchableOpacity  style={styles.centered} onPress={() => {console.log(2); Database.rateWorkout(2); this.finishWorkout()}}><Text style={styles.colorBlack}>Fine</Text></TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity  style={styles.centered} onPress={() => {console.log(3); Database.rateWorkout(3); this.finishWorkout()}}><Text style={styles.colorBlack}>Very nice</Text></TouchableOpacity>
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
