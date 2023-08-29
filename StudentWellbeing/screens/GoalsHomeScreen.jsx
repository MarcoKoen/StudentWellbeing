import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import GoalModal from "../components/goalModal";

const styles = StyleSheet.create({
  hero: {
    padding: 16,
    backgroundColor: "#ccc",
    width: "80%", // Adjust the width as needed for 2 columns
    height: "25%",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heroStats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  add: {
    backgroundColor: "#333533",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: 50,
    width: 50,
  },
});

const GoalsHomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.hero}>
        <Text>"QUOTE HERE"</Text>
        <View style={styles.heroStats}>
          <View style={styles.stat}>
            <FontAwesomeIcon icon="check-circle" size={24} color="black" />
            <Text>Completed: 0</Text>
          </View>
          <View style={styles.stat}>
            <FontAwesomeIcon icon="check-circle" size={24} color="black" />
            <Text>ToDo: 0</Text>
          </View>
        </View>
      </View>

      <View>
        <TouchableOpacity style={styles.add} onPress={() => setModalVisible(true)} >
         <FontAwesomeIcon icon="plus" size={32} color="#F5CB5C"/>
        </TouchableOpacity>
      </View>

      <GoalModal open={modalVisible} setOpen={setModalVisible}/>
    </View>
  );
};

export default GoalsHomeScreen;
