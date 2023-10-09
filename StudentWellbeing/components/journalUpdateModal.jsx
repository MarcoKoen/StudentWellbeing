import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { collection, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import database from "../config/firebase";
import ModalParent from "./modalParent";

const journalUpdate = (props) => {
  const navigation = useNavigation();
  const [text, onChangeText] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (props.item.item && props.item.item.title && props.item.item.description) {
      setTitle(props.item.item.title);
      setDescription(props.item.item.description);
    }
  }, [props.item.item]);


  const updateEntry = async () => {
    try {
      const journalRef = doc(database, "journal", props.item.item.id); // Reference to the specific journal document
      const updatedData = {
        title,
        description,
        // Add any other fields you want to update here
      };
      await setDoc(journalRef, updatedData, { merge: true }); // Merge option to update only specified fields
      // Optionally, you can add code to close the modal or navigate back to the previous screen
    } catch (error) {
      console.error("Error updating entry:", error);
    }
    props.setOpen(false)
  };

  const deleteEntry = async () => {
    try {
      const journalRef = doc(database, "journal", props.item.item.id); // Reference to the specific journal document
      await deleteDoc(journalRef);
      // Optionally, you can add code to close the modal or navigate back to the previous screen
      
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
    props.setOpen(false)
  };

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
          <Text style={styles.modalTitle}>{title}</Text>
          <TextInput
            style={styles.input}
            value={title}
            editable
            onChangeText={text => setTitle(text)}
        
          />
          <TextInput
            style={[styles.input, styles.description]}
            multiline={true}
            value={description}
            editable
            onChangeText={(text) => setDescription(text)}
          />

          <TouchableOpacity
            style={[styles.exitButton, styles.buttonClose]}
            onPress={() => {
              props.setOpen(false);
            }}
          >
            <FontAwesomeIcon icon="x" style={[styles.x, styles.icon]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose, styles.buttonSave]}
            onPress={updateEntry}
          >
            <Text style={[styles.textStyle, styles.icon]}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose, styles.buttonDelete]}
            onPress={deleteEntry}
          >
            <Text style={[styles.textStyle, styles.icon]}>Delete</Text>
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
  buttonDelete:{
    position: "absolute",
    width: 150,
    bottom: 5,
  },
  buttonSave: {
    position: "absolute",
    bottom: 80,
    margin: "auto",
    width: 150,
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
    color: "#F5CB5C",
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
  description: {
    height: 300,
    textAlignVertical: "top",
  },
});

export default journalUpdate;
