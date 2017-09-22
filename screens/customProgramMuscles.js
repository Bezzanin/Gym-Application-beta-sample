import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet, ListView, TouchableOpacity, FlatList } from "react-native";
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
import MusclesForDay from '../components/MusclesForDay';
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

class customProgramMuscles extends Component {

constructor(props) {
    super(props);
    this.state = {
        value: 1,
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
        title: I18n.t('muscles'),
        },
    };
    componentWillMount() {
        this.setState({
        
            musclesSource: this.state.dataSource.cloneWithRows([''])
        })
    }
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
    renderList = () => {
        if (this.state.previewText.length === 0) {
           return (
               <View style={{height: 140, justifyContent: 'center', alignItems: 'center'}}>
                   <Text style={[Common.darkTitleH1, Common.centeredText]}>What do you want to train?</Text>
                <Text style={[Common.darkBodyText, Common.centeredText]}>Use the slider below to check muscles you would like to focus on each day. The order is important</Text>
               </View>
           )
        }
        else {
            return (
                <View>
                    <Text style={[Common.darkTitleH1, Common.centeredText, styles.title]}>What do you want to train?</Text>
                    <ListView
                        
                        style={[Common.paddingLeft, Common.sectionBorder, {minHeight: 100}]}
                        dataSource={this.state.musclesSource}
                        enableEmptySections
                        renderRow={(rowData, sectionID, rowID) => <View><Text style={Common.darkBodyText2}>Day {rowID}: <Text style={Common.darkBodyText}>{rowData.split(',').join(', ')}</Text></Text></View>}
                    />
                </View>
            )
        }
    }
  render() {
    const { value } = this.props.route.params;  
    let daysAmount = [];
    for(var i=0; (i<value && i<7); i++){
           let currSet = 'set' + i;
           let counter = i+1;
    daysAmount.push(
          (<MusclesForDay
          dayNumber = {counter}
          recieveMuscles={this.recieveMuscles}
          />)
          );}
    return (
    <ScrollView style={{flex: 1}}>
            

            
              
       
                
        {this.renderList()}
        <View style={{flex: 1}}>
        <Swiper
        loop={false} 
        showsButtons 
        nextButton={<Text style={{fontSize: 48,color: "#CE0707"}}>›</Text>} 
        prevButton={<Text style={{fontSize: 48, color: "#CE0707"}}>‹</Text>} 
         height={300}>
        
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
 slide: {
    flex: 1,
    backgroundColor: '#FFF',
    zIndex: 10
  },
  row: {
    flexDirection: "row",
    width: 300,
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingLeft: 16,
    paddingBottom: 16
  },
  title: {
      alignSelf: 'center'
  }
})

export default customProgramMuscles;