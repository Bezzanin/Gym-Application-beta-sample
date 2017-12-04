import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, AsyncStorage, TouchableOpacity } from "react-native";
import I18n from 'ex-react-native-i18n';
import Database from '../api/database';
import Layout from '../constants/Layout';
import Common from '../constants/common';
import StatItem from '../components/StatItem';
import _ from 'lodash';


class QuickWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: {},
          exercises: [],
        };
        this.quickAddWorkout = this.quickAddWorkout.bind(this)
        this.changeText = this.changeText.bind(this)
        this.sendIndex = this.sendIndex.bind(this)
        this.addSet = this.addSet.bind(this)
      }
      static route = {
        navigationBar: {
          title: 'Quick Workout'
        },
      };

    componentWillMount() {
      AsyncStorage.removeItem("quickAddId")
        AsyncStorage.getItem("exercises").then((json) => {
         try {
           const exercises = JSON.parse(json);
           this.setState({
             exercises
           }, () => {
             this.setState({ loading: true })
           });
         } catch(e) {
           console.log(e);
         }
     })

     Database.DiaryStats((log) => {
        this.setState({
          items: log
        }, () => {
          var arr = _.values(this.state.items);
          var lastLog = _.flatten(_.last(arr));
          this.setState({ lastLog: lastLog, myItems: lastLog })
        });
        })
    }

    quickAddWorkout() {
        // var myArr = this.state.items
    // Object.keys(myArr)
    // .forEach(function eachKey(key) { 
    //   console.log(key); // alerts key 
    //   console.log(myArr[key]); // alerts value
    // });
    // var arr = _.values(this.state.items);
    // var lastLog = _.flatten(_.last(arr));
    // // Database.pushWorkoutLog(_.flatten(lastLog));
    // this.setState({ lastLog })
    // console.log(this.state.myItems)
    Database.pushWorkoutLog(this.state.myItems);
    this.props.navigator.popToTop()
}
    changeText(counter, value, id, dataType) {
      Database.DiaryStats((log) => {
        var res = log
        var arr = _.values(res);
        if (this.state.myItems) {
          var newLog = this.state.myItems
        } else {  var newLog = _.flatten(_.last(arr)); }
        var editedExercise = newLog.map((exercise) => {
          if (exercise.id === id) {
            if (dataType === 'reps') {exercise.reps[counter] = value}
            if (dataType === 'weight') {exercise.weight[counter] = value}
            if (dataType === 'sets') {
              exercise.sets = parseInt(exercise.sets)+1
              exercise.reps.push("0")
              exercise.weight.push("0")
            }
          }
        })
        this.setState({ myItems: newLog})
        })      
    }

    sendIndex(id, actionType) {
      console.log(actionType)
      Database.DiaryStats((log) => {
        var res = log
        var arr = _.values(res);
        if (this.state.myItems) {
          var newLog = this.state.myItems
        } else {  var newLog = _.flatten(_.last(arr)); }
        //delete exercise
        if (actionType === 'delete') {
        var editedExercise = newLog.filter((exercise) => {
          return (exercise.id !== id)
        }) } 
        //add exercise
        else if (actionType === 'add') {
          var newExerciseLog = {
            "id": id,
            "metric": "kg",
            "reps": [
              "5",
            ],
            "sets": 1,
            "weight": [
              "25",
            ],
          }
          newLog.push(newExerciseLog);
          var editedExercise = newLog;
        } else {
          newLog.map((exercise) => {
            if (exercise.id === id) {
              
            }
          })
          var editedExercise = newLog
        }
        this.setState({ myItems: editedExercise})
        })
    }

    addSet(sets) {
      console.log(sets)
    }

    addNewExercise() {
      this.props.navigator.push('exercises', {
        filter: 'ALL',
        quickWorkout: true
    })
  }

  componentWillReceiveProps() {
    AsyncStorage.getItem("quickAddId").then((id) => {
      if (typeof(id) === 'string') {
        this.sendIndex(id, 'add')
      } else { console.log("Else")}
      
  })
  }

  render() {
    if(this.state.lastLog) {
    let log = "";
    let solo = false;
    let newlog = []
    let iterateLog = []
    if (this.state.myItems) {
      iterateLog = this.state.myItems
    } else {  iterateLog = this.state.lastLog }
    if (Array.isArray(iterateLog)) {
      iterateLog.map((item) => {
    log = this.state.exercises.filter((exercise) => {
      return exercise._key === item.id
    })  
       
    newlog.push({
      ...log[0],
      ...item,
    })
  })


    

    return (
    <View style={[styles.item, Common.shadowLight]}>
      
      <Text style={[{paddingLeft: Layout.gutter.l, paddingTop: Layout.gutter.m},Common.darkTitleH3]}>Edit the exercises</Text>
      
    <FlatList
        data={newlog}
        renderItem={({item, index}) => 
          (<StatItem 
            key={item.id}
            last={index === newlog.length-1 ? true : false} 
            own={item._key ? false : true} item={item} 
            imageLink={item.photo} 
            changeText={this.changeText} 
            sendIndex={this.sendIndex}
            addSet={this.addSet}
            swipable={true}/>)
        }
    />

    <View style={{flex: 3, justifyContent: 'flex-start'}}>
          <TouchableOpacity
              style={[Common.brightButtonRounded, Common.shadowMedium]}
              onPress={() => {this.addNewExercise()}}>
              <Text style={Common.lightActionTitle}>Add Exercise</Text>
      </TouchableOpacity>
      <TouchableOpacity
              style={[Common.brightButtonRounded, Common.shadowMedium]}
              onPress={() => {this.quickAddWorkout()}}>
              <Text style={Common.lightActionTitle}>Add Workout</Text>
      </TouchableOpacity>
          </View>
    </View>
    
  );
} else {
    let newlog = iterateLog;
    return (
    <View style={[styles.item, Common.shadowLight]}>
      <Text style={[{paddingLeft: Layout.gutter.l, paddingTop: Layout.gutter.m},Common.darkTitleH3]}>{I18n.t('CustomExercises')}</Text>
    <StatItem last={true} own={newlog._key ? false : true} item={newlog} imageLink={newlog.photo} swipable={true}/>
    </View>
  );
  }
  
} else {
  return (
    <View>
      <Text>Loading...</Text>
    </View>)
}
  }
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: '#fff',
    },
    workoutsContainer: {
      alignSelf: 'center',
      flexDirection: 'row', 
      position: 'absolute', 
      width: Layout.window.width * 0.85, 
      justifyContent: 'space-between',
      marginHorizontal: 15
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    item: {
      backgroundColor: 'white',
      flex: 1,
      marginTop: 35,
      paddingBottom: 5,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5
    },
    emptyDate: {
      height: 15,
      flex:1,
      paddingTop: 30
    }
  });

export default QuickWorkout;