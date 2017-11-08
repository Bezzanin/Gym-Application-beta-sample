import React, { Component } from 'react';

import {
 Text,
 View,
 Image,
 TouchableOpacity,
 AsyncStorage,
 ListView,
 FlatList,
 ScrollView,
} from 'react-native';

import * as firebase from 'firebase';

import { MonoText } from '../components/StyledText';
import Common from '../constants/common';
import ExerciseItem from './ExerciseItem';
export default class AlternativeExercise extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      exercises: [1,2,3,4],
      sequence: [],
    }
  }
    static route = {
      navigationBar: {
      visible: true,
      title: 'Replace exercise',
    },
  };

  componentWillMount() {
    AsyncStorage.getItem("exercises").then((json) => {
        console.log(json)
        try {
          const exercises = JSON.parse(json);
          this.setState({exercises});
        } catch(e) {
  
        }
      })
  }

  _renderItem = ({item, index}) => (
    
      <Text>{item.name}</Text>
  )

  render() {
   
    return (
      <View>
          <Text>Replace me</Text>
          <FlatList
            data={this.state.exercises}
            renderItem={this._renderItem}
          />
      </View>
    )
  }

}