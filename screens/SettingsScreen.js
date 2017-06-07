import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import * as firebase from "firebase";
import { ExpoConfigView } from '@expo/samples';
const ActionButton = require('../components/ActionButton');
import CommonStyle from "../constants/common";
import Stats from '../components/Stats';
import Profile from '../components/Profile';


export default class SettingsScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.loadingOFF = this.loadingOFF.bind(this);
    this.state = {
      own: false,
      loading: true
    };
  }
  static route = {
    navigationBar: {
      title: 'exp.json',
    },
  };
  
  async logout() {

        try {

            await firebase.auth().signOut();
            await AsyncStorage.setItem('ownProgram', '');
            this.props.navigator.push('login')

        } catch (error) {
            console.log(error);
        }

    }
    loadingOFF() {
      this.setState({
      loading: false,
    })
    }
    showText = () => {
      
    }
  render() {
    return (
      <ScrollView
        style={styles.container}>
        <Profile />
        <Stats loadingOFF={this.loadingOFF}/>
        {this.state.loading && <View style={styles.loading}>
            <ActivityIndicator
                animating
                size="large"
            />
        </View>}
        <View>
          <ActionButton onPress={this.logout} title="Logout" />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,.2)"

    }
});
