import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet, ListView, TouchableOpacity } from "react-native";
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
import MusclesForDay from '../components/musclesForDay';
import Layout from '../constants/Layout';
import Database from '../api/database';
import { Slider, FormInput, FormLabel } from 'react-native-elements';
import Common from '../constants/common';
import ModalDropdown from 'react-native-modal-dropdown';
import Swiper from 'react-native-swiper';
import _ from "lodash"
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

class customProgram extends Component {
constructor(props) {
    super(props);
    this.state = {
        value: 3,
        previewText: [],
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        musclesSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        difficulty: 1,
        duration: 30,
        gender: 'Both',
        name: "Oma"
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
    Database.addUserMadeProgram(this.state.name, this.state.value, this.state.previewText, this.state.difficulty, this.state.gender, this.state.duration)
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
            <View style={styles.row}>
                  <View>
                    <ModalDropdown options={['1kk', '2kk', '3kk']}
                    defaultValue={"Duration"}
                    style={styles.dropdown}
                    textStyle={styles.dropdownText}
                    dropdownStyle={styles.dropdown_2_dropdown}
                    dropdownTextStyle={{fontSize: 15}}
                    onSelect={(index, value) => this.setState({duration: (parseInt(index)+1)*30})}
                    />
                  </View>
                  <View>
                    <ModalDropdown options={['male', 'female', 'both']}
                    defaultValue={"Gender"}
                    style={styles.dropdown}
                    textStyle={styles.dropdownText}
                    dropdownStyle={styles.dropdown_2_dropdown}
                    dropdownTextStyle={{fontSize: 15}}
                    onSelect={(index, value) => this.setState({gender: value})}
                    />
                  </View>
                  <View>
                    <ModalDropdown options={['Basic', 'Normal', 'Expert']}
                    defaultValue={"Level"}
                    style={styles.dropdown}
                    textStyle={styles.dropdownText}
                    dropdownStyle={styles.dropdown_2_dropdown}
                    dropdownTextStyle={{fontSize: 15}}
                    onSelect={(index, value) => this.setState({difficulty: parseInt(index)+1})}
                    />
                  </View>
                </View>
                
            {/* <View style={styles.row}>
                <View><Text>{this.state.duration}</Text></View>
                <View><Text>{this.state.gender}</Text></View>
                <View><Text>{this.state.difficulty}</Text></View>
            </View> */}
            <Text style={Common.darkTitleH2}>Preview</Text>
           <View style={styles.row}> 
           <ListView
                dataSource={this.state.musclesSource}
                renderRow={(rowData, sectionID, rowID) => <View><Text>Day {rowID} </Text><Text style={{flexDirection: 'column'}}>{rowData}</Text></View>}
            /> 
            </View>
        <Swiper style={styles.wrapper} height={300}>
         {daysAmount}
        </Swiper>
            
        </View>
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
    track: {
    height: 2,
    borderRadius: 1,
  },
  row: {
    flexDirection: "row",
    width: 300,
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingLeft: 16,
    paddingBottom: 16
  },
dropdown: {
    alignSelf: 'flex-end',
    width: 75,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#CE0707",
    backgroundColor: 'transparent',
  },
dropdownText: {
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 4
},
  dropdown_2_dropdown: {
    borderColor: '#CE0707',
    width: 70,
    height: 115,
    borderWidth: 2,
    borderRadius: 3,
  },

})

export default customProgram;
