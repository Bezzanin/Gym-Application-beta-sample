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
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
import {withNavigation} from '@expo/ex-navigation';
import SortableListView from 'react-native-sortable-listview';
import EditModeButton from '../components/EditModeButton';

I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

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
    console.log('Propable toggle')
    this.setState({
      editModeOn: !this.state.editModeOn
    })
  }
  componentWillMount() {
    console.log('Remount');
    data = this.props.route.params.exercises.slice();
    order =  Object.keys(this.props.route.params.exercises.slice());
    editModeOn = false;
    this.setState({loaded: !this.state.loaded})
  }

  render() {
    if (this.state.loaded) {
      return (
        <SortableListView
        style={{ flex: 1 }}
        disableSorting={!this.state.editModeOn}
        renderHeader={() => <View><TouchableOpacity onPress={() => {console.log(this.props)}}><Text>Check order</Text></TouchableOpacity><EditModeButton handleToggle={this.handleToggle} exercises ={data} order={order} editModeOn={false}/></View>}
        data={this.props.route.params.exercises.slice()}
        order={order}
        onRowMoved={e => {
        order.splice(e.to, 0, order.splice(e.from, 1)[0])
        this.forceUpdate();
        console.log(data);
        console.log(order);
       // Database.saveDaySequence(this.sortExercises(this.props.route.params.exercises.slice(), order), 'day1');
        //this.props.navigator.pop();
        }}
        renderRow={row => <ExerciseItem item={row} imageLink={row.photo} onPress={this.goToRoute} onReplace={this.goToReplace.bind(row)}/>}
    />
      )
    }
    else {
      <View/>
    }
  }


    goToReplace = () => {
      this.props.navigator.push('replaceExercise', {
        item: row,
        sequence: this.props.route.params.exercises,
        day: this.props.route.params.day
      })
    }
    goToRoute = () => {
      this.props.navigator.push('exercise', {
        exercise: item,
      })
    }

}