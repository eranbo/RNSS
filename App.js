/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert
} from 'react-native';

import RNSecureKeyStore from 'react-native-secure-key-store';

export default class App extends Component<{}> {
  constructor() {
    super();
    this.state = { text: '' };
    this.save = this.save.bind(this);
    this.read = this.read.bind(this);
  }

  save() {
    RNSecureKeyStore.set("key1", (this.state.text || "Temp value"))
      .then((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    Alert.alert('Save to secure storage', this.state.text || "Temp value");
  }

  read() {
    RNSecureKeyStore.get("key1").then(text => {
      Alert.alert('Value read:', text);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Test app for saving data securely.
        </Text>
        <TextInput style={{ width: 150, height: 40 }} onChangeText={(text) => this.setState({ text })}/>
        <View>
          <Button title="Save" onPress={this.save}/>
        </View>
        <View style={{ marginTop: 10 }}>
          <Button title="Read" onPress={this.read}/>
        </View>
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
});
