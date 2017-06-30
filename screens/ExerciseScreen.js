import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Picker, AsyncStorage } from 'react-native';
import Layout from '../constants/Layout';
import Tag from '../components/Tag';
import ProgressController from "../components/ProgressController";
import * as firebase from 'firebase';
import Database from '../api/database';
import {Constants, Video} from 'expo';
import Expo from 'expo';
import ActivityPicker from '../components/ActivityPicker';
import Common from '../constants/common';
import {Grid, Col, Row} from 'react-native-elements';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

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
      sets: '3',
      reps: '3',
      videoLink: 'https://',
      videoRate: 1.0
    }
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


  componentWillMount() {
    var storageRef = firebase.storage().ref(`videos/${this.props.route.params.exercise.video || 'id1'}.mp4`);
    storageRef.getDownloadURL().then((url) => {
      
      this.setState({
        videoLink: url
      })
    }, function(error) {
      console.log(error);
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  sendData() {
    Database.addExerciseStats(this.props.route.params.exercise._key, this.state.weight, this.state.sets, this.state.reps, this.state.metric);
  }
   
   renderNextButton = (allWeight, allReps) => {
     
     goToNext = () => {
       Database.addExerciseStats(this.props.route.params.exercise._key, this.state.weight, this.state.sets, this.state.reps, this.state.metric, true);
       let index = 0;
       Database.getCurrentExerciseIndex( (currentIndex) => {index = currentIndex});
       let oldLog = this.props.route.params.logs
       oldLog.push({
         id: this.props.route.params.exercise._key,
         weight: this.state.weight,
         sets: this.state.sets,
         reps: this.state.reps,
         metric: this.state.metric,
       })
       AsyncStorage.setItem('logs', JSON.stringify(oldLog));
       console.log('Index is ' + index + ', length is ' + this.props.route.params.sequence.length);
       console.log('Below is the props.sequence');
       console.log(this.props.route.params.sequence);
       if (index >= this.props.route.params.sequence.length) {
         console.log('Pushed if');
         let emptyArr = []
         AsyncStorage.setItem('logs', JSON.stringify(emptyArr))
         Database.finishWorkout();
         Database.pushWorkoutLog(oldLog);
         this.props.navigator.push('finishWorkout', {
           logs: oldLog,
           workoutStarted: this.props.route.params.workoutStarted,
           workoutFinished: Date.now()
         });
       }
       else {
          console.log('Pushed else');
        
          this.props.navigator.push('exercise', {
            exercise: this.props.route.params.sequence[index],
            insideWorkout: true,
            sequence: this.props.route.params.sequence,
            logs: oldLog,
            workoutStarted: this.props.route.params.workoutStarted
          });
       }
     }
     
     if (this.props.route.params.insideWorkout) {
       return(
         <View style ={[Common.container, Common.centered, Common.sectionBorder]}>
         <TouchableOpacity
          style={[Common.brightButtonRounded, Common.shadowBright]}
          onPress={() => {
            this.setState({
                    weight: allWeight,
                    reps: allReps,
                  }, () => {goToNext()}
            )}}>
           <Text style={Common.lightActionTitle}>
             {I18n.t('Next')} {I18n.t('Exercise')}
           </Text>
         </TouchableOpacity>
         </View>
       )
     }
   }

   onVideoEnd() {
        this.videoPlayer.seek(0);
        this.setState({key: new Date(), currentTime: 0, paused: true});
    }

    onVideoLoad(e) {
        this.setState({currentTime: e.currentTime, duration: e.duration});
    }

    onProgress(e) {
        this.setState({currentTime: e.currentTime});
    }

    playOrPauseVideo(paused) {
        this.setState({paused: !paused});
    }

    onBackward(currentTime) {
        let newTime = Math.max(currentTime - FORWARD_DURATION, 0);
        this.videoPlayer.seek(newTime);
        this.setState({currentTime: newTime})
    }

    onForward(currentTime, duration) {
        if (currentTime + FORWARD_DURATION > duration) {
            this.onVideoEnd();
        } else {
            let newTime = currentTime + FORWARD_DURATION;
            this.videoPlayer.seek(newTime);
            this.setState({currentTime: newTime});
        }
    }

    getCurrentTimePercentage(currentTime, duration) {
        if (currentTime > 0) {
            return parseFloat(currentTime) / parseFloat(duration);
        } else {
            return 0;
        }
    }

    onProgressChanged(newPercent, paused) {
        let {duration} = this.state;
        let newTime = newPercent * duration / 100;
        this.setState({currentTime: newTime, paused: paused});
        this.videoPlayer.seek(newTime);
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

            
          
            <Expo.Video
              ref={this.state.videoLink}
              //useNativeControls
              volume={1.0}
              muted={false}
              resizeMode="cover"
              style={{ flex: 1 }}

            />

        </View>)
    }
    }
  render() {

    let exerciseName = I18n.t(this.props.route.params.exercise.name.replace(/[^A-Z0-9]+/ig, ''))
            let {onClosePressed, video, volume} = this.props;
        let {currentTime, duration, paused} = this.state;
        const completedPercentage = this.getCurrentTimePercentage(currentTime, duration) * 100;
        let allReps = [];
          let allWeight = [];
      let inputs = [];

        for(var i=0; (i<this.state.sets && i<7); i++){
            let currSet = 'set' + i;
            let counter = i;
            allReps[counter] = "10";
            allWeight[counter] = "30";
        inputs.push(
            (
    <View key={i} style={styles.InputContainer}>
        <Grid>
          <Col>
            <Text style={[{fontSize: 18, fontWeight: '500', color: '#7F7F7F', paddingTop: 9, paddingLeft: 20}]}>{counter + 1}</Text>
          </Col>
          <Col>
            
            <FormInput
              maxLength={2}
              style={{width: 20}}
              keyboardType={'numeric'}
              onChangeText={reps => {allReps[counter] = reps }}
              defaultValue={"10"}
              />

          </Col>
          <Col>
          <FormInput
            maxLength={3}
            keyboardType={'numeric'}
            onChangeText={weight => {allWeight[counter] = weight}}
            placeholder={"weight"}
            defaultValue={"30"}/>
          </Col>
          </Grid>
    </View>
            )
        );  
    }
    return (
      <ScrollView>
         
      
          {this.displayVideo()}
        {this.renderNextButton(allWeight, allReps)}
        <View style={[Common.container, Common.sectionBorder]}>
          <Text style={Common.darkTitleH1}>{exerciseName}</Text>
          <View style = {Common.inlineContainer}>
            <Tag
              title={I18n.t('muscleGroup')}
              content={I18n.t(this.props.route.params.exercise.muscles)}
              color={'#000'}/>
            <Tag 
              title={I18n.t('Exercises')}
              content={I18n.t(this.props.route.params.exercise.type)}
              color={'#000'}/>
          </View>
        </View>


            
              
              <ActivityPicker/>

            <View style={{height: Layout.gutter.l * 5}}/>
              

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
