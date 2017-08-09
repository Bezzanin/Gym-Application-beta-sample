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
import ActivityPicker from './ActivityPicker';
import Common from '../constants/common';
import Database from '../api/database';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

export default class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: "Oma liike",
      newRep: 5,
      newWeight: 25,
      sets: 1,
      reps: 5,
      weight: 25,
    };
    this.onSendData = this.onSendData.bind(this);
  }

  setModalVisible(visible) {
    console.log('Closing')
    this.setState({ modalVisible: visible });
  }
  onSendData(sets, reps, weight, reparray, weightarray) {
    
    console.log('Show the array');
    console.log(reparray);
    console.log('Show the array');
    console.log(weightarray);
    Database.addExerciseStats(this.state.name, sets, reparray, weightarray);
    this.setModalVisible(!this.state.modalVisible)
  }


  render() {
        
    return (
      <View>

        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}
          style={Common.navButton}>
          <Text style={Common.brightActionTitle}>{I18n.t('Add')} {I18n.t('Exercise')}</Text>
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
                   <View style={{borderColor: '#CDCDCD', borderBottomWidth: 1}}>
                    <Text style={Common.darkTitleH2}>{I18n.t('Name')}</Text>
                   <TextInput
                      style={{height: 40}}
                      placeholder={I18n.t('EnterName')}
                      autoCorrect={false}
                      onChangeText={(name) => this.setState({name})}
                    />
                    </View>
                    </View>
                    <TouchableOpacity onPress={() => {
                      console.log(this.state.reps)}}><Text>Check reps</Text></TouchableOpacity>
              <ActivityPicker
              
                onSendData={(sets,reps,weight, reparray, weightarray) => {
                  if (sets === 0) {
                    console.log('Sets is zero');
                    let newRep = []; newRep[0] = this.state.reps;
                    let newWeight = []; newWeight[0] = this.state.weight;
                    console.log("newRep[0] is " + newRep[0])
                    console.log("newWeight[0] is " + newWeight[0])
                    console.log("this.state.reps is " + this.state.reps)
                    
                    this.onSendData(sets + 1, newRep, newWeight, reparray, weightarray);
                  }
                  else {
                    this.onSendData(sets, reps, weight, reparray, weightarray)
                  }
                  }}
                onSendInitialReps={(sets, reps) => {console.log('The reps amount is ' + reps); this.setState({sets,reps})}}
                onSendInitialWeight={(sets, weight) => {console.log('The weight used is ' + weight); this.setState({sets, weight}) }}
              />
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