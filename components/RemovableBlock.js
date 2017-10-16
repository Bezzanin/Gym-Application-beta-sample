import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Database from '../api/database';
import Common from '../constants/common';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import {withNavigation} from '@expo/ex-navigation';

import en from '../constants/en';
I18n.fallbacks = true;
I18n.translations = {fi, en};

@withNavigation
class RemovableBlock extends Component {


  render() {
    return(
        <View></View>
    )
    } 
}

module.exports = RemovableBlock;