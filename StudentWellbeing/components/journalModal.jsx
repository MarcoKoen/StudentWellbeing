import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import database from "../config/firebase";

const JournalEntry = (props) => {
  const [entry, setEntry] = useState({
    title: "",
    description: "",
    createdAt: new Date(),
  });

  const navigation = useNavigation();

  const onPress = async () => {
    await addDoc(collection(database, "journal"), entry);
    naviagation.navigage("Home");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.open}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        props.setOpen(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>New Journal Entry</Text>
          <TextInput
            style={styles.input}
            onChangeText={(title) => setEntry({ ...goal, title: title })}
            placeholder="Title"
          />
          <TextInput
            style={styles.input}
            onChangeText={(description) =>
              setEntry({ ...goal, description: description })
            }
            placeholder="More Info"
          />
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              props.setOpen(false);
            }}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={onPress}
          >
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
});

export default JournalEntry;
