import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {Slider, CheckBox} from 'react-native-elements';
import Database from '../api/database';
import Common from '../constants/common';

class MusclesForDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chest: false,
            back: false,
            shoulders: false,
            biceps: false,
            triceps: false,
            legs: false,
            abs: false,
            glutes: false,
            allMuscles: []
        };
  }

  allMusclesForDay(muscle, condition) {
    allMuscles = this.state.allMuscles
    if (condition === true) {
    allMuscles.push(muscle)
    } else {
    var index = allMuscles.indexOf(muscle)
    if (index > -1) {
      allMuscles.splice(index, 1);
    }
  }
    this.setState({
      allMuscles
    },()=>{
        this.props.recieveMuscles(this.props.dayNumber, this.state.allMuscles)
    })
  }

  render() {
    return (
    <View>
    <Text style={Common.darkTitleH1}>Day Number {this.props.dayNumber}</Text><Text>{this.state.allMuscles}</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Chest'
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.chest}
        onPress={() => {
          this.setState({Chest: !this.state.Chest}, ()=>{
            this.allMusclesForDay("chest", this.state.Chest)
          });
        }}
      />
        <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Shoulders'
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.shoulders}
        onPress={() => {
          this.setState({Shoulders: !this.state.Shoulders}, ()=>{
            this.allMusclesForDay("shoulders", this.state.Shoulders)
          });
        }}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-end', borderColor: 'transparent'}}
        title='Back '
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.back}
        onPress={() => {
          this.setState({Back: !this.state.Back}, ()=>{
            this.allMusclesForDay("back", this.state.Back)
          });
        }}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Biceps'
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.biceps}
        onPress={() => {
          this.setState({Biceps: !this.state.Biceps}, ()=>{
            this.allMusclesForDay("biceps", this.state.Biceps)
          });
        }}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Legs '
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.legs}
        onPress={() => {
          this.setState({Legs: !this.state.Legs}, ()=>{
            this.allMusclesForDay("legs", this.state.Legs)
          });
        }}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Triceps'
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.triceps}
        onPress={() => {
          this.setState({Triceps: !this.state.Triceps}, ()=>{
            this.allMusclesForDay("triceps", this.state.Triceps)
          });
        }}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Abs  '
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.abs}
        onPress={() => {
          this.setState({Abs: !this.state.Abs}, ()=>{
            this.allMusclesForDay("abs", this.state.Abs)
          });
        }}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Glutes'
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.glutes}
        onPress={() => {
          this.setState({Glutes: !this.state.Glutes}, ()=>{
            this.allMusclesForDay("glutes", this.state.Glutes)
          });
        }}
      />

        
  </View>
  </View>
    );
  }
}

export default MusclesForDay;