import React from 'react';
import { ScrollView, View, Share, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Picker, AsyncStorage, Image, ActivityIndicator } from 'react-native';
import Layout from '../constants/Layout';
import Tag from '../components/Tag';
import ProgressController from "../components/ProgressController";
import * as firebase from 'firebase';
import Database from '../api/database';
import {Constants, Video} from 'expo';
import ActivityPicker from '../components/ActivityPicker';
import ActivityInput from '../components/ActivityInput';
import AlternativeExercise from '../components/AlternativeExercise';
import Common from '../constants/common';
import {Grid, Col, Row} from 'react-native-elements';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import { Ionicons } from '@expo/vector-icons';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

import { NavigationStyles } from '@expo/ex-navigation';


import {
  FormLabel,
  FormInput,
  Button,
} from 'react-native-elements';


export default class ExerciseScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      weight: '70',
      metric: 'kg',
      sets: 0,
      repsx: 10,
      reps: 5,
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
    this.goToRoute = this.goToRoute.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  static route = {
    navigationBar: {
      title(params){
        return `${I18n.t(params.exercise.name.replace(/[^A-Z0-9]+/ig, ''))}`
      }
    },
    styles: {
      ...NavigationStyles.SlideHorizontal,
    },
  };

  onClick() {
    let exerciseName = I18n.t(this.props.route.params.exercise.name.replace(/[^A-Z0-9]+/ig, ''))
    Share.share({
      message: exerciseName,
      url: 'https://itunes.apple.com/us/genre/ios-sports/id6004?mt=8',
      title: 'Wow, did you see that?'
    }, {
      // Android only:
      dialogTitle: 'Share BAM goodness',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  }


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
  this.setState({
    _updateTracker: this.props.route.params.checker,
    exerciseName: this.props.route.params.exercise.name,
    exerciseID: this.props.route.params.exercise._key,
    exerciseType: this.props.route.params.exercise.type,
    exerciseMuscles: this.props.route.params.exercise.muscles
  })
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  goToRoute() {
    let showOrHide = !this.state.showDescriptions
    this.setState({
      showDescriptions: showOrHide
    })
  }

  sendData(sets,reps,weight) {
    this.setState({sets,reps,weight})
    Database.addExerciseStats(this.props.route.params.exercise._key, sets, reps, weight, this.state.metric);
  }
   
  goToNext = (sets,reps,weight) => {
       this.setState({sets,reps,weight}, ()=>{
         Database.showNextExercise(true);
       })
      
       let index = 0;
       Database.getCurrentExerciseIndex( (currentIndex) => {index = currentIndex});
       let oldLog = this.props.route.params.logs
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
            title: this.props.route.params.sequence[index+1].name,
            sequence: this.props.route.params.sequence,
            logs: oldLog,
            checker: this.props.route.params.checker,
            workoutStarted: this.props.route.params.workoutStarted
          });
       }
     }
   
   
   renderNextButton() {

     
     if (this.props.route.params.insideWorkout) {
       return(
         <View style ={[Common.container, Common.centered, Common.sectionBorder]}>
         <TouchableOpacity
          style={[Common.brightButtonRounded, Common.shadowBright]}
          onPress={() => {
            this.setState({
                    weight: allWeight,
                    reps: allReps,
                  }, () => {this.goToNext()}
            )}}>
           <Text style={Common.lightActionTitle}>
             {I18n.t('Next')} {I18n.t('Exercise')}
           </Text>
         </TouchableOpacity>
         </View>
       )
     }
   }

   
    displayPicker() {
      if (this.props.insideWorkout) {
        return(
          <View style={{flex: 1, marginTop: 15}}>
            <ActivityInput
              onSendData={(sets, reps, weight) => {
                this.goToNext(sets, reps, weight)
              }}
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
      console.log(exerciseName + ' came ' + exerciseID);
      this.props.navigator.updateCurrentRouteParams({
            title: exerciseName
      })
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
      }
      else {
        return(<View/>)
      }
    }
    displayVideo() {
      if ((this.state.videoLink === 'https://') || (this.props.insideWorkout))  {
        return(
          <View/>
        )
      }
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

    return (
      <ScrollView>
         
      
        {this.displayVideo()}
        <View style={[Common.container, Common.sectionBorder, {backgroundColor: 'white', zIndex: 5, marginBottom: 0, flexDirection: 'row'}]}>
        <View style={{flex: 2}}>
          <Text style={Common.darkTitleH1}>{I18n.t(this.state.exerciseName.replace(/[^A-Z0-9]+/ig, ''))}</Text>
          <View style = {Common.inlineContainer}>
            <Tag
              title={I18n.t('muscleGroup')}
              content={this.props.route.params.exercise.muscles}
              color={'#000'}/>
            <Tag 
              title={I18n.t('Exercises')}
              content={this.props.route.params.exercise.type}
              color={'#000'}/>
          </View>
          </View>
          <View style={{flex: 1}}>
          <TouchableOpacity onPress={this.onClick} style={{flex: 1, justifyContent: 'center'}}>
          <Ionicons
              name={'md-share'}
              size={30}
              color={'#CE0707'}
              style={{position: 'absolute', alignSelf: 'center', backgroundColor: 'transparent'}}
            />
          </TouchableOpacity>
    
          </View>
        </View>
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
        {this.displayPicker()}
        {this.displayReplace()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 15
  },
  videoContainer: {
    height: Layout.window.height * 0.35,
  },
  textInVideo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff'
  },
  heading1: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  button: {
    width: Layout.window.width,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#920707',
  },
  textWhite: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    width: Layout.window.width * 0.8,
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  pickers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
