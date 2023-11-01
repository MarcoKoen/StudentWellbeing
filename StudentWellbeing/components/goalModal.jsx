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

          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              props.setOpen(false);
            }}>
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onSave}>
            <Text style={styles.textStyle}>Save</Text>
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
    //   marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    width: "80%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
  input: {
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    height: 40,
    width: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default GoalModal;
