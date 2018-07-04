import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {Slider, CheckBox, Grid, Col} from 'react-native-elements';
import Database from '../api/database';
import Common from '../constants/common';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

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
            calves: false,
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
    <View style={Common.container}>
    <Text style={Common.darkTitleH3}>{I18n.t('Day')} {this.props.dayNumber} {I18n.t('muscles')}</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
    <Grid>
    <Col>
      <CheckBox
        left
        containerStyle={{width: 135, paddingVertical: 5, margin: 5, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title={I18n.t('chest')}
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
        containerStyle={[!this.state.checked ? {marginRight: -2} : {marginRight: 0}, {width: 135, paddingVertical: 5, margin: 5, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}]}
        title={I18n.t('shoulders')}
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
        containerStyle={{width: 135, paddingVertical: 5, margin: 5, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title={I18n.t('back')}
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
        containerStyle={{width: 135, paddingVertical: 5, margin: 5, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title={I18n.t('biceps')}
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
        containerStyle={{width: 135, paddingVertical: 5, margin: 5, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title={I18n.t('calves')}
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.calves}
        onPress={() => {
          this.setState({calves: !this.state.calves}, ()=>{
            this.allMusclesForDay("calves", this.state.calves)
          });
        }}
      />
    </Col>
    <Col>
      <CheckBox
        left
        containerStyle={{width: 135, paddingVertical: 5, margin: 5, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title={I18n.t('legs')}
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
        containerStyle={{width: 135, paddingVertical: 5, margin: 5, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title={I18n.t('triceps')}
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
        containerStyle={{width: 135, paddingVertical: 5, margin: 5, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title={I18n.t('abs')}
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
        containerStyle={{width: 135, paddingVertical: 5, margin: 5, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title={I18n.t('glutes')}
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

    </Col>
    </Grid>
        
  </View>
  </View>
    );
  }
}

export default MusclesForDay;