import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet, ListView, TouchableOpacity } from "react-native";
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
import MusclesForDay from '../components/musclesForDay';
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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        value: 3,
        previewText: [],
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        musclesSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    }
    this.recieveMuscles=this.recieveMuscles.bind(this)
    this.sendData=this.sendData.bind(this)
}
static route = {
    navigationBar: {
      visible: true,
      title: I18n.t('YourProgram'),
    },
};

recieveMuscles(dayNo, muscles) {
    previewText = this.state.previewText
    previewText[dayNo] = muscles.toString()
    this.setState({
        previewText,
        musclesSource: this.state.dataSource.cloneWithRows(previewText)
    })
    
}
sendData() {
    console.log(this.state.previewText)
    console.log(this.state.value)
    console.log(this.state.name)
    Database.addUserMadeProgram(this.state.name, this.state.value, this.state.previewText)
}

  render() {
        let daysAmount = [];
        for(var i=0; (i<this.state.value && i<7); i++){
            let currSet = 'set' + i;
            let counter = i+1;
        daysAmount.push(
            (<MusclesForDay
            dayNumber = {counter}
            recieveMuscles={this.recieveMuscles}
             />)
        );  
    }

    
    return (
      <ScrollView>
        <View style={{flex: 1, alignItems: 'stretch', alignSelf: "center", justifyContent: 'center', width: 300, marginTop: 50}}>
            <FormLabel>Program Name</FormLabel>
                  <FormInput
                    onChangeText={text => this.setState({ name: text })}
                    placeholder={I18n.t('Name')}
                    autoCorrect={false}
                  />
            <Text style={Common.darkTitleH1}>Days per Week?</Text>
            <Slider
                minimumValue={1}
                maximumValue={7}
                step={1}
                thumbTintColor={"#CE0707"}
                value={this.state.value}
                onValueChange={(value) => this.setState({value})} />
            <Text>Value: {this.state.value}</Text>
            <Text>Preview</Text>
            <TouchableOpacity onPress={() => {console.log(this.state.previewText)}}><Text>Show state</Text></TouchableOpacity>
            <ListView
                dataSource={this.state.musclesSource}
                renderRow={(rowData, sectionID, rowID) => <View><Text>Day {rowID} </Text><Text>{rowData}</Text></View>}
            />
        </View>
        {daysAmount}
        <TouchableOpacity
            onPress={() => {this.sendData()}}
            style={[
                Common.brightButtonRounded,
                Common.shadowBright,
                Common.marginVerticalSmall
        ]}>
            <Text style={Common.lightActionTitle} >Done</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
 slide: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  Radio: {
    marginTop: 50,
    alignSelf: 'center',
  },
})

export default customProgram;
