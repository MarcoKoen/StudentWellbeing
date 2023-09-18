import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

import database from "../config/firebase";

const GoalModal = (props) => {

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
          <Text style={styles.modalText}>{props.goal.title}</Text>
          <Text style={styles.modalText}>{props.goal.description}</Text>


          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              props.setOpen(false);
            }}>
            <Text style={styles.textStyle}>Hide Modal</Text>
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

export default GoalModal;
