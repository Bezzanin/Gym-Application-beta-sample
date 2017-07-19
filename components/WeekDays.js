import React, { Component } from 'react';
import {
  Modal,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import { Constants } from 'expo';
import Common from '../constants/common';
import Database from '../api/database';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
import {Slider, CheckBox} from 'react-native-elements';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

export default class WeekDays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      days: []
    };
    this.onSendData = this.onSendData.bind(this);
    this.allWeekDays = this.allWeekDays.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  onSendData(days) {
    Database.setWorkoutDays(days);
  }

  allWeekDays(weekday, condition) {
    allDays = this.state.days
    if (condition === true) {
    allDays.push(weekday)
    } else {
    var index = allDays.indexOf(weekday)
    if (index > -1) {
      allDays.splice(index, 1);
    }
  }
    this.setState({
      days: allDays
    })
  }

  render() {
        
    return (
      <View>

        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}
          style={[Common.leftAttachedButton, {marginTop: 20, width: 300}]}>
          <Text style={[Common.darkActionTitle]}>Schedule workout days</Text>
          </TouchableOpacity>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
        >

          <ScrollView contentContainerStyle={styles.container}>
            <View style={Common.pseudoNavigation}>
              <TouchableOpacity
                onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                <Text style={Common.brightActionTitle}>{I18n.t('Cancel')}</Text>
              </TouchableOpacity>
          </View>
            <View style={[styles.paragraph]}>
                  <View style={[Common.paddingVertical, Common.paddingLeft, Common.paddingRight, { backgroundColor: 'white', zIndex: 5}]}>
                   <View style={Common.centered}>
                    <Text style={[Common.darkTitleH2, Common.centeredText]}>Select workout days</Text>
                    <Text style={[Common.darkBodyText, Common.centeredText]}>Choose at what days you want to have workouts</Text>
                    </View>
                    </View>

                    
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Monday'
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.Monday}
        onPress={() => {
          this.setState({Monday: !this.state.Monday}, ()=>{
            this.allWeekDays("Mo", this.state.Monday)
          });
        }}
      />
        <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Tuesday'
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.Tuesday}
        onPress={() => {
          this.setState({Tuesday: !this.state.Tuesday}, ()=>{
            this.allWeekDays("Tu", this.state.Tuesday)
          });
        }}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-end', borderColor: 'transparent'}}
        title='Wednesday'
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.Wednesday}
        onPress={() => {
          this.setState({Wednesday: !this.state.Wednesday}, ()=>{
            this.allWeekDays("We", this.state.Wednesday)
          });
        }}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Thursday'
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.Thursday}
        onPress={() => {
          this.setState({Thursday: !this.state.Thursday}, ()=>{
            this.allWeekDays("Th", this.state.Thursday)
          });
        }}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Friday '
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.Friday}
        onPress={() => {
          this.setState({Friday: !this.state.Friday}, ()=>{
            this.allWeekDays("Fr", this.state.Friday)
          });
        }}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Saturday'
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.Saturday}
        onPress={() => {
          this.setState({Saturday: !this.state.Saturday}, ()=>{
            this.allWeekDays("Sa", this.state.Saturday)
          });
        }}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Sunday'
        iconLeft
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor='#B2B2B2'
        checked={this.state.Sunday}
        onPress={() => {
          this.setState({Sunday: !this.state.Sunday}, ()=>{
            this.allWeekDays("Su", this.state.Sunday)
          });
        }}
      />
      </View>
      <TouchableOpacity
      style={Common.brightButtonRounded} 
      onPress={() => this.onSendData(this.state.days)}>
        <Text style={Common.lightActionTitle}>Save days</Text>
      </TouchableOpacity>
            </View>

            
          </ScrollView>

        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  paragraph: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 30,
  },
  hideButton: {
    position: 'absolute',
    bottom: 20,
    width: 200,
    borderRadius: 100,
    borderColor: '#000',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  inlineContainer: {
    marginVertical: 100,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    doneButton: {
      marginTop: 200,
    },
    ActionButton: {
        width: 200,
      borderRadius: 100,
      borderColor: '#FFFFFF',
      borderWidth: 1,
      alignSelf: 'center',
      marginTop: 30,
      backgroundColor: 'green'
    },
    InputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
});