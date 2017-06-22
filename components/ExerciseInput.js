import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import Layout from '../constants/Layout';
class ExerciseInput extends Component {
    constructor(props){
    super(props);
    this.state = {
      sets: 3,
      reps: 10,
    }
  }
  render() {
      let Allreps = [];
      let inputs = [];

        for(var i=0; i<this.state.sets; i++){
            let currSet = 'set' + i;
        inputs.push(
            (
    <View style={styles.InputContainer}>
        <View style={{width: 100}}>
            <Text>{currSet}</Text>
        </View>
        <View style={{width: 100}}>
            <FormInput
            onChangeText={reps => Allreps.push([reps])}
            placeholder={""}
            />
        </View>
        <View style={{width: 100}}>
            <FormInput
            onChangeText={text => this.setState({ text })}
            placeholder={"kg"}
        />
        </View>
    </View>
            )
        );  
    }
    return (
<View>
    <View style={styles.InputContainer}>
        <View style={{width: 100}}>
        <FormLabel>Sets</FormLabel>
            <FormInput
             onChangeText={sets => this.setState({ sets })}
             placeholder={""}
            />
        </View>
    </View>
    {inputs}
</View>
    );
  }
}

const styles = StyleSheet.create({
  InputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
});

export default ExerciseInput;