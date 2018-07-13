import {
    AppRegistry,
    TextInput,
    Text,
    View,
    StyleSheet,
    dismissKeyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    StatusBar
} from "react-native";

import Expo from 'expo';

import { 
    FormLabel,
    FormInput,
    FormValidationMessage,
    SocialIcon,
    Button 
} from 'react-native-elements';
import React, {Component} from "react";
import * as firebase from "firebase";
import Database from '../api/database';
import QuestionsScreen from './QuestionsScreen';
import Common from '../constants/common';
import LogInForm from '../components/LogInForm';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import Layout from '../constants/Layout'
import en from '../constants/en'; import ru from '../constants/ru';
import { ACTION_TETHER_PROVISIONING_UI } from "expo/src/IntentLauncherAndroid";
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            response: ""
        };

        this.loginWithFacebook = this.loginWithFacebook.bind(this);

    }

    async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1872123986166631', {
            permissions: ['email', 'user_gender'],
        });
        if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,gender`)
            .then((response) => response.json())
			.then((responseJson) =>{
                console.log(responseJson)
                firebase.auth().signInWithEmailAndPassword(responseJson.email, 'random')
                .catch(error => {
                  console.log(error.code)
                  if(error.code === 'auth/wrong-password') {
                    this.refs.login.facebookReg(responseJson);
                  } else {
                    this.refs.registration.facebookReg(responseJson);
                  }
                })
			})
			.catch((error)=>{
				console.error(error);
			});
        
        }
    // 
    }

    
    changeLanguage(lang) {
        I18n.locale = lang;
        this.forceUpdate()
    }

    render() {

        return (

        <View style={styles.containerCentered}>
            <StatusBar
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <Image
                style={styles.backgroundImage}
                resizeMode={Image.resizeMode.fill}
                source={require('../assets/images/login_background.png')}
            >
                <View style={styles.containerCentered}>
                    <View style={styles.textGroup}>
                        <Text style={[Common.centeredText, Common.lightTitleH1]}>Rational Gym</Text>

                        <Text style={[Common.centeredText, Common.lightBodyText]}>{I18n.t('LoginPromo')}</Text>

                    </View>
                    
                    <View style={styles.form}>
                        <QuestionsScreen ref="registration"/>
                        <LogInForm ref="login" />
                    </View>
                    <SocialIcon
                        title={I18n.t('LogInWithFacebook')}
                        onPress={this.loginWithFacebook}
                        style={{width: 250}}
                        button
                        type='facebook'
                    />
                    <View style={styles.language}>
                    <TouchableOpacity onPress={() => {this.changeLanguage("fi")}}>
                        <Text style={[Common.lightBodyText]}>FI</Text>
                    </TouchableOpacity>
                    <Text style={[Common.lightBodyText]}> | </Text>
                    <TouchableOpacity onPress={() => {this.changeLanguage("en")}}>
                        <Text style={[Common.lightBodyText]}>EN</Text>
                    </TouchableOpacity>
                    {/* <Text style={[Common.lightBodyText]}> | </Text> */}
                    {/* <TouchableOpacity onPress={() => {this.changeLanguage("ru")}}>
                        <Text style={[Common.lightBodyText]}>RU</Text>
                    </TouchableOpacity> */}
                    </View>
                    
                </View>
                    <View style={styles.sponsorContainer}>
                        <Image style={{flex: 1, marginHorizontal: 16}} resizeMode='contain' source={require('../assets/images/flag_yellow_low.jpg')}/>
                        <Image style={{flex: 2, marginRight: 16}} resizeMode='contain' source={require('../assets/images/LogoEly.png')}/>
                        <Image style={{flex: 1, marginRight: 16}} resizeMode='contain' source={require('../assets/images/VipuvoimaaEU.png')}/>
                    </View>
            </Image>
            
        </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        zIndex: -1,
        width: Layout.window.width
    },
    language: {
        flexDirection: "row",
        marginTop: 50
    },
    containerCentered: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textGroup: {
        marginHorizontal: 40
    },
    title: {
        paddingBottom: 16,
        textAlign: "center",
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold",
        justifyContent:'center',
        alignSelf: 'center'
    },
    description: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    },
    form: {
        width: 300
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
    inputContainerStyle: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: '#fff',
        color: '#fff'
    },
    sponsorContainer: {
        flex: 1,
        flexDirection: 'row',  
        marginHorizontal: 8, 
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 56,
        maxHeight: 100,
    },
});