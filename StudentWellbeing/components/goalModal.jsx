import React, {useState} from 'react'
import {Alert, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import { collection, addDoc } from "firebase/firestore";

import database from "../config/firebase";

const GoalModal = (props) => {
    const [goal, setGoal] = useState({
        title: '',
        description: '',
        completed: false,
        createdAt: new Date()
    });

    const onPress = async () => {
        // Add a new product to the Firestore database
        console.log("Adding new goal: ", goal);
        await addDoc(collection(database, "goals"), goal);
        props.navigation.navigate("Home");
      };

    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.open}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            props.setOpen(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>New Goal</Text>
              <TextInput
                style={styles.input}
                onChangeText={title => setGoal({...goal, title: title})}
                placeholder='Goal Name'
                />
                <TextInput
                style={styles.input}
                onChangeText={description => setGoal({...goal, description: description})}
                placeholder='Goal Description'
                />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {props.setOpen(false)}}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={onPress}>
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
      margin: 20,
        width: '80%',
        height: '70%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    input: {
        height: 40,
        width: '80%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        },
  });

export default GoalModal
