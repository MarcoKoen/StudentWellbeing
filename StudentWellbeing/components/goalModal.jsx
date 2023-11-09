/*
  File: GoalModal.jsx
  Description: This file defines the GoalModal component, which allows users to edit an existing goal by providing updated information.

*/

import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { CheckBox } from "react-native-elements";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import database from "../config/firebase";

/*
  GoalModal component
  @props:
    - open: Boolean indicating whether the modal is open
    - setOpen: Function to toggle the modal's open state
    - goal: The goal to be edited
*/
const GoalModal = (props) => {
  const [editedGoal, setEditedGoal] = useState({
    title: "", // Initialise with default values
    description: "",
    completed: false,
    createdAt: new Date(),
  });
  const navigation = useNavigation();

  useEffect(() => {
    if (props.goal) {
      // If the goal is provided through props, set the editedGoal accordingly
      setEditedGoal(props.goal);
    }
  }, [props.goal]);

  const onSave = async () => {
    try {
      if (!(editedGoal.title.length > 0 && editedGoal.description.length > 0)) {
        Alert.alert("Please fill out all fields");
        return;
      }

      // Update the goal in Firebase
      const goalRef = doc(database, "goals", props.goal.id);
      const goalDoc = await getDoc(goalRef);
      if (goalDoc.exists()) {
        const updatedGoal = {
          title: editedGoal.title,
          description: editedGoal.description,
          completed: editedGoal.completed,
          createdAt: editedGoal.createdAt,
        };
        await updateDoc(goalRef, updatedGoal);
      }

      props.setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
      margin: 20,
      width: "80%",
      height: "70%",
      backgroundColor: "white",
      borderRadius: 20,
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
    modalText: {
      marginBottom: 20,
      textAlign: "center",
      fontSize: 24, 
      fontWeight: "bold",
      color: "#333", // Dark text color
    },
    input: {
      height: 40,
      width: "100%", 
      marginVertical: 10,
      borderWidth: 1,
      borderColor: "#ccc", // Light border color
      padding: 10,
      fontSize: 16,
    },
    description: {
      height: 150,
      width: "100%", 
      marginVertical: 10, 
      borderWidth: 1,
      borderColor: "#ccc", // Light border color
      padding: 10,
      fontSize: 16, 
      textAlignVertical: "top", 
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10, 
    },
    checkboxLabel: {
      fontSize: 18,
    },
    checkbox: {
      marginLeft: 10,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 20, 
    },
    cancelButton: {
      backgroundColor: "#E74C3C", // Red button color
    },
    saveButton: {
      backgroundColor: "#2ECC71", // Green button color
      marginLeft: 10, 
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
      padding: 10,
    },
  });

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
          <Text style={styles.modalText}>Edit Goal</Text>

          {/* Input field for the goal name */}
          <TextInput
            style={styles.input}
            onChangeText={(title) => setEditedGoal({ ...editedGoal, title: title })}
            placeholder="Goal Name"
            value={editedGoal.title}
          />

          {/* Input field for the goal description */}
          <TextInput
            style={[styles.input, styles.description]}
            onChangeText={(description) => setEditedGoal({ ...editedGoal, description: description })}
            multiline={true}
            placeholder="Goal Description"
            value={editedGoal.description}
          />

          {/* Use a CheckBox to edit the completion state */}
          <CheckBox
            title="Completed"
            checked={editedGoal.completed}
            onPress={() => setEditedGoal({ ...editedGoal, completed: !editedGoal.completed })}
          />

          {/* Button container for Cancel and Save buttons */}
          <View style={styles.buttonContainer}>
            {/* Cancel button */}
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                props.setOpen(false);
              }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            {/* Save button */}
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={onSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalModal;
