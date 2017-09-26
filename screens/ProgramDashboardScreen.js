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


Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

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
          logs: []
      };
      this.passChanges = this.passChanges.bind(this);
  }
  static route = {
    navigationBar: {
      title: 'Program',
      renderRight: (route, props) => {
          <TouchableOpacity onPress={() => {
              this.setState({editModeOn: !this.state.editModeOn})}}><Text>Edit</Text></TouchableOpacity>
      }
    },
  };
  
//   renderRightComponent = () => {
//       if (this.state.ownProgram && this.state.editModeOn) {
//           return <TouchableOpacity onPress={() => {
//               Database.saveExerciseSequence(this.state.sequence2);
//               this.setState({editModeOn: !this.state.editModeOn})}}><Text>Done</Text></TouchableOpacity>
//       }
//     else if (this.state.ownProgram && !this.state.editModeOn) {
//         return <TouchableOpacity onPress={() => {
//               this.setState({editModeOn: !this.state.editModeOn})}}><Text>Edit</Text></TouchableOpacity>
//     } 
//     else {
//         return <View/>
//     }
//   }
  componentDidMount() {
    this.renderExercises();
      let uid = this.props.route.params.uid;
      Database.getUserProgram( (programName) => {
          console.log('setState 5, programName');
          this.setState({
              programName
          })
      })
        console.log('setState 7 some datasource');
       this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.props.route.params.exercises),
      });
      let timeout = setTimeout( ()=> {
        this.setState({
            isLoading: false
        })
      }, 1000)
    AsyncStorage.getItem('logs').then(json => {
          console.log('setState 4, async logs');
          this.setState({
              logs: JSON.parse(json) || []
          })
      })
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
        console.log('setState 6, sequence2, datasource');
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(ownExercises),
            sequence2: ownExercises,
        })
    })


    

}

getOwnExercises() {
     console.log('getOwnExercises')
    Database.getOwnExercises((exercises) => {
        console.log('getOwnExercises from db')
        console.log('setState 1');
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
        
        console.log('setState 2, ownProgram');
         //this.setState({ownProgram: true})
         //this._retrieveFilteredItems();
         //this.rerenderListView();
         console.log('getOwnExercises');
         this.getOwnExercises();
    }
    else {
        console.log("It's not your program, else triggered")
        this.retrieveFilteredItems();
        this.setOwnPropertyTo(false);
       
    }
  }
  render() {

    const { uid } = this.state;
    return (
      <ScrollView style={styles.container}>

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
passChanges(newOrder, day){
    const exercises = this.state.sequence2;
    exercises[day] = newOrder;
    console.log(exercises[day]);

    this.forceUpdate();
    console.log(this.state.sequence2)
}

saveChanges() {
    Database.saveExerciseSequence(this.state.sequence2);
}

displayWorkoutDays() {
    if (this.state.isLoading) {
        return (<View/>)
    }
    let workoutExercises = [];

    for (i = 1; i <= this.props.route.params.program.days; i++) {
        let day = 'day' + i;
        let length =  2//this.state.sequence2[day].length;

        workoutExercises.push(
            <View>
                <WorkoutExercises 
                    key={i} 
                    dayNumber={i}
                    numberOfExercises={length}
                    muscles={this.props.route.params.program[day]}
                    exercises={this.state.sequence2[day]}
                    data={this.state.sequence2[day]}
                    sequence={this.state.sequence2}
                    day={day}
                    program={this.props.route.params.program}
                    isLeaving={this.state.isLeavingProgram}
                    editMode={this.state.editModeOn}
                    passChanges={this.passChanges}
                    //onMoveUp={this.handleMoveUp}
                    onMoveDown={this.handleMoveDown}/>
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