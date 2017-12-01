import React, {Component} from 'react';
import ReactNative from 'react-native';
import {StyleSheet, View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import * as firebase from 'firebase';
import {withNavigation} from '@expo/ex-navigation';
import Common from '../constants/common';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import Layout from '../constants/Layout'
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};
import Swipeable from 'react-native-swipeable';

const leftContent = <Text>Pull to activate</Text>;

@withNavigation
class StatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uriLink: 'not empty string',
      videoLink: 'not empty string',
      hideLogs: true,
      isEditing: false
    }
    
  }
  componentWillMount() {
    if (this.props.swipable) {
      var rightButtons = [
        <TouchableOpacity 
        style={{backgroundColor: '#CE0707',flex: 1,justifyContent: 'center', paddingLeft: 20}}
        onPress={() => {this.props.sendIndex(this.props.item.id)}}
        >
          <Text style={{color: 'white'}}>Delete</Text>
        </TouchableOpacity>,
        <TouchableOpacity 
        style={{backgroundColor: 'green',flex: 1, justifyContent: 'center', paddingLeft: 20}}
        onPress={() => {this.goToRoute()}}
        >
          <Text style={{color: 'white'}}>Replace</Text>
        </TouchableOpacity>
      ]
      this.setState({rightButtons})
    } else { this.setState({rightButtons: null}) }
  }
  componentDidMount() {
    var storageRef = firebase.storage().ref(`exercises/${this.props.item.photo}.png`);
    storageRef.getDownloadURL().then((url) => {
      this.setState({
        uriLink: url
      })
    }, function(error) {
      console.log(error);
    });
  }
  displayLogThumbnail() {
    if (!this.props.item.photo) {
      return(<View/>)
    }
    else {
      return(
         <View style={[Common.logThumbnail, Common.shadowMedium]}>
            <Image source={{uri: this.state.uriLink || require('../assets/images/CTA.png')}} style={Common.imageStyle}/>
         </View>
      )
    }
  }

  goToRoute = () => {
    this.props.navigator.push('exercises', {
      filter: 'ALL',
      quickWorkout: true
  })
}

  render() {
    const logs = [];
    for (let i = 0; i<this.props.item.sets; i++) {
      let counter = i;
      logs.push(
        <View style={[Common.inlineLogContainer, Common.sectionBorder]} key={this.props.item.id}>
          {this.state.isEditing ? 
          <View style={{flexDirection: 'row'}}> 
          <View style={{flex: 1}}>
            <Text style={Common.darkTitleH4Bold}>{counter + 1}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TextInput
              style={{height: 16, width: 20}}
              onChangeText={(text) => this.props.changeText(counter, text, this.props.item.id, 'reps')}
              value={this.state.text}
              placeholder={this.props.item.reps[counter]}
            /><Text style={Common.darkTitleH4Light}> reps</Text>
          </View>
          <View style={{flex: 1,  paddingRight: Layout.gutter.l,  flexDirection: 'row'}}>
          <TextInput
              style={{height: 16, width: 30}}
              onChangeText={(text) => this.props.changeText(counter, text, this.props.item.id, 'weight')}
              value={this.state.text}
              placeholder={this.props.item.weight[counter]}
            />
            <Text style={Common.darkTitleH4Light}> kg</Text>
          </View>
          </View>
          :
          <View style={{flexDirection: 'row'}} key={this.props.item.id}> 
          <View style={{flex: 1}}>
            <Text style={Common.darkTitleH4Bold}>{counter + 1}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={Common.darkTitleH4Light}>{this.props.item.reps[counter]} {I18n.t('Reps')}</Text>
          </View>
          <View style={{flex: 1,  paddingRight: Layout.gutter.l}}>
            <Text style={Common.darkTitleH4Light}>{this.props.item.weight[counter]} kg</Text>
          </View>
          </View>
          }
        </View>
      )
    }
    if(this.props.item.name) {
    return (
      <Swipeable
            rightButtons={this.state.rightButtons}>
        <View style={[Common.containerHorizontal, {paddingRight: Layout.gutter.l}]}>
          <View style={[this.state.hideLogs && !this.props.last && Common.sectionBorder, Common.paddingVerticalSmall]}>
          <Text style={Common.darkTitleH4Bold}>
                {this.props.item.own ? this.props.item.name || '' : 
                I18n.t(this.props.item.name.replace(/[^A-Z0-9]+/ig, ''))  || ''}
                
              </Text>
        <View style={[Common.inlineContainer]}>
         
          <View style={[Common.inlineLogContainer]}>
           
              <Text style={Common.darkTitleH4Light}>{this.props.item.sets} {I18n.t('Sets')}
                
              </Text>

                  <TouchableOpacity onPress={() => {this.setState({isEditing: !this.state.isEditing})}}>
                    {this.props.swipable ? <Text style={Common.actionTitleH4Light}>
                    {this.state.isEditing ? 'Done' : 'Edit'}</Text> : <Text /> }
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {this.setState({hideLogs: !this.state.hideLogs})}}>
                    <Text style={Common.actionTitleH4Light}>
                    {this.state.hideLogs ? I18n.t('ShowMore') : I18n.t('Hide')}</Text>
                  </TouchableOpacity>
            
          
          </View>
        </View>
        
          {this.state.hideLogs ? <View/> : <View>{logs}</View>}
        
        </View>
        </View>
        </Swipeable>
    );
      
} else {
  return (
    <View>
      <Text>Loading...</Text>
    </View>)
}
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },

});

module.exports = StatItem;