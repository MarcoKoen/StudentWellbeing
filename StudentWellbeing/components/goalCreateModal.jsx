import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


import database from "../config/firebase";

const GoalCreateModal = (props) => {
  const [goal, setGoal] = useState({
    title: "",
    description: "",
    completed: false,
    createdAt: new Date(),
  });

  const navigation = useNavigation();

  const onPress = async () => {
    // Add a new goal to the Firestore database
    try{
      if(!(goal.title.length > 0 && goal.description.length > 0)){
        Alert.alert("Please fill out all fields");
        return 
      }
        await addDoc(collection(database, "goals"), goal)
        props.setOpen(false);
    }catch(e){
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
          <Text style={styles.modalTitle}>New Goal</Text>
          <TextInput style={styles.input} onChangeText={(title) => setGoal({ ...goal, title: title })} placeholder="Goal Name" />
          <TextInput style={[styles.input, styles.description]} onChangeText={(description) => setGoal({ ...goal, description: description })} multiline={true} placeholder="Goal Description" />

          <TouchableOpacity
            style={[styles.exitButton, styles.buttonClose]}
            onPress={() => {
              props.setOpen(false);
            }}>
            <FontAwesomeIcon icon="x" style={[styles.x, styles.icon]} />
          </TouchableOpacity>
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
    width: "90%", // Adjust the width as needed
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
    bottom: 20, // Adjust the position as needed
    width: "50%", // Adjust the width as needed
    borderRadius: 8,
  },
  exitButton: {
    position: "absolute",
    height: 40, // Adjust the size as needed
    width: 40, // Adjust the size as needed
    borderRadius: 20,
    top: -20, // Adjust the position as needed
    right: -20, // Adjust the position as needed
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
    width: "90%", // Adjust the width as needed
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  description: {
    height: 150,
    width: "90%", // Adjust the width as needed
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
  },
});

export default GoalCreateModal;
