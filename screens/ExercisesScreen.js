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
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};


const filterExercises = (filter, exercises) => {
return exercises.filter((item) => {
  if (filter === 'ALL') return true;
  if (filter === 'triceps') return item.muscles === 'triceps';
  if (filter === 'biceps') return item.muscles === 'biceps';
  if (filter === 'chest') return item.muscles === 'chest';
  if (filter === 'abs') return item.muscles === 'abs';
  if (filter === 'legs') return item.muscles === 'legs';
  if (filter === 'glutes') return item.muscles === 'glutes';
  if (filter === 'calves') return item.type === 'calves';
  if (filter === 'back') return item.muscles === 'back';
  if (filter === 'BASIC') return item.type === 'basic';
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

  componentWillMount() {
    AsyncStorage.getItem("exercises").then((json) => {
      try {
        const exercises = JSON.parse(json);
        console.log(exercises)
        this.setSource(exercises, exercises);
        this.setState({exercises: filterExercises('ALL', exercises)})
        this.setSource(this.state.exercises, filterExercises('ALL', exercises), { })
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

  setSearchText(action){
    let searchText = action;

    moviesLength = this.state.exercises.length;
    aMovie = this.state.exercises;

    const filteredMovies = this.state.exercises.filter((exercise) => {
      return (exercise.name.includes(searchText))
    });

    

    this.setState({
      searchText,
      dataSource: this.state.dataSource.cloneWithRows(filteredMovies)
  })
  }

  render() {
   
    return (
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading1}>{I18n.t('SearchExercises')}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="Search ex......."
          value={this.state.searchText}
          onChangeText={this.setSearchText.bind(this)} />
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
    return (
      <ExerciseItem item={item} videoLink={item.video} onPress={goToRoute}/>
    );
  }
}