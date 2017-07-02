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
import { FormInput, FormLabel } from 'react-native-elements'
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

export default class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: "CUSTOM Exerecise"
    };
    this.onSendData = this.onSendData.bind(this);
  }

  setModalVisible(visible) {
    console.log('Closing')
    this.setState({ modalVisible: visible });
  }

  onSendData(sets, reps, weight) {
    Database.addExerciseStats(this.state.name, sets, reps, weight);
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
          <Text style={Common.darkActionTitle}>Add activity</Text>
          </TouchableOpacity>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
        >

          <ScrollView contentContainerStyle={styles.container}>
            
            <View style={[styles.paragraph]}>
              <FormLabel>{I18n.t('Name')}</FormLabel>
                  <FormInput
                    onChangeText={name => this.setState({ name })}
                    placeholder={I18n.t('EnterName')}
                    autoCorrect={false}
                  />
              <ActivityPicker
                onSendData={this.onSendData}
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