import React, { Component } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Picker,
} from 'react-native';
import { Constants } from 'expo';
import {
  FormLabel,
  FormInput,
  Button,
} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Database from '../api/database';
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
    Database.addExerciseStats(this.state.text, this.state.weight, this.state.sets, this.state.reps, this.state.metric);
  }

  render() {
    return (
      <View style={styles.container}>
        <Ionicons
        name={'ios-add-circle'}
        size={45}
        color={'#CE0606'}
         onPress={() => {
            this.setModalVisible(true);
          }}
      />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={styles.paragraph}>
            <FormLabel>Name</FormLabel>
            <FormInput
              onChangeText={text =>
                this.setState({ text })}
              placeholder={'Type Exercise Name Here'}
            />
  <View style={styles.inlineContainer}>
            <Picker
                itemStyle={{fontSize: 16}}
                style={{flex: 1}}
                selectedValue={this.state.weight}
                onValueChange={(number) => this.setState({weight: number})}>
                  <Picker.Item label="50kg" value="50" />
                  <Picker.Item label="60kg" value="60" />
                  <Picker.Item label="70kg" value="70" />
                  <Picker.Item label="80kg" value="80" />
                  <Picker.Item label="90kg" value="90" />
                  <Picker.Item label="100kg" value="100" />
              </Picker>
              <Picker
                itemStyle={{fontSize: 16}}
                style={{flex: 1}}
                selectedValue={this.state.sets}
                onValueChange={(sets) => this.setState({sets})}>
                  <Picker.Item label="1 rep" value="1" />
                  <Picker.Item label="2 reps" value="2" />
                  <Picker.Item label="3 reps" value="3" />
                  <Picker.Item label="4 reps" value="4" />
                  <Picker.Item label="5 reps" value="5" />
              </Picker>
              <Picker
                itemStyle={{fontSize: 16}}
                style={{flex: 1}}
                selectedValue={this.state.reps}
                onValueChange={(reps) => this.setState({reps})}>
                  <Picker.Item label="1 set" value="1" />
                  <Picker.Item label="2 sets" value="2" />
                  <Picker.Item label="3 sets" value="3" />
                  <Picker.Item label="4 sets" value="4" />
                  <Picker.Item label="5 sets" value="5" />
              </Picker>
  </View>
            <Button
            style={styles.doneButton}
            onPress={this.sendData}
            title="Add"
          />
          </View>
          
          
          <Button
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
            style={styles.hideButton}
            title="Cancel"
          />

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
    marginTop: 50,
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
    }
});
