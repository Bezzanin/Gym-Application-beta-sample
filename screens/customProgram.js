import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
import Layout from '../constants/Layout';
import Database from '../api/database';
import { Slider } from 'react-native-elements';
import Common from '../constants/common';
import _ from "lodash"
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

class customProgram extends Component {
constructor(props) {
    super(props);
    this.state = {
        value: 3,
        difficulty: 1,
        duration: 30,
        gender: 'Both',
        name: "Oma"
    }
    this.sendParams=this.sendParams.bind(this)
}
static route = {
    navigationBar: {
      visible: true,
      title: I18n.t('YourProgram'),
    },
};

  sendParams() {
    this.props.navigator.push('customProgramMuscles', 
    { value: this.state.value, 
      name: this.state.name,
      difficulty: this.state.difficulty,
      duration: this.state.duration
    })
    
  }

  render() {    
    return (
      <View style={Common.containerBasic}>
        <View style={[Common.centered, Common.paddingVertical, {paddingTop: 16}]}>
          <Text style={[Common.darkTitleH1, Common.centeredText]}>Make your own program</Text>
          <Text style={[Common.centeredText, Common.darkBodyText]}>Fill in basic information about your program. Later on you can arrange muscles in correct order of days </Text>
        </View>
        <View style={[Common.container, {backgroundColor: 'white'}]}>
      
            <View style={{marginBottom: 24}}>
                <View style={{borderColor: '#CDCDCD', borderBottomWidth: 1}}>
                    <Text style={Common.darkTitleH3}>{I18n.t('Name')}</Text>
                    <TextInput
                       style={{height: 30}}
                       placeholder={I18n.t('EnterName')}
                       autoCorrect={false}
                       onChangeText={text => this.setState({ name: text })}
                    />
                </View>
            </View>
            
            <Text style={Common.darkTitleH3}>Days per Week {this.state.value}</Text>
            
            <Slider
                style={{marginLeft: 16, width: 320}}
                minimumValue={1}
                maximumValue={7}
                step={1}
                thumbTintColor={"#CE0707"}
                trackStyle={styles.track}
                thumbStyle={{ top: 20 }}
                value={this.state.value}
                onValueChange={(value) => this.setState({value})} />
               
            </View>

            <View style={[Common.attachToBottom]}>
                <TouchableOpacity 
                onPress={()=>this.sendParams()}
                style={[
                    Common.brightButtonRounded,
                    Common.shadowBright,
                    Common.marginVerticalSmall
                ]}>
                <Text style={Common.lightActionTitle}>Next</Text></TouchableOpacity>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  track: {
    height: 2,
    borderRadius: 1,
  },
})

export default customProgram;
