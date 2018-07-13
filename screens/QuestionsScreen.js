import React, { Component } from "react";
import { Platform, View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Modal, StatusBar } from "react-native";
import Swiper from 'react-native-swiper';
import Layout from '../constants/Layout';
import {Slider, CheckBox, Button, FormInput, FormLabel, FormValidationMessage} from 'react-native-elements';
import Database from '../api/database';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import * as firebase from "firebase";
import Common from '../constants/common';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

class QuestionsScreen extends Component {

  constructor(props) {
        super(props);
        this.state = {
          modalVisible: false,
            level: 1,
            DaysPerWeek: 3,
            email: null,
            password: I18n.t('Password'),
            gender: 'none',
            height: 0,
            weight: 0,
            name: null,
            response: "",
            pagination: 'none',
            loading: true,
        };
        this.signup = this.signup.bind(this);
        this.facebookReg = this.facebookReg.bind(this)
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
        } catch (error) {
            this.setState({
                response: error.toString()
            })
        }

    }


setModalVisible(visible) {
    this.setState({ modalVisible: visible });
    
  }

  facebookReg(val) {
    this.setState({
      showGender: false, 
      name: val.name,
      email: val.email,
      gender: val.gender
    }, () => {this.setState({ modalVisible: true })
  });
    console.log('got it', val)
  }

  render() {
    return (
        <View>
          <StatusBar
          barStyle={ this.state.modalVisible ? 'light-content' : 'dark-content'}
          />
          <Button
            buttonStyle={styles.loginButton}
            onPress={() => {
              this.setModalVisible(true);
            }}
            title={I18n.t('Register')}
          />
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
          >
          <View style={
              Common.pseudoNavigation
            }>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
            
          >
            <Text style={Common.brightActionTitle}>{I18n.t('Cancel')}</Text>
          </TouchableOpacity>
          </View>
            <Swiper
              ref={'swiper'}
              style={styles.wrapper}
              showsButtons
              scrollEnabled={false}
              showsPagination={true}
              activeDotColor={"#CE0707"}
              paginationStyle={{display: this.state.pagination}}
              prevButton={<Text style={styles.buttonText} />}
              nextButton={
                <View
                  style={[
                    Common.brightButtonRounded,
                    Common.shadowBright,
                    Common.marginVerticalSmall,

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
                <Text style={styles.text}>{I18n.t('Gender')}</Text>

                <View style={styles.Radio}>
                  <RadioGroup
                    size={20}
                    thickness={2}
                    color="#B2B2B2"
                    onSelect={(index, value) => this.setState({ gender: value })}
                  >

                    <RadioButton value={"female"} color="#B2B2B2">
                      <Text style={styles.labelText}>{I18n.t('Female')}</Text>
                    </RadioButton>
                    <RadioButton value={"male"} color="#B2B2B2">
                      <Text style={styles.labelText}>{I18n.t('Male')}</Text>
                    </RadioButton>

                  </RadioGroup>
                  
                </View>
                
            </View>

              <View style={styles.slide}>
                <Text style={styles.staticText}>
                  {I18n.t('WePrepared')}
                </Text>
                <View style={styles.divider} />
                <Text style={styles.text}>
                  {I18n.t('HowManyWeeks')}
                </Text>
                <View style={styles.Radio}>
                  <View style={{ flex: 1, width: Layout.window.width / 2 }}>
                    <Slider
                      value={this.state.DaysPerWeek}
                      minimumValue={1}
                      maximumValue={7}
                      step={1}
                      thumbTintColor={"#CE0707"}
                      minimumTrackTintColor={"#B2B2B2"}
                      onValueChange={val => this.setState({ DaysPerWeek: val })}
                    />
                    <Text style={styles.staticText}>
                      {I18n.t('PerWeek')}: {this.state.DaysPerWeek}
                    </Text>
                  </View>

                </View>
              </View>

              <View style={styles.slide}>
                <Text style={styles.staticText}>
                  {I18n.t('WePrepared')}
                </Text>
                <View style={styles.divider} />
                <Text style={styles.text}>{I18n.t('Measurements')}</Text>
                <View
                  style={[Common.container, styles.heightWeight]}
                >
                  <View>
                    <FormLabel>{I18n.t('Height')}</FormLabel>
                    <FormInput
                      onChangeText={height => this.setState({ height })}
                      placeholder={"cm"}
                      keyboardType={'number-pad'}
                      onFocus={() => console.log("Focused")}
                      enablesReturnKeyAutomatically={true}
                      returnKeyType="done"
                    />
                  </View>
                  
                  <View>
                    <FormLabel>{I18n.t('Weight')}</FormLabel>
                    <FormInput
                      onChangeText={weight => this.setState({ weight })}
                      placeholder={"kg"}
                      keyboardType={'number-pad'}
                      enablesReturnKeyAutomatically={true}
                      returnKeyType={'done'}
                    />
                  </View>
                </View>

              </View>

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
                  <FormLabel>{I18n.t('Name')}</FormLabel>
                  <FormInput
                    onChangeText={name => this.setState({ name })}
                    placeholder={I18n.t('EnterName')}
                    autoCorrect={false}
                    value={this.state.name}
                    enablesReturnKeyAutomatically={true}
                    returnKeyType={'next'}
                  />
                  <FormLabel>{I18n.t('Email')}</FormLabel>
                  <FormInput
                    onChangeText={text => this.setState({ email: text })}
                    placeholder={I18n.t('EnterYourEmail')}
                    value={this.state.email}
                    keyboardType={"email-address"}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    returnKeyType={'next'}
                  />
                  <FormLabel>{I18n.t('Password')}</FormLabel>
                  <FormInput
                    onChangeText={text => this.setState({ password: text })}
                    placeholder={I18n.t('EnterPassword')}
                    secureTextEntry={true}
                    enablesReturnKeyAutomatically={true}
                    returnKeyType={'next'}
                  />
                  <FormValidationMessage>{this.state.response}</FormValidationMessage>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.signup();
                  }}
                  style={[
                          Common.brightButtonRounded,
                          Common.shadowBright,
                          Common.marginVerticalSmall
                        ]}>
                  <Text style={Common.lightActionTitle} >{I18n.t('Done')}</Text>
                </TouchableOpacity>
              </View>
            </Swiper>
          </Modal>
        </View>
    );
  }
}

const styles = StyleSheet.create({
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
  ...Platform.select({
    ios: {
      alignItems: 'center',
      position: 'relative',
      flexDirection: 'column',
      alignSelf: 'center',
      flex: 1, 
      top: -200, 
    },
    android: {
      justifyContent: 'center',
      position: 'absolute', 
      top: 150,
      left: 0,
      right: 0, 
      bottom: 0,
    },
  }),

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
heightWeight: {
  flexDirection: "column",
  justifyContent: "flex-start"
},
loading: {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFF",
}
});

export default QuestionsScreen;