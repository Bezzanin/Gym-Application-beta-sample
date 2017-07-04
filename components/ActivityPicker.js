import React from 'react';
import {View,
        Text,
        Picker,
        TouchableOpacity,
        FlatList,
    ScrollView } from 'react-native';
import LoadPicker from './LoadPicker';
import Layout from '../constants/Layout'
import SetItem from './SetItem';
import Common from '../constants/common';
import Database from '../api/database';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

let allReps = [];
export default class ActivityPicker extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          data: '',
          reps: [5],
          weight: [25],
          sets: 0,
          newRep: '5',
          newWeight: '25',
          id: "Custom"
      }
  }
  

  componentDidMount() {
      this.props.onSendInitialState(this.state.sets, this.state.newRep, this.state.newWeight)
  }
    sendData(newRep, index) {
        this.setState({newRep}, () => {
            this.props.onSendInitialState(this.state.sets, this.state.newRep, this.state.newWeight);
        })
        
        this.setState({
            newRep, index
        })
        
    }
    
    sendFBData(id, sets, reps, weight) {
        console.log(id, sets, reps, weight)
        Database.addExerciseStats(id, sets, reps, weight);
    }
    sendWorkoutData() {
        Database.addExerciseStats(this.state.text, this.state.weight, this.state.sets, this.state.reps);
    }
    sendWeight(newWeight, index) {
        this.setState({newWeight}, () => {
            this.props.onSendInitialState(this.state.sets, this.state.newReps, this.state.newWeight);
        })
        
        this.setState({
            newWeight, index
        })
    }

    handleDelete = (index) => {
        let newReps = this.state.reps;
        newReps.splice(index, 1)
        let newWeight = this.state.weight;
        newWeight.splice(index, 1)
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
        let newSets = this.state.sets + 1;
        let newReps = this.state.reps.concat(this.state.newRep);
        let newWeight = this.state.weight.concat(this.state.newWeight);

     
        let oldReps = this.state.reps;

        this.setState({sets: newSets})
        this.setState({reps: newReps, weight: newWeight})
    }
    
    return (
        <View style={Common.containerBasic}>
            <View style={[Common.shadowLight]}>
                <View
                style={[Common.paddingLeft, Common.paddingRight,{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                }]}
                >
                    <Text style={[Common.darkTitleH2, {marginTop: Layout.gutter.s}]}>Lisaa set</Text>
                    <TouchableOpacity onPress={() => {
                      console.log(this.state.reps)}}><Text>Check reps</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={[Common.darkButton, Common.shadowLight]}
                        onPress={() => {
                        addSet(this.state.sets, this.state.reps, this.state.weight);
                        }}
                    >
                        <Text style={Common.lightActionTitle}>Add set</Text>
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
                    this.props.onSendData(this.state.sets, this.state.reps, this.state.weight)
                }}
                >
                <Text style={Common.lightActionTitle}>{this.props.insideWorkout ? `${I18n.t('Next')} ${I18n.t('Exercise').toLowerCase()}` : 'Show sets'}</Text>
                </TouchableOpacity>
                <View style={{ height: 70 }} />
            </View>
            </ScrollView>
        </View>
    );
  }
  
}
