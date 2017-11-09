import React, { Component } from 'react';

import {
 Text,
 View,
 TouchableOpacity,
 AsyncStorage,
 FlatList,
 ScrollView,
 Image
} from 'react-native';
import Common from '../constants/common';
import ExerciseItem from './ExerciseItem';

export default class AlternativeExercise extends Component {

  constructor(props) {
    super(props);
    this.state = {
      exercises: '',
      exerciseName: '',
      sequence: [{
        name: 'Placeholder',
        _key: 21,
        muscles: 'random',
        photo: "penkkipunnerrus",
        type: "basic",
        video: "penkkipunnerrus",
      }],
    }
  }
    static route = {
      navigationBar: {
      visible: true,
      title: 'Replace exercise',
    },
  };

  componentWillMount() {
    this.setState({
      exerciseName: this.props.exerciseName
    })
    AsyncStorage.getItem("exercises").then((json) => {
        console.log(json)
        try {
          const exercises = this.filterExercises(JSON.parse(json), this.props.exerciseMuscles, this.props.exerciseType, this.props.exerciseName);
          this.setState({exercises, allExercises:JSON.parse(json)});
        } catch(e) {
  
        }
      })
  }
  updateExercises(name) {
    this.setState({
      exerciseName: name
    }, () => {
      let updatedExercises = this.filterExercises(this.state.allExercises, this.props.exerciseMuscles, this.props.exerciseType, this.state.exerciseName);
      this.setState({exercises: updatedExercises})
    })
  }
 
  filterExercises(exercises, muscles, type, name){
    return exercises.filter((exercise) => {
      return exercise.muscles === muscles && exercise.type === type && exercise.name !== name;
    })
  }

  _renderItem = ({item, index}) => {
    return (
      
      <ExerciseItem item={item} onPress={() => {
        this.updateExercises(item.name);
        this.props.onReplace(item.name, item._key)}}/>
    )
  }

  render() {
   
    return (
      <View>
        <View style={{height: 54}}/>
        <View style={Common.paddingLeft}>
          <Text style={{color: '#000',
                        fontSize: 16,
                        lineHeight: 18,
                        fontWeight: 'bold',
                        backgroundColor: 'transparent'}}>No equipment?</Text>
          <Text style={{color: '#000',
                        fontSize: 16,
                        lineHeight: 18,
                        fontWeight: 'bold',
                        backgroundColor: 'transparent'}}>Replace with alternative</Text>
          </View>
          <FlatList
            horizontal
            data={this.state.exercises}
            renderItem={this._renderItem.bind(this)}
          />
      </View>
    )
  }

}