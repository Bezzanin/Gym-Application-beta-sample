import React, { Component } from 'react';
import {
  Modal,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
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
        
    return (
      <View style={styles.container}>

        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}
          style={Common.darkButton}>
          <Text style={Common.darkActionTitle}>Add activity</Text>
          </TouchableOpacity>
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
              <ActivityPicker/>
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