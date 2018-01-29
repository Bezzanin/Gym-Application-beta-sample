import React from 'react';
import { View, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';
import * as firebase from "firebase";
import Common from "../constants/common";
import Expo from 'expo';

export default class TestScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={-200}
        >
        <View>
          <View
            style={{
                height: 360,
                background: 'blue'
            }}
          />
          <TextInput value="Hello"/>
          </View>
      </KeyboardAvoidingView>
    );
  }
}