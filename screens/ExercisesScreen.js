import React, { Component } from 'react';

import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListView,
  AppRegistry,
  AlertIOS,
  TextInput,
  AsyncStorage,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { LoginScreen } from './LoginScreen';
import Filters from '../components/Filters';
import Common from "../constants/common";
const StatusBar = require('../components/StatusBar');

const ExerciseItem = require('../components/ExerciseItem');
const styles = require('../constants/styles.js');
import Database from '../api/database';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};


const filterExercises = (filter, exercises) => {
return exercises.filter((item) => {
  if (filter === 'ALL') return true;
  if (filter === 'triceps') return item.muscles === 'triceps';
  if (filter === 'biceps') return item.muscles === 'biceps';
  if (filter === 'chest') return item.muscles === 'chest';
  if (filter === 'abs') return item.muscles === 'abs';
  if (filter === 'legs') return item.muscles === 'legs';
  if (filter === 'glutes') return item.muscles === 'glutes';
  if (filter === 'shoulders') return item.muscles === 'shoulders';
  if (filter === 'calves') return item.type === 'calves';
  if (filter === 'back') return item.muscles === 'back';
  if (filter === 'BASIC') { return item.type === 'basic';}
  if (filter === 'ISOLATION') return item.type === 'isolation';
})
}

export default class ExercisesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      uid: "",
      uriLink: "",
      videoLink: "",
      todo: "",
      todoForm: "",
      filter: "ALL",
      exercises: []
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.setSource = this.setSource.bind(this);
  }
  static route = {
    navigationBar: {
      visible: true,
      title: I18n.t('ExercisesLibrary'),
    },
  };

  componentDidMount() {
    AsyncStorage.getItem("exercises").then((json) => {
      try {
        const exercises = JSON.parse(json);
        this.setSource(exercises, exercises);
        this.setState({exercises: filterExercises(this.props.route.params.filter, exercises)})
        this.setSource(this.state.exercises, filterExercises(this.props.route.params.filter, exercises), { })
      } catch(e) {

      }
    })
  }

  handleFilter(filter) {
    this.setSource(this.state.exercises, filterExercises(filter, this.state.exercises), { filter })
  }

  setSource(exercises, itemsDatasource, otherState = {}){
    this.setState({
      exercises,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ... otherState
    });
  }


  render() {
   
    return (
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading1}>{I18n.t('SearchExercises')}</Text>
        <Filters
          onFilter={this.handleFilter}
          filter={this.state.filter}/>
      </View>
        <ListView
          dataSource={this.state.dataSource}
          initialListSize = {4}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={[Common.containerBasic, Common.sectionBorder]}/>
      </ScrollView>
    )
  }
/**
 * Private Functions
 */
  _renderItem(item) {
    goToRoute = () => {
    this.props.navigator.push('exercise', {
      exercise: item
    })
  }

    returnExerciseId = () => {
      AsyncStorage.setItem('quickAddId', item._key);
      this.props.navigator.pop();
    }
  if (this.props.quickWorkout) {
    return (
      <ExerciseItem item={item} videoLink={item.video} onPress={returnExerciseId}/>
    );
  } else {
  return (
    <ExerciseItem item={item} videoLink={item.video} onPress={goToRoute}/>
  );
}
  }
}