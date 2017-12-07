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
      editModeOn: false,
      data: this.props.route.params.exercises.slice(),
      dataSource: new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
          }),
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.sendIndex = this.sendIndex.bind(this)
  }
  static route = {
    navigationBar: {
      visible: true,
      title(params){ 
        return ` ${params.dayNumber} ${I18n.t('Day')}`
      },
    }
  };
  handleToggle = () => {
    this.setState({
      editModeOn: !this.state.editModeOn
    })
  }

  sendIndex(id, actionType) {
    if (this.state.newData) { var newLog = this.state.newData} 
    else { var newLog = this.props.route.params.exercises.slice();}
    if (actionType === 'delete') {
      var editedExercise = newLog.filter((exercise) => {
        return (exercise._key !== id)
      }) } 
    this.setState({ newData: editedExercise })
  }
  componentWillMount() {
    this.setState({ data: this.props.route.params.exercises.slice()}) 
    order =  Object.keys(this.props.route.params.exercises.slice());
    editModeOn = false;
    this.setState({loaded: !this.state.loaded})
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
        renderHeader={() => <View>
                              <EditModeButton
                                handleToggle={this.handleToggle}
                                exercises ={data}
                                order={order}
                                editModeOn={false}/>
                            </View>}
        data={data}
        order={order}
        onRowMoved={e => {
          order.splice(e.to, 0, order.splice(e.from, 1)[0])
          this.forceUpdate();
        }}
        renderRow={(row) => {
          if (typeof row != 'undefined') {
            console.log(row)
        return(<ExerciseItem
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
            // console.log('ITEM IS ITEM IS')
            // console.log(row);
            // console.log('XDAYEXERCISES SEQUENCE')
            // console.log(this.props.route.params.exercises);
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