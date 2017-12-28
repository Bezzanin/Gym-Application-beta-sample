import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import Layout from '../constants/Layout';
import Tag from '../components/Tag';
import * as firebase from 'firebase';
import Database from '../api/database';
import {Constants, Video} from 'expo';
import ActivityInput from '../components/ActivityInput';
import ExerciseInput from '../components/ExerciseInput';
import AlternativeExercise from '../components/AlternativeExercise';
import Common from '../constants/common';
import {Grid, Col, Row} from 'react-native-elements';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import { Ionicons } from '@expo/vector-icons';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

export default class ExerciseScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      metric: 'kg',
      repsx: 10,
      sets: 0,
      reps: 5,
      superReps: [],
      superWeight: [],
      weight: '70',
      videoLink: 'https://',
      videoRate: 1.0,
      exerciseName: 'l',
      exerciseType: '',
      exerciseMuscles: '',
      exerciseID: '',
      loading: true,
      showDescriptions: false,
      _updateTracker: '123',
    }
  }
  static route = {
    navigationBar: {
      title(params){
        if (typeof params.exercise.name === 'string') {
          return `${I18n.t(params.exercise.name.replace(/[^A-Z0-9]+/ig, ''))}`
        }
        else {
          return 'Superset'
        }
      }
    }
  };

  componentWillMount() {
    var storageRef = firebase.storage().ref(`videos/${this.props.route.params.exercise.video || 'id1'}.mp4`);
    var imageRef = firebase.storage().ref(`exercises/${this.props.route.params.exercise.photo}.png`);
    storageRef.getDownloadURL().then((url) => {
      
      this.setState({
        videoLink: url
      })
    }, function(error) {
      console.log(error);
    });
      imageRef.getDownloadURL().then((url) => {
        // console.log(this.state.uriLink)
        this.setState({
          uriLink: url,
          
        })
      }, function(error) {
        console.log(error);
      });
  }
  componentDidMount() {
    if (this.props.route.params.exercise instanceof Array) {
     
    }
    else {
      this.setState({
        _updateTracker: this.props.route.params.checker,
        exerciseName: this.props.route.params.exercise.name,
        exerciseID: this.props.route.params.exercise._key,
        exerciseType: this.props.route.params.exercise.type,
        exerciseMuscles: this.props.route.params.exercise.muscles
      })
    }
  }
   
  goToNext = (sets,reps,weight, order) => {
      console.log('Going to next')
       this.setState({sets,reps,weight}, ()=>{
         console.log(this.state.sets);
         Database.showNextExercise(true);
       })
      
       let index = 0;
       Database.getCurrentExerciseIndex( (currentIndex) => {index = currentIndex});
       let oldLog = this.props.route.params.logs;
       console.log(oldLog)
       oldLog.push({
         id: this.state.exerciseID,
         weight: weight,
         sets: sets,
         reps: reps,
         metric: this.state.metric,
       })
       AsyncStorage.setItem('logs', JSON.stringify(oldLog));
       
       if (index >= this.props.route.params.sequence.length-1) {
         console.log('Pushed if');
         let emptyArr = []
         AsyncStorage.setItem('logs', JSON.stringify(emptyArr))
         Database.pushWorkoutLog(oldLog);
         Database.finishWorkout();
         this.props.navigator.push('finishWorkout', {
           logs: oldLog,
           workoutStarted: this.props.route.params.workoutStarted,
           workoutFinished: Date.now()
         });
       }
       else {
          console.log('Pushed else');
          console.log(oldLog)
          this.props.navigator.push('exercise', {
            exercise: this.props.route.params.sequence[index+1],
            insideWorkout: true,
            title: this.props.route.params.sequence[index+1].name || "Superset",
            sequence: this.props.route.params.sequence,
            logs: oldLog,
            checker: this.props.route.params.checker,
            workoutStarted: this.props.route.params.workoutStarted
          });
       }
     }

    onParentSetsUpdate(index, reps, weight) {
      let allReps = this.state.superReps.slice();
      let allWeight = this.state.superWeight.slice();
      allReps[index] = reps;
      allWeight[index] = weight;
      this.setState({
        superReps:allReps,
        superWeight:allWeight}, () => {
        console.log(this.state.superReps);
        console.log(this.state.superWeight);
      })
    }

    goToNextFromSuperset() {
      Database.showNextExercise(true)
      let index = 0;
      Database.getCurrentExerciseIndex( (currentIndex) => {index = currentIndex});
      let oldLog = this.props.route.params.logs;
      let superLog = [];
      for (let i = 0; i < this.props.route.params.exercise.length; i++) {
        superLog.push({
          id: this.props.route.params.exercise[i]._key,
          weight: this.state.superWeight[i],
          sets: this.state.superReps[i].length,
          reps: this.state.superReps[i],
          metric: this.state.metric
        })
      }
      oldLog.push(superLog);
      AsyncStorage.setItem('logs', JSON.stringify(oldLog));
      
      if (index >= this.props.route.params.sequence.length) {
        let emptyArr = []
        AsyncStorage.setItem('logs', JSON.stringify(emptyArr))
        Database.pushWorkoutLog(oldLog);
        Database.finishWorkout();
        this.props.navigator.push('finishWorkout', {
          logs: oldLog,
          workoutStarted: this.props.route.params.workoutStarted,
          workoutFinished: Date.now()
        });
      }
      else {
         this.props.navigator.push('exercise', {
           exercise: this.props.route.params.sequence[index],
           insideWorkout: true,
           title: this.props.route.params.sequence[index].name || "Superset",
           sequence: this.props.route.params.sequence,
           logs: oldLog,
           checker: this.props.route.params.checker,
           workoutStarted: this.props.route.params.workoutStarted
         });
      }
    }
    
    displayPicker(shouldHideButton, index) {
      if (this.props.insideWorkout) {  
        return(
          <View style={{flex: 1, marginTop: 15}}>
            <ActivityInput
              shouldHideButton={shouldHideButton}
              onSendData={(sets, reps, weight) => {
                this.goToNext(sets, reps, weight)
              }}
              onSendDataFromSuperset = {() => {
                  this.goToNextFromSuperset()
                }}
              index={index}
              updateParentNSets={(index, reps, weight) => {this.onParentSetsUpdate(index, reps, weight)}}
            />
           
            </View>
        )
      }
      else {
        return(
        <View style={[Common.container, Common.sectionBorder, {backgroundColor: 'white', zIndex: 5, marginBottom: 15}]}>
          <Tag
              content={'Instructions'}
              color={'#000'}/>
          <Text style={Common.darkBodyTextRead}>
          Lay down on the bench. Then, using your thighs to help raise the dumbbells up.
          </Text>
          <Tag
              content={'Caution'}
              color={'#000'}/>
          <Text style={Common.darkBodyTextRead}>
          When you are done, do not drop the dumbbells next to you as this is dangerous to your rotator cuff in your shoulders and others working out around you.
          </Text>
          <Tag
              content={'Variations'}
              color={'#000'}/>
          <Text style={Common.darkBodyTextRead}>
          Another variation of this exercise is to perform it with the palms of the hands facing each other.
          </Text>
        </View>
        )
      }
    }

    handleReplace(exerciseName, exerciseID) {
      this.props.navigator.updateCurrentRouteParams({ title: exerciseName })
      this.setState({
        exerciseName, exerciseID
      })
    }

    displayReplace() {
      if (this.props.insideWorkout) {
        return(
          <View style={{flex: 1}}>
            <AlternativeExercise
              exerciseType={this.state.exerciseType}
              exerciseMuscles={this.state.exerciseMuscles}
              exerciseName={this.state.exerciseName}
              onReplace={this.handleReplace.bind(this)}
              sequence={this.props.route.params.sequence}/>
            </View>
        )
      } else { return(<View/>) }
    }
    displayVideo() {
      if ((this.state.videoLink === 'https://') || (this.props.insideWorkout)){return(<View/>)}
      else {
        return (
        <View style={styles.videoContainer}>
              <Video
                useNativeControls
                source={{uri: this.state.videoLink}}
                shouldPlay={true}
                isMuted
                resizeMode="cover"
                style={{ flex: 1, zIndex: 3000}}
              />

          </View>)
      }
    }
  render() {
    if (this.props.route.params.exercise instanceof Array) {
      let exerciseInputs = []
      for (let i = 0; i < this.props.route.params.exercise.length; i++) {
        let key = i;
        shouldHide = (key) => {
          if (key === this.props.route.params.exercise.length-1) {
            return false;
          }
          else {
            return true;
          }
        }
        exerciseInputs.push((
        <View>
          <ExerciseInput
            name={this.props.route.params.exercise[key].name.replace(/[^A-Z0-9]+/ig, '')}
            muscles={this.props.route.params.exercise[key].muscles}
            type={this.props.route.params.exercise[key].type}
          />
          {this.displayPicker(shouldHide(key), key)}
          </View>))
      }
      return (
      <ScrollView>
        {exerciseInputs}
      </ScrollView>)
    }
    else {
    return (
      <ScrollView>
         
      
        {this.displayVideo()}
        <ExerciseInput
          name={this.state.exerciseName.replace(/[^A-Z0-9]+/ig, '')}
          muscles={this.props.route.params.exercise.muscles}
          type={this.props.route.params.exercise.type}
        />
        {this.state.showDescriptions ?
          <View style={styles.videoContainer}>
          <Video
            useNativeControls
            source={{uri: this.state.videoLink}}
            shouldPlay={true}
            isMuted
            resizeMode="cover"
            style={{ flex: 1, zIndex: 3000}}
        />

        </View>
         : <View/>}
        {this.displayPicker(false)}
        {this.displayReplace()}
      </ScrollView>
    )
  }
  }
}

const styles = StyleSheet.create({
  videoContainer: {
    height: Layout.window.height * 0.35,
  }
});
