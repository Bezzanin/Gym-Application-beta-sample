import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import SetItem from './SetItem';
import Common from '../constants/common';
import Layout from '../constants/Layout';

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
        if (this.props.index > -1) {
            this.props.onSendDataFromSuperset();
        }
        else {
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
    }
    onAddSet() {
        let newAllReps   = this.state.allReps.concat(this.state.lastReps);
        let newAllWeight = this.state.allWeight.concat(this.state.lastWeight);
        this.setState({touched: true, allReps: newAllReps, allWeight: newAllWeight}, () => {
            if (this.props.index > -1) {
                this.props.updateParentNSets(this.props.index, this.state.allReps, this.state.allWeight)
            }
        })
    }

    handleDelete = (index) => {
        let newReps = this.state.allReps;
        newReps.splice(index, 1)
        let newWeight = this.state.allWeight;
        newWeight.splice(index, 1)
        this.setState({allReps: newReps, allWeight: newWeight})
    }
    displaySendSets() {
        if (this.props.shouldHideButton) {
            return (<View/>)
        }
        else {
            return (
            <View>
                <View style={{flex: 1, minHeight: 100}}></View>
                <TouchableOpacity style={[Common.brightButtonRounded, {position: 'absolute', bottom: 0}]} onPress={() => {this.onSendData()}}><Text style={Common.lightActionTitle}>{I18n.t('Save')} {I18n.t('Sets')}</Text></TouchableOpacity>
            </View>
            ) 
        }
    }
    render() {
        let sets = [];
        for (let i = 0; (i<this.state.allReps.length); i++) {
            let counter = i;
            sets.push(
                <View>
               
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
            <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                <View>
                    <Text style={Common.darkTagTitle}>{I18n.t('Reps')}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>

                        <View style={Common.input}>
                        <TextInput
                            selectTextOnFocus
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
                <Text style={Common.darkTagTitle}>{I18n.t('Weight')}</Text>
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                     <View style={Common.input}>
                    <TextInput
                        selectTextOnFocus
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
                    <Text style={Common.inputSubmit}>{I18n.t('Add')}</Text>
                </TouchableOpacity>
            </View>
        </View>
       
        {sets}
        {this.displaySendSets()}
      </View>
    );
    
  }
  
}