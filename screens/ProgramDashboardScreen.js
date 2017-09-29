import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, ListView, TouchableOpacity, Alert, AsyncStorage, NetInfo } from 'react-native';
import ProgramBadge from '../components/ProgramBadge';
import Divider from '../components/Divider';
import ExerciseItem from '../components/ExerciseItem';
import WeekDays from '../components/WeekDays';
import WorkoutExercises from '../components/WorkoutExercises';
import DashboardExercisesList from '../components/DashboardExercisesList';
import Database from '../api/database';
import * as firebase from 'firebase';
import Common from '../constants/common';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};


export default class ExerciseScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          dataSource: new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
          }),
          programName: 'attempt1',
          ownProgram: false,
          editModeOn: false,
          sequence: [],
          sequence2: '',
          isLoading: true,
          isLeavingProgram: false,
          logs: [],
          scrollable: true,
          program: {},
      };
      
  }
  static route = {
    navigationBar: {
      title: 'Program'
    },
  };

  componentDidMount() {
    this.setState({
        program: this.props.route.params.program,
        uid: this.props.route.params.uid,
    })
    this.renderExercises();
      let uid = this.props.route.params.uid;
      Database.getUserProgram( (programName) => {
          this.setState({
              programName
          })
      })
       this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.props.route.params.exercises),
      });
      let timeout = setTimeout( ()=> {
        this.setState({
            isLoading: false
        })
      }, 1000)
    AsyncStorage.getItem('logs').then(json => {
          this.setState({
              logs: JSON.parse(json) || []
          })
      })
      console.log('USERS PROGRAM BELOW')
      console.log(this.state.program)
  }
  rerenderListView = () => {
    

    firebase.database().ref().child('user').child(this.props.route.params.uid).child('ownProgram').child('exerciseSequence').on('value', (snap)=>{
        var ownExercises = [];
        Object.keys(snap.val().exercises).forEach((day) => {
            Object.keys(day).forEach((exercise) => {
                ownExercises.push({
                ...exercise,
                own: true
            });
            })
    
        });
        
        
    }).then( ()=> {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(ownExercises),
            sequence2: ownExercises,
        })
    })


    

}

getOwnExercises() {
    Database.getOwnExercises((exercises) => {
        
        this.setState({
            sequence2: exercises
        }, () => {
            this.setOwnPropertyTo(true)
        })
    })
}
  async renderExercises() {
    let ownProgramKey = '';
    await AsyncStorage.getItem('ownProgramKey').then( (key) => {
        ownProgramKey = JSON.parse(key); 
    })
    
    let currentProgramKey = await this.props.route.params.program._key;
    if (currentProgramKey === ownProgramKey || '') {
        
     
         this.getOwnExercises();
    }
    else {
        this.retrieveFilteredItems();
        this.setOwnPropertyTo(false);
       
    }
  }
  render() {

    const { uid } = this.state;
    return (
      <ScrollView style={styles.container} scrollEnabled={this.state.scrollable}>

        <ProgramBadge 
            days={this.state.program.days}
            program = {this.state.program}
            programName = {this.state.programName}
            ownProgram={this.state.ownProgram}
            sequence = {this.state.sequence2 || {day1: {id: 1}}}
            uid = {this.state.uid}
            handleClick = {this.setOwnPropertyTo.bind(this)}
            handleContinueProgram = {this.handleContinue.bind(this)}
            isLeaving = {this.state.isLeavingProgram}
            style={{flex: 1}}
            />
        <View style={[Common.container, Common.sectionBorder]}>
        <Text style={styles.textBlackTitle}>{I18n.t('Workouts')}</Text>
        
        </View>
        {this.displayWorkoutDays()}
        <Divider/>
      </ScrollView>
    );
  }

displayWorkoutDays() {
    if (this.state.isLoading) {
        return (<View/>)
    }
    let workoutExercises = [];

    for (i = 1; i <= this.state.program.days; i++) {
        let day = 'day' + i;
        let length =  2//this.state.sequence2[day].length;
        workoutExercises.push(
            <View>
                <WorkoutExercises 
                    key={i} 
                    dayNumber={i}
                    numberOfExercises={length}
                    muscles={this.state.program[day]}
                    exercises={this.state.sequence2[day]}
                    data={this.state.sequence2[day]}
                    sequence={this.state.sequence2}
                    day={day}
                    program={this.state.program}
                    isLeaving={this.state.isLeavingProgram}
                    />
            </View>
        );
    }
    
    return (workoutExercises)
}


setOwnPropertyTo(bool) {
    console.log('Touched set own property')
    revertExercise = () => {

        Object.keys(this.state.sequence2).forEach((day) => {
            console.log('Day is' + day);
            this.state.sequence2[day].forEach((exercise) => {
                exercise.own = bool;
            })
        })
    }
    revertExercise();
}


retrieveFilteredItems() {
    let exercisesSequence = {day1: {id: 0}};
    
    for ( i=1; i<=this.props.route.params.program.days; i++ ) {
        let dayNumberIDs = 'day' + i + 'exercises';
        let day = 'day' + i;
        let exercisesArray = [];
        console.log(this.props.route.params.program[dayNumberIDs]);
        this.props.route.params.program[dayNumberIDs].split(', ').forEach((id) => {
            this.props.route.params.exercises.forEach((exercise) => {
                if (exercise._key === id) {
                    exercisesArray.push(exercise);
                }
            })
        })
        exercisesSequence[day] = exercisesArray;
    }
    console.log('setState 3, sequnce2');
    this.setState({
        sequence2: exercisesSequence
    })
}

filterByNumber = (arrayToFilter, n) => {
  let muscleToCompareWith = 'brain';
  let counter = 1;
  let filtered = [];
  arrayToFilter.forEach((item) => {
    if ((item.muscles !== muscleToCompareWith)) {
      counter = 1;
      muscleToCompareWith = item.muscles;
      filtered.push(item);
    }
    else if ((item.muscles === muscleToCompareWith) && (counter < n)) {
      filtered.push(item);
      counter++;
    }
  });
  return filtered;
}

handleClick(bool) {
    this.setOwnPropertyTo(bool);
    this.rerenderListView;
}

handleContinue() {
    let timeout = setTimeout(() => {
        if (!this.state.isLeavingProgram) {
        let index, day, dayNumber;
        
        Database.getCurrentExerciseIndex( (currentIndex) => {index = currentIndex});
        Database.getCurrentWorkoutDay( (currentDay) => { dayNumber = currentDay});
        if ( dayNumber === this.props.route.params.program.days) {
            dayNumber = 1;
        }
        day = 'day' + dayNumber
        this.props.navigator.push('exercise', {
            exercise: this.state.sequence2[day][index],
            insideWorkout: true,
            sequence: this.state.sequence2[day],
            logs: this.state.logs,
            workoutStarted: Date.now()
        })
        }
    }, 1000)
    
}

compare = (property) => {
    return (a, b) => {
        if (a[property] < b[property]) return -1;
        if (a[property] > b[property]) return 1;
        return 0;
    }
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
      height: 200,
      backgroundColor: 'transparent',
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowRadius: 4,
      shadowOpacity: 0.5,
      marginBottom: 10
  },
  textWhite: {
      color: '#fff'
  },
  textWhiteTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff'
  },
  textBlackTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000'
  }
});