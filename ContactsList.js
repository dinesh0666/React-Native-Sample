

import React, {Component} from 'react';
import {PermissionsAndroid, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Contacts from 'react-native-contacts';

export default class ContactsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      pictures:[]
    };
  }

  async componentWillMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Contacts',
          'message': 'This app would like to view your contacts.'
        }
      ).then(() => {
        this.loadContacts();
      })
    } else {
      this.loadContacts();
    }
  }

  loadContacts() {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied'){
        console.warn('Permission to access contacts was denied');
      } else {
        console.log(contacts);
        this.setState({ contacts });
      }
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>Contacts</Text>
        <ScrollView style={{flex: 1}}>
          <Text style={styles.welcome}>
            {JSON.stringify(this.state.contacts, null, '\t')}
          </Text>
        </ScrollView>
      </SafeAreaView>
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
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },
});