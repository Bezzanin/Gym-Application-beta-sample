import React from 'react';
import {View,
        Text,
        Picker,
        TouchableOpacity,
        FlatList } from 'react-native';
import LoadPicker from './LoadPicker';
import SetItem from './SetItem';
import Common from '../constants/common';
let allReps = [];
export default class ActivityPicker extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          data: '',
          reps: 0,
          weight: 0,
          sets: []
      }
  }
    sendData(reps, index) {
        this.setState({
            reps, index
        })
    }
    sendWeight(weight, index) {
        this.setState({
            weight, index
        })
    }

    handleDelete = (index) => {
        console.log(index);
        let newItems = this.state.sets;
        newItems.splice(index-1, 1)
        this.setState({sets: newItems})

        console.log(newItems)
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

    addSet = (number, reps, weight) => {
        const newSets = [
            ...this.state.sets,
            {
                number,
                reps,
                weight
            }
        ]
        this.setState({sets: newSets})
    }
    
    return (
      <View>
       
        <View>
        <View style={Common.shadowLight}>
        <View style={Common.container}/>
        <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10}}>
        <Text style = {Common.darkTitleH2}>Lisaa first set</Text>
         <TouchableOpacity style={Common.darkButton} onPress={() => {
            addSet(this.state.sets.length + 1, this.state.reps, this.state.weight);
        }}>
            <Text style={Common.darkActionTitle}>Add set</Text>
        </TouchableOpacity>
        </View>
        <LoadPicker
            sendData={this.sendData.bind(this)}
            sendWeight={this.sendWeight.bind(this)}/>

            <View style={Common.container}>
       
        </View>
        </View>
        <FlatList
            data={this.state.sets}
            renderItem={this.renderItem.bind(this)}/>
        <View style={Common.container}>
        <TouchableOpacity style={Common.brightButtonRounded} onPress={() => {
           console.log(this.state.sets)
        }}>
            <Text style={Common.lightActionTitle}>Show sets</Text>
        </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  }
  
}
