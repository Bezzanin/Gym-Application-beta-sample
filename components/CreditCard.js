import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, Modal, TouchableOpacity } from "react-native";
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

class componentName extends Component {

    constructor(props) {
        super(props);
        this.state = {
        modalVisible: false,
        card: null
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
        console.log(information);
        var card = await stripe.createToken(information);
        var token = card.id;
        
        this.setState({ token: token }, () => {this.buyPremium()})
        console.log(this.state.token)
      }

      buyPremium() {
       var paymentDetails = {
         "amount": '2000',
         "currency": 'eur',
         "source": this.state.token,
         "description": 'Charge for zoey.smith@example.com'
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
       .then((res) => console.log(res))
     }
      
    showCorrectButton() {
        if (this.state.card !== null) {
            card = this.state.card.status
            if (card.cvc == "valid" && card.expiry == "valid" && card.number == "valid") {
                return (
                <View style={{marginTop: 32}}>
                <ActionButton 
                onPress={this.onPayment} 
                title={'Pay'} />
                </View>
                )
            } else {
                return (
                    <Button
                    style={{marginTop: 32}}
                    onPress={this.getToken}
                    title="Pay"
                />
                )
            }
        } else { 
            return (
                <Button
                style={{marginTop: 32}}
                onPress={this.getToken}
                title="Pay"
            />
            )
        }
        
        
    }
      // will print

    render() {
        return (
            <View>
              <StatusBar
              barStyle={ this.state.modalVisible ? 'dark-content' : 'dark-content'}
              />
              <ActionButton onPress={() => {this.setModalVisible(true)}} title={'Pay With Card'} />
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
                <CreditCardInput onChange={this._onChange} requiresName={true}/>
                {this.showCorrectButton()}
                </View>
              </Modal>
            </View>
        );
      }
    }

export default componentName;