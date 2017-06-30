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
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

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
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
            '1767868336864920',
            { permissions: ['public_profile', 'email'] }
        );
    if (type === 'success') {
        // Build Firebase credential with the Facebook access token.
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        // Sign in with credential from the Facebook user.
        firebase.auth().signInWithCredential(credential).then(() => {
            setTimeout(() => {
                    this.props.navigator.push('home');
                }, 1000);
        }).catch((error) => {
        // Handle Errors here.
        });
        }
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
                        <QuestionsScreen/>
                        <LogInForm/>
                    </View>
                    <SocialIcon
                        title={I18n.t('LogInWithFacebook')}
                        onPress={this.loginWithFacebook}
                        style={{width: 250}}
                        button
                        type='facebook'
                    />
                </View>
            </Image>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        zIndex: -1
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
    }
});