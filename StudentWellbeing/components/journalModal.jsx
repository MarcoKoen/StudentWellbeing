import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import database from "../config/firebase";

const JournalCreateModal = (props) => {
  const [journal, setJournal] = useState({
    title: "",
    description: "",
    createdAt: new Date(),
  });

  const [generateTitleFromPrompt, setGenerateTitleFromPrompt] = useState(false);

  const titlePrompts = [
    "What brings you joy?",
    "Name three things you are grateful for about today.",
    "Describe a place where you felt happiest.",
    "What was your greatest fear, and how did you conquer it?",
    "Write a letter to someone that you always want to thank but have never had the chance to do so.",
    "What is something that you would like to change about yourself? What would you need to do to change it?",
    "Describe your dream job/partner/house.",
    "Where's one place that you'd like to visit, and how do you imagine your time there?",
    "If you are granted a wish, what would you wish for and why?",
    "If you are a superhero, what superpower would you like to have and how would you use it?",
    "Write a letter to someone that you care about to tell them how you feel.",
    "Reflect and write letters to yourself with constructive feedback to improve yourself.",
    "Write about the people around you to describe what they are like, and what are your views about their actions etc.",
    "You can also record voice memos if you feel more comfortable to say those feelings out before writing them down!",
    "List down a bucket list with the things that you have always wanted to do.",
    "Where do you see yourself in the next 1, 3, 5, 10 years from now?",
    "What is something that you would like to achieve? How do you plan on reaching your goal(s)?",
    "How could you make someone you care about feel better if he/she just lost something important to them?"
  ];
  

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * titlePrompts.length);
    return titlePrompts[randomIndex];
  };

  const navigation = useNavigation();

  const onPress = async () => {
    // Add a new journal entry to the Firestore database
    try {
      if (!(journal.title.length > 0 && journal.description.length > 0)) {
        Alert.alert("Please fill out all fields");
        return;
      }
      await addDoc(collection(database, "journal"), journal);
      props.setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const generateRandomTitle = () => {
    const randomPrompt = getRandomPrompt();
    setJournal({ ...journal, title: randomPrompt });
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
          <Text style={styles.modalTitle}>New Journal Entry</Text>

          <TextInput
            style={[styles.input, styles.title]}
            value={journal.title} // Use the value prop to display the title
            multiline={true}
            onChangeText={(title) => setJournal({ ...journal, title: title })}
            placeholder="Title"
          />
          <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={generateRandomTitle}>
            <Text style={[styles.textStyle]}>Generate Journal Prompt</Text>
          </TouchableOpacity>

          <TextInput style={[styles.input, styles.description]} onChangeText={(description) => setJournal({ ...journal, description: description })} multiline={true} placeholder="Journal Entry" />

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

// Rest of the code remains the same

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  title: {
    height: 80,
    textAlignVertical: "top",
  },
});

export default JournalCreateModal;
