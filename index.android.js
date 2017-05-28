/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ZeroconfRegistry from 'react-native-zeroconf-registry';
console.log("imported from react-native-zeroconf-registry");
console.log(ZeroconfRegistry);
const zRegistry = new ZeroconfRegistry();

export default class ZeroconfExample extends Component {
  componentWillMount() {
    zRegistry.on('start', () => console.log('The scan has started.'))
    zRegistry.on('stop', () => console.log('The scan is done.'))
    zRegistry.on('update', () => {
      console.log('The scan had an update')
      console.log(zRegistry.getServices())
    })
    zRegistry.on('found', (name) => console.log('found: ' + name))
    zRegistry.on('resolved', (resolved) => console.log('resolved: ' + resolved))
    zRegistry.on('error', (err) => console.log('error: ' + err))
    zRegistry.on('remove', (remove) => console.log('remove: ' + remove))
    try {
      console.log("calling scan")
      zRegistry.scan('_alfred_srv_brain')
      console.log("scan called")
    } catch (err) {
      console.log(err)
    }

    setTimeout(() => {
      console.log("few seconds passed, now whats the services look like?")
      console.log(zRegistry.getServices())
    }, 3000)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ZeroconfExample', () => ZeroconfExample);
