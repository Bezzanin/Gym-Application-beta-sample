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
import ActivityInput from './ActivityInput';
import Common from '../constants/common';
import Database from '../api/database';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

export default class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: "Oma liike"
    };
    this.onSendData = this.onSendData.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onSendData(sets, reps, weight) {
    Database.addExerciseStats(this.state.name, sets, reps, weight);
    this.setModalVisible(false);
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
                    <Text style={Common.darkTitleH2}>{I18n.t('ExerciseName')}</Text>
                   <TextInput
                      style={{height: 40}}
                      placeholder={I18n.t('EnterExerciseName')}
                      autoCorrect={false}
                      onChangeText={(name) => this.setState({name})}
                    />
                    </View>
                    </View>
                    <View>
                      <ActivityInput onSendData={this.onSendData}/>
                    </View>
            </View>

            
          </ScrollView>

        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
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