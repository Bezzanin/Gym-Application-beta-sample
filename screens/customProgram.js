import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
import Layout from '../constants/Layout';
import Database from '../api/database';
import { Slider, FormInput, FormLabel } from 'react-native-elements';
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
      <ScrollView>
        <View style={{flex: 1, alignSelf: "center", justifyContent: 'center', width: 350, marginTop: 20}}>
            <View style={{paddingBottom: 16}}>
            <Text style={Common.darkTitleH2}>Program name</Text>
                  <FormInput
                    onChangeText={text => this.setState({ name: text })}
                    placeholder={I18n.t('Name')}
                    autoCorrect={false}
                    
                  />
            </View>
            <Text style={Common.darkTitleH2}>Days per Week {this.state.value}</Text>
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
            <TouchableOpacity 
            onPress={()=>this.sendParams()}
            style={[
                Common.brightButtonRounded,
                Common.shadowBright,
                Common.marginVerticalSmall
            ]}>
              <Text>NEXT</Text></TouchableOpacity>
            </View>
        
      </ScrollView>
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
