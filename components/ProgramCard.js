import React, {Component} from 'react';
import ReactNative from 'react-native';
import {StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {withNavigation} from '@expo/ex-navigation';
import ExerciseItem from '../components/ExerciseItem';
import Layout from '../constants/Layout';
import Tag from '../components/Tag';
import BigTag from '../components/BigTag';
import Common from '../constants/common';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import en from '../constants/en';
import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

const { View, TouchableHighlight, Text, Image, ListView, TouchableOpacity, ActivityIndicator } = ReactNative;

const filterExercises = (filter, exercises) => {
return exercises.filter((item) => {
  if (filter === 'ALL') return true;
  if (filter === 'ISOLATION') return item.type === 'isolating';
  if (filter === 'ARMS') return item.arms;
  if (filter === 'SHOULDERS') return item.shoulders;
  if (filter === 'CHEST') return item.chest;
  if (filter === 'BACK') return item.back;
  if (filter === 'LEGS') return item.legs;
})
}

@withNavigation
class ProgramCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      uriLink: "_",
      filter: "ARMS",
      exercises: [],
      loading: true
    }
    this.handleFilter = this.handleFilter.bind(this);
 
  }
  
  handleFilter(filter) {
    this.setSource(this.state.exercises, filterExercises(filter, this.state.exercises), { filter })
  }
  
  setSource(exercises, itemsDatasource, otherState = {}){
    this.setState({
      exercises,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ... otherState
    })
  }

  componentDidMount() {
    var storageRef = firebase.storage().ref(`programs/program_bg_${this.props.item.photo}.png`);
    storageRef.getDownloadURL().then((url) => {
      
      this.setState({
        uriLink: url
      })
    }, function(error) {
      console.log(error);
    });
  }
  componentWilMount(){
    this.setState({
      link: '../assets/images/program_bg_'+'2.png'
    })
  }
  goToRoute = () => {
    this.props.navigator.push('programDashboard', {
      program: this.props.item,
      exercises: this.props.exercises,
      uid: this.props.uid,
      cameFromPrompt: this.props.cameFromPrompt,
    })
  }

  render() {
    const { exercises } = this.props;
    const { uid } = this.props;
    let id = 2
    let link = '../assets/images/program_bg_'+'2.png'
    return (
      
      <TouchableHighlight 
        underlayColor={'transparent'}
        onPress={this.goToRoute}
        style={[styles.container, this.props.item.isBestMatch ? Common.shadowProgramHighlight : Common.shadowMedium]}>
        <Image 
          source={{uri: this.state.uriLink, cache: 'force-cache'}}
          cache
          resizeMode={Image.resizeMode.cover}
          onLoadEnd={()=> { this.setState({ loading: false }) }}
          style={{flex: 1, width: null, height: null, borderRadius: 6}}
        >
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              {this.props.item.isBestMatch && <Text style={Common.lightTitleH4}>{I18n.t('Loading')}</Text>}
              <Text style={Common.lightTitleH2}>{this.props.item.name}</Text>
            </View>
            <View style={styles.infoContainer}>

            </View>
          </View>
        </Image>
      </TouchableHighlight>
    );
  }
_getMuscles() {
  const muscles = (this.props.item.day1 || '') + ', '+ 
                  (this.props.item.day2 || '') + ', ' + 
                  (this.props.item.day3 || '');

  const filteredMuscles = muscles.split(', ').filter((elem, index, self) => {
    return (index == self.indexOf(elem) && elem !== '');
  })
  const translatedMuscles = filteredMuscles.map((item) => {return I18n.t(item).toLowerCase()})
  return translatedMuscles.join(', ');

}

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Layout.window.width * 0.7,
    marginHorizontal: 20,
    marginTop: 2,
    marginBottom: 8,
    borderRadius: 6,
  },
  textContainer: {
    alignItems: 'flex-start',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'flex-start'
  },
  infoContainer: {
    flex: 3,
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '500',
    color: '#fff',
  },
  text: {
    color: '#fff'
  },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
})
module.exports = ProgramCard;