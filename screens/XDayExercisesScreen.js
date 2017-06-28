import React, { Component } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  ScrollView,
} from 'react-native';

import Database from '../api/database';
import ExerciseItem from '../components/ExerciseItem';
import Common from '../constants/common';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

export default class XDAYExercisesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      ownProgram: '',
      dataSource: new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
          }),
    }
  }
  static route = {
    navigationBar: {
      visible: true,
      title(params){ 
        return ` ${params.dayNumber} ${I18n.t('Day')}`
      }
    },
  };

async componentDidMount() {
  await this.setState({
    dataSource: this.state.dataSource.cloneWithRows(this.props.route.params.exercises)
  })
}
  render() {
    return (
     <ScrollView>
       
       <View style={[Common.paddingLeft, Common.paddingVertical, Common.sectionBorder]}>
       <Text style={Common.darkTitleH1}>{I18n.t('Exercises')}</Text>
       <Text style={Common.darkBodyText}>{I18n.t('Exercises')} {this.props.route.params.dayNumber} {I18n.t('Day')}</Text>
       </View>
        <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}/>
        
      </ScrollView>
    );
  }
  _renderItem(item) {
    goToReplace = () => {
      this.props.navigator.push('replaceExercise', {
        item: item,
        sequence: this.props.route.params.exercises
      })
    }
    goToRoute = () => {
      this.props.navigator.push('exercise', {
        exercise: item,
      })
    }
    return (
      <ExerciseItem item={item} imageLink={item.photo} onPress={goToRoute} onReplace={goToReplace}/>
    );
  }
}