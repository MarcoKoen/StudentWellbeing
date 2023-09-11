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
    // Add a new product to the Firestore database
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
    //   marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    position: "absolute",
    top: 10,
    margin: 20,
    width: "80%",
    height: 600,
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
  buttonClose: {
    backgroundColor: "#333533",
  },
  buttonSave: {
    position: "absolute",
    bottom: 5,
    margin: "auto",
    width: 150
  },
  exitButton: {
    position: "absolute",
    height: 50,
    width: 50,
    borderRadius: 50,
    top: -10,
    right: -10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  x: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  icon: {
    color: "#F5CB5C"
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
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  description:{
    height: 150,
    textAlignVertical: "top",
  }
});

export default GoalCreateModal;
