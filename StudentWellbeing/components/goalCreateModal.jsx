/*
  File: GoalCreateModal.jsx
  Description: This file defines the GoalCreateModal component, which allows users to create a new goal by providing a title and description.
*/

import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import database from "../config/firebase";

/*
  GoalCreateModal component
  @props:
    - open: Boolean indicating whether the modal is open
    - setOpen: Function to toggle the modal's open state
*/
const GoalCreateModal = (props) => {
  // State to manage the new goal's information
  const [goal, setGoal] = useState({
    title: "",
    description: "",
    completed: false,
    createdAt: new Date(),
  });

  // Function to handle the creation of a new goal
  const onPress = async () => {
    try {
      // Add a new goal to the Firestore database
      if (!(goal.title.length > 0 && goal.description.length > 0)) {
        Alert.alert("Please fill out all fields");
        return;
      }
      await addDoc(collection(database, "goals"), goal);
      props.setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  // Render the GoalCreateModal component
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.open}
      onRequestClose={() => {
        props.setOpen(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>New Goal</Text>

          {/* Input field for the goal name */}
          <TextInput
            style={styles.input}
            onChangeText={(title) => setGoal({ ...goal, title: title })}
            placeholder="Goal Name"
          />

          {/* Input field for the goal description */}
          <TextInput
            style={[styles.input, styles.description]}
            onChangeText={(description) => setGoal({ ...goal, description: description })}
            multiline={true}
            placeholder="Goal Description"
          />

          {/* Exit button to close the modal */}
          <TouchableOpacity
            style={[styles.exitButton, styles.buttonClose]}
            onPress={() => {
              props.setOpen(false);
            }}
          >
            <FontAwesomeIcon icon="times" style={[styles.x, styles.icon]} />
          </TouchableOpacity>

          {/* Save button to create the new goal */}
          <TouchableOpacity style={[styles.button, styles.buttonClose, styles.buttonSave]} onPress={onPress}>
            <Text style={[styles.textStyle, styles.icon]}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    position: "absolute",
    top: 50,
    margin: 20,
    width: "90%", 
    backgroundColor: "#FFF", // White background color
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#333533",
  },
  buttonSave: {
    position: "absolute",
    bottom: 20, 
    width: "50%", 
    borderRadius: 8,
  },
  exitButton: {
    position: "absolute",
    height: 40, 
    width: 40,
    borderRadius: 20,
    top: -20, 
    right: -20, 
    backgroundColor: "#F5CB5C", // Light yellow background color
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  x: {
    color: "#333533", // Dark text color
    fontSize: 24,
    fontWeight: "bold",
  },
  icon: {
    color: "white",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333533", // Dark text color
  },
  input: {
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  description: {
    height: 150,
    width: "90%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
  },
});

export default GoalCreateModal;
