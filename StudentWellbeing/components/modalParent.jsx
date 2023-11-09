import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

/**
 * ModalParent Component
 * 
 * Description:
 * This component serves as a reusable modal container that provides a consistent layout for modals
 * in the application. It includes an exit button and renders its children components within the modal.
 * 
 * Props:
 * - open: Boolean indicating whether the modal is open
 * - setOpen: Function to toggle the modal's open state
 */
const ModalParent = (props) => {

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

          {/* Exit button */}
          <TouchableOpacity
            style={[styles.exitButton, styles.buttonClose]}
            onPress={() => {
              props.setOpen(false);
            }}>
            <FontAwesomeIcon icon="x" style={[styles.x, styles.icon]} />
          </TouchableOpacity>

          {/* Render children components within the modal */}
          {props.children}
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
  buttonClose: {
    backgroundColor: "#333533",
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
});

export default ModalParent;
