import React, { Component } from 'react';
import {
  Modal,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { Constants } from 'expo';
import {
  FormLabel,
  FormInput,
  Button,
} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import ExerciseInput from './ExerciseInput'
import Common from '../constants/common';
import Database from '../api/database';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
import {Grid, Col, Row} from 'react-native-elements';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

export default class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      weight: '70',
      metric: 'kg',
      sets: '3',
      reps: '3',
    };
    this.sendData = this.sendData.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  sendData() {
    Database.addExerciseStats(this.state.text, this.state.weight, this.state.sets, this.state.reps);
  }

  render() {
          let allReps = [];
          let allWeight = [];
      let inputs = [];

        for(var i=0; (i<this.state.sets && i<7); i++){
            let currSet = 'set' + i;
            let counter = i;
            allReps[counter] = "10";
            allWeight[counter] = "30";
        inputs.push(
            (
    <View key={i} style={styles.InputContainer}>
        <Grid>
          <Col>
            <Text style={[{fontSize: 18, fontWeight: '500', color: '#7F7F7F', paddingTop: 9, paddingLeft: 20}]}>{counter + 1}</Text>
          </Col>
          <Col>
            
            <FormInput
              maxLength={2}
              style={{width: 20}}
              keyboardType={'numeric'}
              onChangeText={reps => {allReps[counter] = reps }}
              defaultValue={"10"}
              />

          </Col>
          <Col>
          <FormInput
            maxLength={3}
            keyboardType={'numeric'}
            onChangeText={weight => {allWeight[counter] = weight}}
            placeholder={"weight"}
            defaultValue={"30"}/>
          </Col>
          </Grid>
    </View>
            )
        );  
    }
    return (
      <View style={styles.container}>
        <Ionicons
          name={"ios-add-circle"}
          size={45}
          color={"#CE0606"}
          onPress={() => {
            this.setModalVisible(true);
          }}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
        >

          <ScrollView contentContainerStyle={Common.transparentContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <View style={Common.containerBasic} />
            </TouchableWithoutFeedback>
            <View style={[styles.paragraph, Common.shadowLight]}>
              
              <View style={[Common.centered, Common.paddingVertical]}>
                <Text style={Common.darkTitleH2}>{I18n.t('Addactivity')}</Text>
              </View>
             
              <View>
                <FormLabel labelStyle={{fontWeight: '400', color: '#7F7F7F'}}>{I18n.t('Name')}</FormLabel>
                <FormInput
                  onChangeText={text => this.setState({ text })}
                  placeholder={I18n.t('EnterName')}
                  containerStyle={{borderBottomWidth: 1, borderBottomColor: '#404040'}}
                />
              </View>
              
              <View style={{width: 120}}>
              <FormLabel labelStyle={{fontWeight: '400', color: '#7F7F7F'}}>Sets</FormLabel>
              <FormInput
              maxLength={2}
              onChangeText={sets => this.setState({ sets })}
              placeholder={"Enter sets"}
              containerStyle={{borderBottomWidth: 1, borderBottomColor: '#404040'}}
              />
              </View>
           
            <View key={i} style={styles.InputContainer}>
              <Grid>
                <Col>
                  <FormLabel labelStyle={{fontWeight: '400', color: '#7F7F7F'}}>set</FormLabel>
                </Col>
                <Col>
                  <FormLabel labelStyle={{fontWeight: '400', color: '#7F7F7F'}} >reps done</FormLabel>
                </Col>
                <Col>
                  <FormLabel labelStyle={{fontWeight: '400', color: '#7F7F7F'}}>weight</FormLabel>
                </Col>
              </Grid>
            </View>
            
            {inputs}
            <View style={{height: 24}}/>
              
            
              <TouchableOpacity
                onPress={() => {
                  //this.sendData();
                  //this.setModalVisible(!this.state.modalVisible);
                  this.setState({
                    weight: allWeight,
                    reps: allReps,
                  }, () => {
                    this.sendData();
                  })
                }}
                style={[
                  Common.brightButtonRounded,
                  Common.shadowBright,
                  Common.marginVerticalSmall
                ]}
              >
                <Text style={Common.lightActionTitle}>{I18n.t('Add')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                style={[
                  Common.greyButtonRounded,
                  Common.shadowMedium,
                  Common.marginVerticalSmall
                ]}
              >
                <Text style={Common.lightActionTitle}>{I18n.t('Cancel')}</Text>
              </TouchableOpacity>

              </View>

            
            <TouchableWithoutFeedback
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <View style={Common.containerBasic} />
            </TouchableWithoutFeedback>
          </ScrollView>

        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    paddingTop: 10,
    backgroundColor: 'white',
    paddingBottom: 30,
    borderRadius: 5,
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
