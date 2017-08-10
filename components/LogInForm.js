import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Modal, StatusBar } from "react-native";
import Swiper from 'react-native-swiper';
import Layout from '../constants/Layout';
import {Slider, CheckBox, Button, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import Database from '../api/database';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import * as firebase from "firebase";
import Common from '../constants/common';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

class LogInForm extends Component {

  constructor(props) {
        super(props);
        this.state = {
        modalVisible: false,
        email: I18n.t('Email'),
        password: I18n.t('Password'),
        };
        this.login = this.login.bind(this);
  }

    async login() {

        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

            this.setState({
                response: "Logged In!"
            });
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
          <StatusBar
          barStyle={ this.state.modalVisible ? 'dark-content' : 'light-content'}
          />
          <Button
            buttonStyle={styles.loginButton}
            onPress={() => {
              this.setModalVisible(true);
            }}
            title={I18n.t('LogIn')}
          />
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
          >
          <View style={Common.pseudoNavigation}>
          <TouchableOpacity
            onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
          >
            <Text style={Common.brightActionTitle}>{I18n.t('Cancel')}</Text>
          </TouchableOpacity>
          </View>
            <Swiper
              style={styles.wrapper}
              showsButtons
              scrollEnabled={false}
              showsPagination={true}
              prevButton={<Text style={styles.buttonText} />}
              nextButton={
                <View
                  style={[
                    Common.brightButtonRounded,
                    Common.shadowBright,
                    Common.marginVerticalSmall
                  ]}
                >
                  <Text style={Common.lightActionTitle}>{I18n.t('Next')}</Text>
                </View>
              }
              buttonWrapperStyle={styles.nextButton}
              loop={false}
            >
              <View style={styles.slide}>
                <Text style={styles.staticText}>
                  {I18n.t('WePrepared')}
                </Text>
                <View style={styles.divider} />
                <Text style={styles.text}>
                  {I18n.t('FillBasic')}
                </Text>
                <View
                  style={{
                    width: Layout.window.width,
                    flexWrap: "wrap",
                    justifyContent: "space-around"
                  }}
                >
                  <FormLabel>{I18n.t('Email')}</FormLabel>
                  <FormInput
                    onChangeText={text => this.setState({ email: text })}
                    placeholder={I18n.t('EnterYourEmail')}
                    keyboardType="email-address"
                    autoCapitalize={'none'}
                    autoCorrect={false}
                  />
                  <FormLabel>{I18n.t('Password')}</FormLabel>
                  <FormInput
                    onChangeText={text => this.setState({ password: text })}
                    placeholder={I18n.t('EnterPassword')}
                    secureTextEntry={true}
                  />
                  <FormValidationMessage>{this.state.response}</FormValidationMessage>
                </View>
                <TouchableOpacity
                  onPress={() => {this.login()}}
                  style={[
                          Common.brightButtonRounded,
                          Common.shadowBright,
                          Common.marginVerticalSmall
                        ]}>
                  <Text style={Common.lightActionTitle} >{I18n.t('LogIn')}</Text>
                </TouchableOpacity>
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

export default LogInForm;