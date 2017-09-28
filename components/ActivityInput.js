import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import SetItem from './SetItem';
import Common from '../constants/common';
import Layout from '../constants/Layout';
import Database from '../api/database';

export default class ActivityInput extends Component {
    constructor(props){
      super(props);
      this.state = {
          touched: false,
          lastReps: '5',
          newLastReps: '',
          lastWeight: '25',
          newLastWeight: '',
          allReps: [],
          allWeight: []
      }
    }

    onSendData() {
        if (this.state.touched) {
            this.props.onSendData(this.state.allReps.length, this.state.allReps, this.state.allWeight)
        }
        else {
            let oneRep = [];
            let oneWeight = [];
            oneRep[0] = this.state.lastReps;
            oneWeight[0] = this.state.lastWeight;
            this.props.onSendData(1, oneRep, oneWeight);
        }
    }
    onAddSet() {
        let newAllReps   = this.state.allReps.concat(this.state.lastReps);
        let newAllWeight = this.state.allWeight.concat(this.state.lastWeight);
        console.log(newAllReps + ' ' + newAllWeight);
        this.setState({touched: true, allReps: newAllReps, allWeight: newAllWeight})
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
      <View>
        <View style={[Common.sectionBorder, Common.inputBar]}>
            {/* <TouchableOpacity onPress={() => {console.log(this.state)}}><Text>Check</Text></TouchableOpacity> */}
            <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                <View>
                    <Text style={Common.darkTagTitle}>Reps used</Text>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>

                        <View style={Common.input}>
                        <TextInput
                            style={Common.inputText}
                            keyboardType={'numeric'}
                            maxLength={3}
                            onChangeText={(reps) => this.setState({lastReps: reps})}
                            value={this.state.lastReps}
                        />
                        </View>
                        
                        {/* Minus */}
                        <TouchableOpacity
                            style={[Common.inputStepper, {borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderRightWidth: 0.5}]}
                            onPress={() => {
                                let newLastReps = parseInt(this.state.lastReps) - 1;
                                this.setState({lastReps: newLastReps.toString()})}
                                }>
                        <Text style={Common.inputStepperText}>–</Text>
                        </TouchableOpacity>

                         {/* Plus */}
                        <TouchableOpacity
                            style={[Common.inputStepper, {borderTopRightRadius: 5, borderBottomRightRadius: 5, borderLeftWidth: 0.5}]}
                            onPress={() => {
                                let newLastReps = parseInt(this.state.lastReps) + 1;
                                this.setState({lastReps: newLastReps.toString()})}
                            }>
                        <Text style={Common.inputStepperText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                  
                <View>
                <Text style={Common.darkTagTitle}>Weight used</Text>
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                     <View style={Common.input}>
                    <TextInput
                        style={Common.inputText}
                        maxLength={3}
                        keyboardType={'numeric'}
                        onChangeText={(weight) => this.setState({lastWeight: weight})}
                        value={this.state.lastWeight}
                    />
                    </View>
                    {/* Minus*/}
                    <TouchableOpacity
                       style={[Common.inputStepper, {borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderRightWidth: 0.5}]}
                        onPress={() => {
                        let newLastWeight = parseInt(this.state.lastWeight) - 1;
                        this.setState({lastWeight: newLastWeight.toString()})}
                        }>
                    <Text style={Common.inputStepperText}>–</Text>
                    </TouchableOpacity>

                    {/* Plus */}
                    <TouchableOpacity
                         
                         style={[Common.inputStepper, {borderTopRightRadius: 5, borderBottomRightRadius: 5, borderLeftWidth: 0.5}]}
                        onPress={() => {
                        let newLastWeight = parseInt(this.state.lastWeight) + 1;
                        this.setState({lastWeight: newLastWeight.toString()})}
                        }>
                    <Text style={Common.inputStepperText}>+</Text>
                    </TouchableOpacity>
                </View>
                </View>
                <TouchableOpacity onPress={() => {this.onAddSet()}}>
                    <Text style={Common.inputSubmit}>ADD</Text>
                </TouchableOpacity>
            </View>
        </View>
       
        {sets}
        <View style={{flex: 1, minHeight: 200}}></View>
        <TouchableOpacity style={[Common.brightButtonRounded, {position: 'absolute', bottom: 0}]} onPress={() => {this.onSendData()}}><Text style={Common.lightActionTitle}>Save sets</Text></TouchableOpacity>
      </View>
    );
    
  }
  
}