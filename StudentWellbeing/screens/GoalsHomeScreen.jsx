import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { collection, orderBy, query, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";

import database from "../config/firebase";

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
  const [allGoals, setAllGoals] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(database, "goals"), orderBy("createdAt", "desc"));
        const collectionRef = await getDocs(q);
        // const collectionRef = database.collection("products");
        // const snapshot = await collectionRef.get();
        const fetchedData = collectionRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAllGoals(fetchedData);

        return () => unsubscribe(); // Detach listener
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  const Item = ({ name }) => (
    <View >
      <Text >{name}</Text>
    </View>
  );

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

      <FlatList
        data={allGoals}
        renderItem={({ item }) => <Item name={item.title} />}
        keyExtractor={(item) => item.id}
      />

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
