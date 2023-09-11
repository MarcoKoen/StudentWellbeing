import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { collection, orderBy, query, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";

import database from "../config/firebase";

import GoalCreateModal from "../components/goalCreateModal";
import GoalModal from "../components/goalModal";

const styles = StyleSheet.create({
  hero: {
    padding: 16,
    marginVertical: 8,
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
  goalList: {
    flexGrow: 1,
    width: "80%",
    height: "25",
    overflow: "scroll",
  },
  indivualGoal: {
    backgroundColor: "#333533",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Adjust the width as needed for 2 columns
    height: 50,
    borderRadius: 8,
    marginVertical: 8,
    overflow: "hidden",
  
  },
  indivualGoalText: {
    textAlign: "center",
    color: "#CFDBD5",
    fontSize: 24,
    fontWeight: "bold",
  },
});

const GoalsHomeScreen = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [goal, setGoal] = useState({});
  const [allGoals, setAllGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(database, "goals"), orderBy("createdAt", "desc"));
        const collectionRef = await getDocs(q);
        const fetchedData = collectionRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAllGoals(fetchedData);
        setLoading(false);
        return () => unsubscribe(); // Detach listener
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [, createModalVisible]);

  //when a goal is selected, set the goal state to that goal and open the modal, 
  //check if the goal state is empty to avoid initial render
  useEffect(() => {
    const goalModal = async () => {
    Object.keys(goal).length > 0 ? setGoalModalVisible(true) : setGoalModalVisible(false);
    };
    goalModal();
  }, [goal]);

  const Item = ({ item }) => (
    <View style={styles.indivualGoal}>
      <TouchableOpacity style={styles.indivualGoal} onPress={() => {setGoal(item)}}>
        <Text style={styles.indivualGoalText}>{item.title.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View 
    style={{ display: "flex", alignItems: "center"}}
    >
      <View style={styles.hero}>
        <View style={styles.heroStats}>
          <View style={styles.stat}>
            <FontAwesomeIcon icon="check-circle" size={24} color="black" />
            <Text>Completed: 0</Text>
          </View>
          <View style={styles.stat}>
            <FontAwesomeIcon icon="check-circle" size={24} color="black" />
            <Text>ToDo: 0</Text>
          </View>
          <View style={styles.stat}>
            <FontAwesomeIcon icon="check-circle" size={24} color="black" />
            <Text>Total: {allGoals.length}</Text>
          </View>
        </View>
      </View>

    {/* if loading is true, display loading text, else display the flatlist */}
    <View style={{width:"100%", height: "60%", overflow:"scroll", display:'flex', justifyContent:"center", alignItems:"center", padding:"2 0"}}>
    {loading ? <Text>Loading...</Text> : <FlatList
        data={allGoals}
        renderItem={({ item }) => <Item item={item}/>}
        keyExtractor={(item) => item.id}
        style={styles.goalList}
      />}
      </View>


      <View>
        <TouchableOpacity style={styles.add} onPress={() => setCreateModalVisible(true)} >
         <FontAwesomeIcon icon="plus" size={32} color="#F5CB5C"/>
        </TouchableOpacity>
      </View>

      <GoalCreateModal open={createModalVisible} setOpen={setCreateModalVisible}/>
      <GoalModal open={goalModalVisible} setOpen={setGoalModalVisible} goal={goal}/>

    </View>
  );
};

export default GoalsHomeScreen;
