import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import SetItem from './SetItem';
import Common from '../constants/common';
import Database from '../api/database';

export default class ActivityInput extends Component {
    constructor(props){
      super(props);
      this.state = {
          lastReps: '5',
          newLastReps: '',
          lastWeight: '25',
          newLastWeight: '',
          allReps: [],
          allWeight: []
      }
    }


    onSendData() {
        Database.addExerciseStats('Check me', this.state.allReps.length, this.state.allReps, this.state.allWeight, true)
    }
    onAddSet() {
        let newAllReps   = this.state.allReps.concat(this.state.lastReps);
        let newAllWeight = this.state.allWeight.concat(this.state.lastWeight);
        console.log(newAllReps + ' ' + newAllWeight);
        this.setState({allReps: newAllReps, allWeight: newAllWeight})
    }

    handleDelete = (index) => {
        let newReps = this.state.allReps;
        newReps.splice(index, 1)
        let newWeight = this.state.allWeight;
        newWeight.splice(index, 1)
        this.setState({allReps: newReps, allWeight: newWeight})
    }

    render() {
        let sets = [];
        for (let i = 0; (i<this.state.allReps.length); i++) {
            let counter = i;
            sets.push(
                <View>
                {/*<Text>{this.state.reps[counter]}</Text>
                <Text>{this.state.weight[counter]}</Text>*/}
                <SetItem
                    key={counter}
                    number={counter + 1}
                    index={counter}
                    reps={this.state.allReps[counter]}
                    weight={this.state.allWeight[counter]}
                    onDelete={(index) => {this.handleDelete(index)}}
                />
                </View>
            )
        }
    return (
      <View style={[Common.marginBottom]}>
        <View style={[Common.sectionBorder]}>
            <TouchableOpacity onPress={() => {console.log(this.state)}}><Text>Check</Text></TouchableOpacity>
            {/* <View style={{flexDirection: 'row'}}> */}
            <Text>How many reps did you use?</Text>
            
                <TextInput
                    style={Common.input}
                    onChangeText={(reps) => this.setState({lastReps: reps})}
                    value={this.state.lastReps}
                />
                <TouchableOpacity onPress={() => {
                    let newLastReps = parseInt(this.state.lastReps) + 1;
                    this.setState({lastReps: newLastReps.toString()})}
                    }>
                <Text>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    let newLastReps = parseInt(this.state.lastReps) - 1;
                    this.setState({lastReps: newLastReps.toString()})}
                    }>
                <Text>-</Text>
                </TouchableOpacity>
            
            <Text>What weight did you use?</Text>
            <TextInput
                style={Common.input}
                onChangeText={(weight) => this.setState({lastWeight: weight})}
                value={this.state.lastWeight}
            />
            <TouchableOpacity onPress={() => {
                let newLastWeight = parseInt(this.state.lastWeight) + 1;
                this.setState({lastWeight: newLastWeight.toString()})}
                }>
            <Text>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                let newLastWeight = parseInt(this.state.lastWeight) - 1;
                this.setState({lastWeight: newLastWeight.toString()})}
                }>
            <Text>-</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.onAddSet()}}><Text>Add set</Text></TouchableOpacity>
            {sets}
            <TouchableOpacity onPress={() => {this.props.onSendData(this.state.allReps.length, this.state.allReps, this.state.allWeight)}}><Text>Input to the database</Text></TouchableOpacity>
        </View>
      </View>
    );
    
  }
  
}