import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, AsyncStorage } from "react-native";
import I18n from 'ex-react-native-i18n';
import Database from '../api/database';
import Layout from '../constants/Layout';
import Common from '../constants/common';
import StatItem from '../components/StatItem';
import _ from 'lodash';
import SortableListView from 'react-native-sortable-listview';


class QuickWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: {},
          exercises: [],
        };
        this.quickAddWorkout = this.quickAddWorkout.bind(this)
      }
      static route = {
        navigationBar: {
          title: 'Quick Workout'
        },
      };

    componentWillMount() {
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
          this.quickAddWorkout()
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
    var arr = _.values(this.state.items);
    var lastLog = _.flatten(_.last(arr));
    // Database.pushWorkoutLog(_.flatten(lastLog));
    this.setState({ lastLog })
}

  render() {
    if(this.state.lastLog) {
    let log = "";
    let solo = false;
    let newlog = []
    if (Array.isArray(this.state.lastLog)) {
      this.state.lastLog.map((item) => {
    log = this.state.exercises.filter((exercise) => {
      return exercise._key === item.id
    })  
       
    newlog.push({
      ...log[0],
      ...item,
    })
    console.log(newlog)
  })

    return (
    <View style={[styles.item, Common.shadowLight]}>
      
      <Text style={[{paddingLeft: Layout.gutter.l, paddingTop: Layout.gutter.m},Common.darkTitleH3]}>Edit the exercises</Text>
      
    <FlatList
        data={newlog}
        renderItem={({item, index}) => 
          (<StatItem last={index === newlog.length-1 ? true : false} own={item._key ? false : true} item={item} imageLink={item.photo}/>)
        }
    />
    </View>
    
  );
} else {
    let newlog = this.state.lastLog;
    return (
    <View style={[styles.item, Common.shadowLight]}>
      <Text style={[{paddingLeft: Layout.gutter.l, paddingTop: Layout.gutter.m},Common.darkTitleH3]}>{I18n.t('CustomExercises')}</Text>
    <StatItem last={true} own={newlog._key ? false : true} item={newlog} imageLink={newlog.photo}/>
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