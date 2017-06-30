import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, ListView, TouchableOpacity, Alert, AsyncStorage, NetInfo } from 'react-native';
import ProgramBadge from '../components/ProgramBadge';
import Divider from '../components/Divider';
import ExerciseItem from '../components/ExerciseItem';
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
          sequence: [],
          sequence2: '',
          isLoading: true,
          isLeavingProgram: false,
          logs: []
      }
  }
  static route = {
    navigationBar: {
      title(params){
        return params.program.name
      }
    },
  };
  componentWillMount() {
      console.log('Triggered')
      AsyncStorage.getItem('logs').then(json => {
          this.setState({
              logs: JSON.parse(json) || []
          }, function logCOnsole() {
              console.log('Log below')
              console.log(this.state.logs);
          })
      })
  }
  componentDidMount() {
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
  }
  rerenderListView = () => {
    

    firebase.database().ref().child('user').child(this.props.route.params.uid).child('ownProgram').child('exerciseSequence').on('value', (snap)=>{
        var ownExercises = [];
        Object.keys(snap.val().exercises).forEach((day) => {
            console.log(day);
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
    console.log('Getting own exercises');
    Database.getOwnExercises((exercises) => {
        this.setState({
            sequence2: exercises
        }, () => {
            console.log('Getting own exercises...')
            this.setOwnPropertyTo(true)
        })
    })
}
  async renderExercises() {
    let ownProgramKey = '';
    console.log('PERFORMED RERENDER PERFORMED RERENDER PERFORMED RERENDER');
    await AsyncStorage.getItem('ownProgramKey').then( (key) => {
        ownProgramKey = JSON.parse(key); 
    })
    
    let currentProgramKey = await this.props.route.params.program._key;
    if (currentProgramKey === ownProgramKey || '') {
        console.log("It's your program")
         this.setState({ownProgram: true})
         //this._retrieveFilteredItems();
         //this.rerenderListView();
         this.getOwnExercises();
    }
    else {
        console.log("It's not your program, else triggered")
        this._retrieveFilteredItems();
        this.setOwnPropertyTo(false);
       
    }
  }
  render() {

    const { uid } = this.state;
    return (
      <ScrollView style={styles.container}>
        {/*<View style={styles.imageContainer}>
            <Image 
                source={require('../assets/images/program_background.png')}
                resizeMode={Image.resizeMode.fill}
                style={{flex: 1, width: null, height: null}}
            >
                <Text style={styles.textWhiteTitle}>{this.props.route.params.program._key}</Text>
            </Image>
        </View>*/}
        <ProgramBadge 
            days={this.props.route.params.program.days}
            program = {this.props.route.params.program}
            programName = {this.state.programName}
            ownProgram={this.state.ownProgram}
            sequence = {this.state.sequence2 || {day1: {id: 1}}}
            uid = {this.props.route.params.uid}
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

    for (i = 1; i <= this.props.route.params.program.days; i++) {
        let day = 'day' + i;
        let length =  this.state.sequence2[day].length;

        workoutExercises.push(
            <View>
                <WorkoutExercises 
                    key={i} 
                    dayNumber={i}
                    numberOfExercises={length}
                    muscles={this.props.route.params.program[day]}
                    exercises={this.state.sequence2[day]}
                    day={day}
                    program={this.props.route.params.program}
                    isLeaving={this.state.isLeavingProgram}/>
            </View>
        );
    }
    
    return (workoutExercises)
}


setOwnPropertyTo(bool) {
    revertExercise = () => {
        console.log('this.state.sequence2 below');
        console.log(this.state.sequence2);
        Object.keys(this.state.sequence2).forEach((day) => {
            console.log('Day is' + day);
            this.state.sequence2[day].forEach((exercise) => {
                exercise.own = bool;
            })
        })
    }
    revertExercise();
}

_retrieveFilteredItems(filter, exercises) {
    let exercisesSequence = {day1: {id: 0}};
    let newArr = this.props.route.params.exercises.sort(this.compare('muscles'));
    for ( i=1; i<=this.props.route.params.program.days; i++ ) {
        let day = 'day' + i;
        let ref = this.props.route.params.program[day];
        let filteredByDay = this.props.route.params.exercises.filter((item) => {
            return ref.split(', ').includes(item.muscles);
        })

        let filteredByNumber = this.filterByNumber(filteredByDay, 4);
        exercisesSequence[day] = filteredByNumber;
    }
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
    console.log('Triggered handleClick')
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