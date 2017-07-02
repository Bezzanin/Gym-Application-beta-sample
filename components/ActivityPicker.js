import React from 'react';
import {View,
        Text,
        Picker,
        TouchableOpacity,
        FlatList,
    ScrollView } from 'react-native';
import LoadPicker from './LoadPicker';
import SetItem from './SetItem';
import Common from '../constants/common';
import Database from '../api/database';

let allReps = [];
export default class ActivityPicker extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          data: '',
          reps: [],
          weight: [],
          sets: 0,
          newRep: '',
          newWeight: '',
          id: "Custom"
      }
  }
  
    sendData(newRep, index) {
        //let newReps = this.state.reps.concat(reps);

        this.setState({
            newRep, index
        })
        
    }
    sendWorkoutData() {
        Database.addExerciseStats(this.state.text, this.state.weight, this.state.sets, this.state.reps);
    }
    sendWeight(newWeight, index) {
        //let newWeight = this.state.reps.concat(weight);
 
        this.setState({
            newWeight, index
        })
    }

    handleDelete = (index) => {
        console.log(index);
        let newReps = this.state.reps;
        newReps.splice(index, 1)
        let newWeight = this.state.weight;
        newWeight.splice(index, 1)
        console.log(newReps)
        console.log(newWeight)
        newSets = this.state.sets - 1;
        this.setState({sets: newSets, reps: newReps, weight: newWeight})
    }   
renderItem = ({item, index}) => {
    return (
        <SetItem
            id={item.id}
            key={index}
            number={index + 1}
            reps={item.reps}
            weight={item.weight}
            onDelete={(index) => {this.handleDelete(index)}}
        />
    )
  }
  
  render() {
    let allWeights = [] 
    let rep;
    let sets = [];
    for (let i = 0; (i<=this.state.sets - 1); i++) {
        let counter = i;
        console.log('Sets amount is ' + this.state.sets.length)
        console.log(counter)
        console.log('Reps amount ' + this.state.reps[counter]);
        console.log('Weight amount ' + this.state.weight[counter]);
        sets.push(
            <View>
            {/*<Text>{this.state.reps[counter]}</Text>
            <Text>{this.state.weight[counter]}</Text>*/}
            <SetItem
                key={counter}
                number={counter + 1}
                index={counter}
                reps={this.state.reps[counter]}
                weight={this.state.weight[counter]}
                onDelete={(index) => {this.handleDelete(index)}}
            />
            </View>
        )
    }

    addSet = (number, reps, weight) => {
        const newSets = this.state.sets + 1;
        let newReps = this.state.reps.concat(this.state.newRep);
        let newWeight = this.state.weight.concat(this.state.newWeight);

     
        let oldReps = this.state.reps;

        this.setState({sets: newSets})
        this.setState({reps: newReps, weight: newWeight})
    }
    
    return (
        <View style={Common.containerBasic}>
            <View style={{ height: 60, zIndex: 4 }} />
            <View style={[Common.shadowLight]}>
                <View
                style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    paddingHorizontal: 10
                }}
                >
                    <Text style={Common.darkTitleH2}>Lisaa first set</Text>
                    <TouchableOpacity
                        style={Common.darkButton}
                        onPress={() => {
                        addSet(this.state.sets + 1, this.state.reps, this.state.weight);
                        }}
                    >
                        <Text style={Common.darkActionTitle}>Add set</Text>
                    </TouchableOpacity>
                </View>
                <LoadPicker
                sendData={this.sendData.bind(this)}
                sendWeight={this.sendWeight.bind(this)}
                />
            </View>
            <ScrollView>
            <View>
                {sets}
            </View>
            {/*<FlatList
                        data={this.state.sets}
                        renderItem={this.renderItem.bind(this)}/>*/}
            <View style={Common.container}>
                <TouchableOpacity
                style={Common.brightButtonRounded}
                onPress={() => {
                    {/*console.log(this.state.sets);
                    console.log(this.state.reps);
                    console.log(this.state.weight);
                    console.log("Start");
                    
                    console.log("Done");*/}
                    this.props.onSendData(this.state.sets, this.state.reps, this.state.weight)
                }}
                >
                <Text style={Common.lightActionTitle}>Show sets</Text>
                </TouchableOpacity>
                <View style={{ height: 100 }} />
            </View>
            </ScrollView>
        </View>
    );
  }
  
}
