import React, { Component } from 'react';

import {
 Text,
 View,
 Image,
 TouchableOpacity,
 AsyncStorage,
 ListView,
 ScrollView,
} from 'react-native';

import * as firebase from 'firebase';

import { MonoText } from '../components/StyledText';
import Common from '../constants/common';
const ExerciseItem = require('../components/ExerciseItem');

export default class ReplaceExerciseScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      exercises: []
    }
  }
    static route = {
      navigationBar: {
      visible: true,
      title: 'Replace exercise',
    },
  };

  componentDidMount() {
    AsyncStorage.getItem("exercises").then((json) => {
      try {
        const exercises = JSON.parse(json);
        const filteredExercises = this.filterExercises(exercises);
        this.setState({exercises, dataSource: this.state.dataSource.cloneWithRows(filteredExercises)});
      } catch(e) {

      }
    })
  }

  filterExercises(exercises){
    return exercises.filter((exercise) => {
      return exercise.type === this.props.route.params.item.type;
    })
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
      <ScrollView>
      <View style={[Common.container, Common.sectionBorder]}>
      <Text style={Common.darkTitleH1}>{I18n.t('Replace')} {I18n.t('Exercise')}</Text>
          <ExerciseItem
            item = {this.props.route.params.item}
          />
      </View>
      <View style={Common.container}>
      <Text style={Common.darkTitleH1}>{I18n.t('WithOneFromBelow')}</Text>
        <ListView
          dataSource={this.state.dataSource}
          initialListSize = {4}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
      
/>
         </View>
      </ScrollView>
    )
  }
  
  _renderItem(item) {
    replaceExerciseWithAlternative =  (replaceId, itemToReplaceWith) => {
        // let day = this.props.route.params.day;
        // console.log('THIS IS SEQUENCE');
        // console.log(this.props.route.params.sequence);
        // let replacePosition = this.props.route.params.sequence.map( (e) => { return e._key; }).indexOf(replaceId);
        // this.props.route.params.sequence[replacePosition] = itemToReplaceWith;
        // let uid = firebase.auth().currentUser.uid;
        
        // firebase.database().ref('/user/' + uid + '/ownProgram/exerciseSequence/').child('exercises').update({
        //     [day]: this.props.route.params.sequence
        // });
        AsyncStorage.setItem('quickReplaceThis', replaceId);
        AsyncStorage.setItem('quickReplaceWith', JSON.stringify(itemToReplaceWith));
        this.props.navigator.pop(1);
    }

    replaceExercise = (replaceThis, replaceWith) => {
      AsyncStorage.setItem('quickReplaceThis', replaceThis);
      AsyncStorage.setItem('quickReplaceWith', replaceWith._key);
      this.props.navigator.pop();
    }
    if (this.props.route.params.quickWorkout) {
      return (
        <ExerciseItem item={item} imageLink={item.photo} videoLink={item.video} onPress={ () => {replaceExercise(this.props.route.params.item._key, item)} }/>
      );
    } else {
    return (
      <ExerciseItem item={item} imageLink={item.photo} videoLink={item.video} onPress={ () => {replaceExerciseWithAlternative(this.props.route.params.item._key, item)} }/>
    );
  }
  }
}