import React, {Component} from 'react';
import ReactNative, { TouchableWithoutFeedback } from 'react-native';
import {StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {withNavigation} from '@expo/ex-navigation';
import Common from '../constants/common';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import en from '../constants/en'; import ru from '../constants/ru';
import Swipeable from 'react-native-swipeable';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

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

  componentWillMount() {
    var rightButtons = [
      <TouchableOpacity 
      style={{backgroundColor: '#CE0707',flex: 1,justifyContent: 'center', paddingLeft: 20}}
      onPress={() => {this.props.sendIndex(this.props.item._key, 'delete')}}
      >
        <Text style={{color: 'white'}}>Delete</Text>
      </TouchableOpacity>
    ]
    this.setState({rightButtons})
  }
  componentDidMount() {
    var storageRef = firebase.storage().ref(`exercises/${this.props.item.photo}.png`);
    storageRef.getDownloadURL().then((url) => {
      // console.log(this.state.uriLink)
      this.setState({
        uriLink: url,
      })
    }, function(error) {
      console.log(error);
    });
  }
   componentWillReceiveProps(nextProps) {
    this.setState({loading: true})
    var storageRef = firebase.storage().ref(`exercises/${nextProps.item.photo}.png`);
    storageRef.getDownloadURL().then((url) => {
      this.setState({
        uriLink: url
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
      </TouchableOpacity>
    )
    }
  }
  
  render() {
    if (this.props.item instanceof Array) {
      let exerciseItems = []
      for (let i = 0; i < this.props.item.length; i++) {
        let key = i;
        exerciseItems.push((<TouchableOpacity
          {...this.props.sortHandlers}
          onPress={this.props.onPress}
          style={[Common.containerLeft, {backgroundColor: 'white'},this.props.editModeOn && Common.shadowLight]}>
          <View style={[Common.inlineContainer, Common.paddingVertical, Common.sectionBorder]}>
            <View style={[Common.exerciseThumbnail, Common.shadowMedium]}>
              <Image
                source={{uri: this.state.uriLink}}
                onLoadEnd={()=> { this.setState({ loading: false }) }}
                style={Common.imageStyle}>
                <ActivityIndicator animating={ this.state.loading } style = {Common.activityIndicator}/>
                </Image>
            </View>
            <View style={[Common.inlineContainer]}>
              <View style={Common.containerText}>
                <Text style={Common.darkTitleH3}>{I18n.t(this.props.item[key].name.replace(/[^A-Z0-9]+/ig, '')) || ''}</Text>
                <Text style={Common.darkNameTag}>{I18n.t(this.props.item[key].muscles)}</Text>
                <Text style={Common.darkNameTag}>{I18n.t(this.props.item[key].type)}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>))
      }
      return (<View>
        <View style={[Common.containerLeft, {paddingTop: 24}]}>
          <Text style={Common.darkTitleH2}>{I18n.t('Superset')}, {this.props.item.length} {I18n.t('Exercises').toLowerCase()}</Text>
        </View>
        {exerciseItems}
      </View>)
    }
    else if (this.props.quickWorkout) {
      return (
        <Swipeable
        rightButtons={this.state.rightButtons}>
        <TouchableOpacity
          {...this.props.sortHandlers}
          onPress={this.props.onPress}
          style={[{backgroundColor: 'white'},this.props.editModeOn && Common.shadowLight]}>
          <View style={[Common.inlineContainer, Common.paddingVertical, Common.sectionBorder]}>
            <View style={[Common.exerciseThumbnail, Common.shadowMedium]}>
              <Image
                source={{uri: this.state.uriLink}}
                onLoadEnd={()=> { this.setState({ loading: false }) }}
                style={Common.imageStyle}>
                <ActivityIndicator animating={ this.state.loading } style = {Common.activityIndicator}/>
                </Image>
            </View>
            <View style={[Common.inlineContainer]}>
              <View style={Common.containerText}>
                <Text style={Common.darkTitleH3}>{I18n.t(this.props.item.name.replace(/[^A-Z0-9]+/ig, '')) || ''}</Text>
                <Text style={Common.darkNameTag}>{I18n.t(this.props.item.muscles)}</Text>
                <Text style={Common.darkNameTag}>{I18n.t(this.props.item.type)}</Text>
              </View>
              <View style={Common.buttonContainer}>
                {this.displayAlternativeButton()}
              </View>
            </View>
          </View>
        </TouchableOpacity>
        </Swipeable>
      );
    } else {
      return (
        <View
        rightButtons={this.state.rightButtons}>
        <TouchableOpacity
          {...this.props.sortHandlers}
          onPress={this.props.onPress}
          style={[{backgroundColor: 'white'},this.props.editModeOn && Common.shadowLight]}>
          <View style={[Common.inlineContainer, Common.paddingVertical, Common.sectionBorder]}>
            <View style={[Common.exerciseThumbnail, Common.shadowMedium]}>
              <Image
                source={{uri: this.state.uriLink}}
                onLoadEnd={()=> { this.setState({ loading: false }) }}
                style={Common.imageStyle}>
                <ActivityIndicator animating={ this.state.loading } style = {Common.activityIndicator}/>
                </Image>
            </View>
            <View style={[Common.inlineContainer]}>
              <View style={Common.containerText}>
                <Text style={Common.darkTitleH3}>{I18n.t(this.props.item.name.replace(/[^A-Z0-9]+/ig, '')) || ''}</Text>
                <Text style={Common.darkNameTag}>{I18n.t(this.props.item.muscles)}</Text>
                <Text style={Common.darkNameTag}>{I18n.t(this.props.item.type)}</Text>
              </View>
              <View style={Common.buttonContainer}>
                {this.displayAlternativeButton()}
              </View>
            </View>
          </View>
        </TouchableOpacity>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  draggable: {
    marginVertical: 16,
  }
})
module.exports = ExerciseItem;