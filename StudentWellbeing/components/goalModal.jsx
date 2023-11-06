import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { CheckBox } from "react-native-elements"; // Import CheckBox
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import database from "../config/firebase";

const GoalModal = (props) => {
  const [editedGoal, setEditedGoal] = useState({
    title: "", // Initialize with default values
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

      // Update the goal in Firestore
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
      padding: 20, // Reduced padding for a cleaner look
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
      marginBottom: 20, // Increased margin for better spacing
      textAlign: "center",
      fontSize: 24, // Increased font size
      fontWeight: "bold",
      color: "#333", // Dark text color
    },
    input: {
      height: 40,
      width: "100%", // Expanded input width
      marginVertical: 10, // Increased vertical margin
      borderWidth: 1,
      borderColor: "#ccc", // Light border color
      padding: 10,
      fontSize: 16, // Adjusted font size
    },
    description: {
      height: 150,
      width: "100%", // Expanded input width
      marginVertical: 10, // Increased vertical margin
      borderWidth: 1,
      borderColor: "#ccc", // Light border color
      padding: 10,
      fontSize: 16, // Adjusted font size
      textAlignVertical: "top", // Top align text
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10, // Increased top margin
    },
    checkboxLabel: {
      fontSize: 18, // Adjusted font size
    },
    checkbox: {
      marginLeft: 10, // Increased left margin
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 20, // Increased vertical margin
    },
    cancelButton: {
      backgroundColor: "#E74C3C", // Red button color
    },
    saveButton: {
      backgroundColor: "#2ECC71", // Green button color
      marginLeft: 10, // Adjusted left margin
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 18, // Adjusted font size
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
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit Goal</Text>
          <TextInput
            style={styles.input}
            onChangeText={(title) => setEditedGoal({ ...editedGoal, title: title })}
            placeholder="Goal Name"
            value={editedGoal.title}
          />
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

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                props.setOpen(false);
              }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
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
