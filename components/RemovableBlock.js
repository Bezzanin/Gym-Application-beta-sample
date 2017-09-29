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
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
import {withNavigation} from '@expo/ex-navigation';

I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

@withNavigation
class RemovableBlock extends Component {


  render() {
    return(
        <View></View>
    )
    } 
}

module.exports = RemovableBlock;