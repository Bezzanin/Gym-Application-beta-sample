import React, {Component} from 'react';
import ReactNative from 'react-native';
import {StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {withNavigation} from '@expo/ex-navigation';
import Common from '../constants/common';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

const { View, TouchableHighlight, Text, Image, TouchableOpacity, ActivityIndicator } = ReactNative;

@withNavigation
class ExerciseItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uriLink: 'default',
      videoLink: 'default',
      loading: true
    }
  }
  componentDidMount() {
    var storageRef = firebase.storage().ref(`exercises/${this.props.item.photo}.png`);
    storageRef.getDownloadURL().then((url) => {
      console.log(this.state.uriLink)
      this.setState({
        uriLink: url,
        
      })
    }, function(error) {
      console.log(error);
    });
  }
  displayAlternativeButton = () => {
    if (this.props.item.own) {
      return (
      <TouchableOpacity onPress={this.props.onReplace}>

          <Ionicons
        name={'ios-repeat-outline'}
        size={32}
        color={'#B3B3B3'}
      />

      </TouchableOpacity>)
    }
  }
  
  render() {
    let exerciseName = I18n.t(this.props.item.name.replace(/[^A-Z0-9]+/ig, ''))
    return (
      <TouchableHighlight 
        underlayColor={'#920707'}
        onPress={this.props.onPress}>
        <View style={[Common.inlineContainer, Common.paddingVertical, Common.sectionBorder]}>
          <View style={[Common.exerciseThumbnail, Common.shadowMedium]}>
            <Image
              source={{uri: this.state.uriLink}}
              onLoadEnd={()=> { this.setState({ loading: false }) }}
              style={Common.imageStyle}>
              <ActivityIndicator animating={ this.state.loading } style = {styles.activityIndicator}/>
              </Image>
          </View>
          <View style={[Common.inlineContainer]}>
            <View style={Common.containerText}>
              <Text style={Common.darkTitleH3}>{exerciseName || ''}</Text>
              <Text style={Common.darkNameTag}>{I18n.t(this.props.item.muscles)}</Text>
              <Text style={Common.darkNameTag}>{I18n.t(this.props.item.type)}</Text>
            </View>
            <View style={Common.buttonContainer}>
              {this.displayAlternativeButton()}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 3,
  },

  imageContainer: {
    width: 107,
    height: 73,
    backgroundColor: '#CFCFCF',
    margin: 12,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    borderRadius: 6
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '500'
  },
  tag: {
    fontSize: 14,
    marginVertical: 1
  },
  activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
})
module.exports = ExerciseItem;