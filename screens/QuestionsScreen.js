import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Modal } from "react-native";
import Swiper from 'react-native-swiper';
import Layout from '../constants/Layout';
import {Slider, CheckBox, Button, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import Database from '../api/database';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import * as firebase from "firebase";

class QuestionsScreen extends Component {

  constructor(props) {
        super(props);
        this.state = {
          modalVisible: false,
            level: 1,
            DaysPerWeek: 3,
            email: 'Email',
            password: 'Password',
            gender: 'none',
            height: 0,
            weight: 0,
            name: 'none',
            response: ""
        };
        this.sendAnswers = this.sendAnswers.bind(this);
        this.signup = this.signup.bind(this);
  }

sendAnswers(){
  this.props.setEmailAndPassword(this.state.email, this.state.password);
  let timeout = setTimeout(() => {
                Database.addUserDetails(this.state.gender, 
   this.state.DaysPerWeek, 
   this.state.height, 
   this.state.weight, 
   this.state.name); 
            }, 1000)
    
}

    async signup() {


        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            await Database.addUserDetails(this.state.gender, 
   this.state.DaysPerWeek, 
   this.state.height, 
   this.state.weight, 
   this.state.name); 
            this.setState({
                response: "account created"
            });
            await this.setModalVisible(!this.state.modalVisible);

           /* setTimeout(() => {
                this.props.navigator.push('home');
            }, 1000);*/

        } catch (error) {
            this.setState({
                response: error.toString()
            })
        }

    }


setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View>
      <Button
          buttonStyle={styles.loginButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
          title="Register"
        />
      <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}>
      <Swiper 
        style={styles.wrapper} showsButtons scrollEnabled={false} showsPagination={true}
        prevButton={<Text style={styles.buttonText}></Text>}
        nextButton={<View style={styles.button}><Text style={styles.buttonText}>Next</Text></View>}
        buttonWrapperStyle={styles.nextButton}
        loop={false}>
    <View style={styles.slide}>
        <Text style={styles.staticText}>Our app will offer you program based on your gym experience level</Text>
        <View style={styles.divider}/>
        <Text style={styles.text}>Choose your gender{this.state.level}</Text>
        <Button
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
            style={styles.hideButton}
            title="Cancel"
          />
        <View style={styles.Radio}>
        <RadioGroup
          size={20}
  thickness={2}
  color='#B2B2B2'
  onSelect = {(index, value) => this.setState({gender: value})}
      >
        <RadioButton value={'male'} color='#B2B2B2'>
          <Text style={styles.labelText}>Male</Text>
        </RadioButton>

        <RadioButton value={'female'} color='#B2B2B2'>
          <Text style={styles.labelText}>Female</Text>
        </RadioButton>
      </RadioGroup>
      
  </View>
  
  </View>


  <View style={styles.slide}>
    <Text style={styles.staticText}>Our app will offer you program based on your gym experience level</Text>
    <View style={styles.divider}/>
    <Text style={styles.text}>How many days per week you want to train?</Text>
    <View style={styles.Radio}>
      <View style={{flex: 1, width: Layout.window.width/2}}>
  <Slider
    value={this.state.DaysPerWeek}
    minimumValue={1}
    maximumValue={7}
    step={1}
    thumbTintColor={'#CE0707'}
    minimumTrackTintColor={'#B2B2B2'}
    onValueChange={(val) => this.setState({DaysPerWeek: val})} />
  <Text style={styles.staticText}>Value: {this.state.DaysPerWeek}</Text>
  <Button
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
            style={styles.hideButton}
            title="Cancel"
          />
</View>

  </View>
  </View>

  <View style={styles.slide}>
    <Text style={styles.staticText}>Our app will offer you program based on your gym experience level</Text>
    <View style={styles.divider}/>
    <Text style={styles.text}>Your Measurements</Text>
    <View style={{flexDirection: 'row', width: Layout.window.width, flexWrap: 'wrap', justifyContent: 'space-around'}}>
      <View><FormLabel>Height</FormLabel>
        <FormInput
          onChangeText={text =>
                this.setState({ text })}
          placeholder={'cm'}
        /></View>
        <View><FormLabel>Weight</FormLabel>
        <FormInput
          onChangeText={text =>
                this.setState({ text })}
          placeholder={'kg'}
        /></View>
  </View>
          <Button
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
            style={styles.hideButton}
            title="Cancel"
          />
  </View>

  <View style={styles.slide}>
    <Text style={styles.staticText}>Our app will offer you program based on your gym experience level</Text>
    <View style={styles.divider}/>
    <Text style={styles.text}>Great! Just fill the basic info and you are ready</Text>
    <View style={{width: Layout.window.width, flexWrap: 'wrap', justifyContent: 'space-around'}}>
      <FormLabel>Name</FormLabel>
        <FormInput
          onChangeText={text =>
                this.setState({ text })}
          placeholder={'Your Name'}
        />
      <FormLabel>{this.state.email}</FormLabel>
        <FormInput
          onChangeText={text =>
                this.setState({ email: text })}
          placeholder={'Valid Email Address'}
          keyboardType="email-address"
        />
        <FormLabel>{this.state.password}</FormLabel>
        <FormInput
          onChangeText={text =>
                this.setState({ password: text })}
          placeholder={'Your Password'}
          keyboardType="password"
        />
        <FormValidationMessage>{this.state.response}</FormValidationMessage>
  </View>
    <TouchableHighlight 
    style={styles.doneButton}
    onPress={() => {
              this.signup();
              

            }}>
    <View style={styles.button}><Text style={styles.buttonText}>Done</Text></View>
    </TouchableHighlight>
  </View>
</Swiper>
</Modal>
</View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
 slide: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  text: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    width: Layout.window.width * 0.8,
  },
  left: {
    marginRight: 200
  },
  right: {
    marginLeft: 200
  },
  labelText: {
    color: '#B2B2B2',
  },
  staticText: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
  },
  Radio: {
    marginTop: 50,
    alignSelf: 'center',
  },
  divider: {
    width: Layout.window.width,
    height: 1,
    backgroundColor: '#EBEBEB',
    marginBottom: 40,
  },
  nextButton: {
  flex: 1, 
  top: -200, 
  justifyContent: 'center', 
  alignItems: 'flex-end',
},
  doneButton: {
  backgroundColor: 'transparent', 
  flexDirection: 'column', 
  position: 'absolute', 
  top: 0,
  left: 0,
  right: 0, 
  bottom: 200,
  flex: 1,
  zIndex: -1, 
  paddingHorizontal: 10, 
  paddingVertical: 10, 
  justifyContent: 'flex-end', 
  alignItems: 'center',
},
button: {
  backgroundColor: '#CE0707',
  borderWidth: 5,
  borderRadius: 20,
  borderColor: '#CE0707',
  padding: 5,
  paddingHorizontal: 30,
},
hideButton: {
  backgroundColor: '#CE0707',
  borderWidth: 5,
  borderRadius: 20,
  borderColor: '#CE0707',
  padding: 5,
  paddingHorizontal: 30,
},
buttonText: {
  fontSize: 24,
  color: '#FFFFFF'
},
loginButton: {
        width: 250,
        borderRadius: 100,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: 'transparent'
    },
  
});

export default QuestionsScreen;