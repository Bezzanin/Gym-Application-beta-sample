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
    <Text style={Common.darkTitleH2}>Day {this.props.dayNumber} muscles</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
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
          this.setState({chest: !this.state.chest}, ()=>{
            this.allMusclesForDay("chest", this.state.chest)
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
          this.setState({shoulders: !this.state.shoulders}, ()=>{
            this.allMusclesForDay("shoulders", this.state.shoulders)
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
          this.setState({back: !this.state.back}, ()=>{
            this.allMusclesForDay("back", this.state.back)
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
          this.setState({biceps: !this.state.biceps}, ()=>{
            this.allMusclesForDay("biceps", this.state.biceps)
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
          this.setState({legs: !this.state.legs}, ()=>{
            this.allMusclesForDay("legs", this.state.legs)
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
          this.setState({triceps: !this.state.triceps}, ()=>{
            this.allMusclesForDay("triceps", this.state.triceps)
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
          this.setState({abs: !this.state.abs}, ()=>{
            this.allMusclesForDay("abs", this.state.abs)
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
          this.setState({glutes: !this.state.glutes}, ()=>{
            this.allMusclesForDay("glutes", this.state.glutes)
          });
        }}
      />

        
  </View>
  </View>
    );
  }
}

export default MusclesForDay;