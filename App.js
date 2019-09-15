/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
//import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { Platform, StyleSheet, View, TextInput, Button, FlatList } from 'react-native';
import ListItem from './components/ListItem';
import { connect } from 'react-redux';
import { addPlace } from './actions/place';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

//type Props = {};
//export default class App extends Component {
  class App extends Component {

  state = {
    placeName: '',
    places: []
 }
 
 placeSubmitHandler = () => {
  if(this.state.placeName.trim() === '') {
    return;
  }
  this.props.add(this.state.placeName);
}

placeNameChangeHandler = (value) => {
this.setState({
  placeName: value
});    
}

placesOutput = () => {
 return (
  <FlatList style = { styles.listContainer }
    data = { this.props.places }
    keyExtractor={(item, index) => index.toString()}
    renderItem = { info => (
      <ListItem 
        placeName={ info.item.value }
      />
    )}
  />
)
}

render() {
  return (
    <View style={ styles.container }>
      <View style = { styles.inputContainer }>
        <TextInput
          placeholder = "Search Places"
          style = { styles.placeInput }
          value = { this.state.placeName }
          onChangeText = { this.placeNameChangeHandler }
        ></TextInput>
        <Button title = 'Add' 
          style = { styles.placeButton }
          onPress = { this.placeSubmitHandler }
        />
        </View>
        <View style = { styles.listContainer }>
          { this.placesOutput() }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  },
  listContainer: {
    width: '100%'
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: (name) => {
      dispatch(addPlace(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//         <TextInput
//            placeholder = "Search Places"
//            style = { styles.placeInput }
//         ></TextInput>
//         <Button title = 'Add' 
//             style = { styles.placeButton }
//             onPress = { this.placeSubmitHandler }
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   placeButton: {
//     width: '30%'
//   },
//   placeInput: {
//     width: '70%'
//   },
// });
