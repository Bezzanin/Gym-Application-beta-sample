import React, { Component } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  ScrollView,
} from 'react-native';

import Database from '../api/database';
import ExerciseItem from '../components/ExerciseItem';
import Common from '../constants/common';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import {withNavigation} from '@expo/ex-navigation';
import SortableListView from 'react-native-sortable-listview';
import EditModeButton from '../components/EditModeButton';
import ru from '../constants/ru';
import en from '../constants/en';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

let data, order, editModeOn;


export default class XDAYExercisesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      ownProgram: '',
      loaded: false,
      editModeOn: true,
      data: this.props.route.params.exercises.slice(),
      dataSource: new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
          }),
    }
    this.sendIndex = this.sendIndex.bind(this)
  }
  static route = {
    navigationBar: {
      visible: true,
      title(params){ 
        return ` ${params.dayNumber} ${I18n.t('Day')}`
      },
      renderRight: ({params}, props) => <Text>{params.day}</Text>
    }
  };

  sendIndex(id, actionType) {
    if (this.state.newData) { var newLog = this.state.newData} 
    else { var newLog = this.props.route.params.exercises.slice();}
    if (actionType === 'delete') {
      var editedExercise = newLog.filter((exercise) => {
        return (exercise._key !== id)
      }) }
    else if (actionType === 'add') {
      var isInsideWorkout = newLog.filter((exercise) => {
        return (exercise._key === id[0]._key)
      })
      if(isInsideWorkout.length > 0) {
        console.log('Same Exercise Exists');
        console.log(isInsideWorkout)
        var editedExercise = newLog
      } else { 
        newLog.push(id[0]); 
        console.log(isInsideWorkout);
        var editedExercise = newLog}
    }
    else if (actionType === 'replace') {
      console.log('New LOGGG', newLog)
      console.log(id)
      var editedExercise = newLog.map((exercise) => {
        if (exercise._key === id[0]) {
          exercise = JSON.parse(id[1])
          return (exercise)
        } else { console.log('Else'); return(exercise);}
      })
      console.log(editedExercise)
    }  
    this.setState({ newData: editedExercise })
  }
  componentWillMount() {
    AsyncStorage.getItem("exercises").then((json) => {
      try {
        const exercises = JSON.parse(json);
        this.setState({
          allExercises: exercises
        });
      } catch(e) {
        console.log(e);
      }
  })

    this.setState({ data: this.props.route.params.exercises.slice()}) 
    order =  Object.keys(this.props.route.params.exercises.slice());
    editModeOn = false;
    this.setState({loaded: !this.state.loaded})
  }

  componentWillReceiveProps() {
    if(this.state.allExercises) {
    AsyncStorage.getItem('quickAddId').then((id) => {
      if (typeof(id) === 'string') {
        var addedExercises = this.state.allExercises.filter((exercise) => {
          return (exercise._key === id)
        })
        console.log()
        this.sendIndex(addedExercises, 'add')
      } else { console.log('noAsync')}
      
    })

    AsyncStorage.getItem("quickReplaceThis").then((replaceThis) => {
      return(replaceThis);
    }).then((replaceThis) => {
      AsyncStorage.getItem("quickReplaceWith").then((id) => {
        return ([replaceThis, id]);
      }).then((res) => {
        if (typeof(res[0]) === 'string') {
          this.sendIndex(res, 'replace')
        } else { console.log("No Exercise to Replace")} 
      }).then((res) => { 
        AsyncStorage.removeItem("quickReplaceThis");
        AsyncStorage.removeItem("quickReplaceWith");
      })
  })

    } else {console.log('No All Exercises')}
  }

  render() {
    if (this.state.loaded) {
    if (this.state.newData) {
      data = this.state.newData
      order = Object.keys(this.state.newData.slice())
    } else { data = this.state.data }
      return (
        <SortableListView
        style={{ flex: 1 }}
        disableSorting={!this.state.editModeOn}
        renderFooter={() => 
                              <EditModeButton
                                exercises ={data}
                                order={order}
                                editModeOn={false}/>
                            }
        data={data}
        order={order}
        onRowMoved={e => {
          order.splice(e.to, 0, order.splice(e.from, 1)[0])
          this.forceUpdate();
        }}
        renderRow={(row) => {
          if (typeof row != 'undefined') {
        return(<ExerciseItem
        quickWorkout={true}
        sendIndex={this.sendIndex}
        item={row}
        editModeOn={this.state.editModeOn}
        imageLink={row.photo}
        onPress={() => {
          this.props.navigator.push('exercise', {
        exercise: row,
      })
        }}
        onReplace={
          () => {
            this.props.navigator.push('replaceExercise', {
              item: row,
              sequence: this.props.route.params.exercises,
              day: this.props.route.params.day
            })
          }
        }/>)} else { return( <View /> ) }}}
    />
      )
    }
    else {
      <View/>
    }
  }

}