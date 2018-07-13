import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, Modal, TouchableOpacity, ActivityIndicator } from "react-native";
import ActionButton from '../components/ActionButton';
import Common from '../constants/common';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import I18n from 'ex-react-native-i18n';
import fi from '../constants/fi';
import en from '../constants/en'; import ru from '../constants/ru';

import { Button } from "react-native-elements";
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};
var stripe = require('stripe-client')('pk_test_MTvVsXpCuzLp1wXhkQckVI6G');

class CreditCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
        modalVisible: false,
        card: null,
        loading: false,
        contactInfo: false,
        };
        this.setModalVisible = this.setModalVisible.bind(this);
        this.getToken = this.getToken.bind(this);
        this._onChange = this._onChange.bind(this);
        this.showCorrectButton = this.showCorrectButton.bind(this);
        this.buyPremium = this.buyPremium.bind(this)
        this.onPayment = this.onPayment.bind(this)
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
      }

    _onChange(form) {this.setState({ card: form})}

    getToken() {
        console.log(this.state.card)
    }

    async onPayment() {
      this.setState({ loading: true})
        var values = this.state.card.values
        var information = {
          card: {
            number: values.number,
            exp_month: values.expiry.slice(0, 2),
            exp_year: values.expiry.slice(3, 5),
            cvc: values.cvc,
            name: values.name
          }
        }
        var card = await stripe.createToken(information);
        var token = card.id;
        
        this.setState({ token: token }, () => {this.buyPremium()})
        console.log(this.state.token)
      }

      buyPremium() {
       var paymentDetails = {
         "amount": '500',
         "currency": 'eur',
         "source": this.state.token,
         "description": I18n.t('ChargeSubscription')
       };
       var formBody = [];
       for (var property in paymentDetails) {
         var encodedKey = encodeURIComponent(property);
         var encodedValue = encodeURIComponent(paymentDetails[property]);
         formBody.push(encodedKey + "=" + encodedValue);
       }
       formBody = formBody.join("&");
   
       fetch("https://api.stripe.com/v1/charges", {
         method: 'post',
         body: formBody,
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/x-www-form-urlencoded',
           'Authorization': 'Bearer ' + 'sk_test_a4x31jqnJ4LRakgghpNbJ6yj'
         }
       })
       .then((response) => response.json())
       .then((res) => {
         console.log(res)
          if(res.error) {
            this.setState({ paymentResponse: res.error.message }, () => {
              this.setState({loading: false, contactInfo: I18n.t('ContactInfo')})
            })
          } else {
          this.setState({ paymentResponse: res.outcome.seller_message }, () => {
            this.setModalVisible(!this.state.modalVisible)
          })
        }
        })
     }
      
    showCorrectButton() {
        if (this.state.card !== null) {
            card = this.state.card.status
            if (card.cvc == "valid" && card.expiry == "valid" && card.number == "valid" && card.name == "valid") {
                return (
                <View style={{marginTop: 32}}>
                <TouchableOpacity
                  disabled={this.state.loading}
                  onPress={this.onPayment} 
                  style={[Common.brightButtonRounded,Common.shadowBright,Common.marginVerticalSmall]}>
                    {this.state.loading ? <ActivityIndicator size="small" color="#fff" /> :
                    <Text style={Common.lightActionTitle} >{I18n.t('Pay')}</Text>}
                </TouchableOpacity>
                </View>
                
                )
            } else {
                return (
                <TouchableOpacity style={[Common.greyButtonRounded, {marginTop: 32}]} onPress={this.getToken}>
                  <Text style={Common.darkActionTitle}>{I18n.t('Pay')}</Text>
                </TouchableOpacity>
                )
            }
        } else { 
            return (
              <TouchableOpacity style={[Common.greyButtonRounded, {marginTop: 32}]} onPress={this.getToken}>
                <Text style={Common.darkActionTitle}>{I18n.t('Pay')}</Text>
              </TouchableOpacity>
            )
        }
    }

      // will print

    render() {
      var customPlaceholders = {
        name: "Full Name",
        number: "1234 5678 1234 5678",
        expiry: "MM/YY",
        cvc: "CVC",
        postalCode: "34567",
      };
      var customLabels = {
        name: "CARDHOLDER'S NAME",
        number: "CARD NUMBER",
        expiry: "EXPIRY",
        cvc: "CVC/CCV",
        postalCode: "POSTAL CODE",
      };
        return (
            <View>
              <StatusBar
              barStyle={ this.state.modalVisible ? 'dark-content' : 'dark-content'}
              />
              <TouchableOpacity
                onPress={() => {this.setModalVisible(true)}} 
                style={[
                        Common.brightButtonRounded,
                        Common.shadowBright,
                        Common.marginVerticalSmall
                        ]}>
                <Text style={Common.lightActionTitle} >{I18n.t('GoPremium')}</Text>
              </TouchableOpacity>
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
                <View>
                <View style={[Common.centered, {paddingTop:16}]}>
                <Text style={Common.darkTitleH1}>{I18n.t('PayWithCard')}</Text>
                </View>
                <CreditCardInput 
                onChange={this._onChange} 
                requiresName={true}
                labels={customLabels}
                placeholders={customPlaceholders}
                cardImageFront={require("../assets/images/rg-card-front.png")}
                cardImageBack={require("../assets/images/rg-card-back.png")}
                />
                {this.showCorrectButton()}
                <View style={[Common.centered, {paddingVertical:16}]}>
                  <Text style={[Common.darkBodyText, Common.centeredText]}>{this.state.paymentResponse}</Text>
                  <Text style={[Common.darkBodyText, Common.centeredText]}>{this.state.contactInfo}</Text>
                </View>
                </View>
              </Modal>
            </View>
        );
      }
    }

export default CreditCard;