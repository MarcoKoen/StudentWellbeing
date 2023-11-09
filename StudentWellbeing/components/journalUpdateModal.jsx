/*
  File: JournalUpdate.jsx
  Description: This file defines the JournalUpdate component, allowing users to update and delete journal entries.

  Note: Make sure to replace "YourAppName" with the actual name of your app in the file description.
*/

import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import database from "../config/firebase";

/*
  JournalUpdate component
  @props:
    - open: Boolean indicating whether the modal is open
    - setOpen: Function to toggle the modal's open state
    - item: Object containing the journal entry details
*/
const JournalUpdate = (props) => {
  // State for managing the journal entry's information
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Navigation hook
  const navigation = useNavigation();

  // Effect to update state when the item changes
  useEffect(() => {
    if (props.item.item && props.item.item.title && props.item.item.description) {
      setTitle(props.item.item.title);
      setDescription(props.item.item.description);
    }
  }, [props.item.item]);

  // Function to update the journal entry in the Firestore database
  const updateEntry = async () => {
    try {
      const journalRef = doc(database, "journal", props.item.item.id); // Reference to the specific journal document
      const updatedData = {
        title,
        description,
        // Add any other fields you want to update here
      };
      await setDoc(journalRef, updatedData, { merge: true }); // Merge option to update only specified fields
    } catch (error) {
      console.error("Error updating entry:", error);
    }
    props.setOpen(false);
  };

  // Function to delete the journal entry from the Firestore database
  const deleteEntry = async () => {
    try {
      const journalRef = doc(database, "journal", props.item.item.id); // Reference to the specific journal document
      await deleteDoc(journalRef);
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
    props.setOpen(false);
  };

  // Styles for the JournalUpdate component
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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

  // Render the JournalUpdate component
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

          {/* Input field for the journal title */}
          <TextInput
            style={styles.input}
            value={title}
            editable
            onChangeText={(text) => setTitle(text)}
          />

          {/* Input field for the journal description */}
          <TextInput
            style={[styles.input, styles.description]}
            multiline={true}
            value={description}
            editable
            onChangeText={(text) => setDescription(text)}
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

          {/* Save button to update the journal entry */}
          <TouchableOpacity
            style={[styles.button, styles.buttonClose, styles.buttonSave]}
            onPress={updateEntry}
          >
            <Text style={[styles.textStyle, styles.icon]}>Save</Text>
          </TouchableOpacity>

          {/* Delete button to delete the journal entry */}
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

export default JournalUpdate;
