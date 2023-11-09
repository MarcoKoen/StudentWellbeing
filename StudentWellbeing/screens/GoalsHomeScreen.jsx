import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { collection, orderBy, query, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";

import database from "../config/firebase";

import GoalCreateModal from "../components/goalCreateModal";
import GoalModal from "../components/goalModal";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#333533",
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
  },
  headerText: {
    color: "#F5CB5C",
    fontSize: 24,
    fontWeight: "bold",
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#2C3E50",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8,
    alignItems: "center",
  },
  statText: {
    color: "#F5CB5C",
    fontSize: 18,
  },
  loadingText: {
    fontSize: 18,
    marginTop: 16,
  },
  goalContainer: {
    backgroundColor: "#333533",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  completedGoal: {
    borderColor: "#4CAF50",  // Lighter green color
    borderWidth: 6,
  },
  goalText: {
    color: "#CFDBD5",
    fontSize: 20,
    fontWeight: "bold",
  },
  addGoalButton: {
    backgroundColor: "#F5CB5C",
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  filterButton: {
    backgroundColor: "#F5CB5C",
    borderRadius: 8,
    padding: 8,
    margin: 8,
  },
  filterButtonText: {
    color: "#333533",
  },
});

const GoalsHomeScreen = () => {
  // Define state variables for the filter
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [goal, setGoal] = useState({});
  const [allGoals, setAllGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState("all"); // "all", "todo", or "completed"

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(database, "goals"), orderBy("createdAt", "desc"));
        const collectionRef = await getDocs(q);
        const fetchedData = collectionRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAllGoals(fetchedData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [,createModalVisible, goalModalVisible]);

  // Check if a goal is selected and open the modal if so
  useEffect(() => {
    const goalModal = () => {
      Object.keys(goal).length > 0 ? setGoalModalVisible(true) : setGoalModalVisible(false);
    };
    goalModal();
  }, [goal]);

  // Define filteredGoals based on the current filter
  const filteredGoals = () => {
    if (currentFilter === "todo") {
      return allGoals.filter((goal) => !goal.completed);
    } else if (currentFilter === "completed") {
      return allGoals.filter((goal) => goal.completed);
    } else {
      return allGoals;
    }
  };

  const todoCount = allGoals.filter((goal) => !goal.completed).length;
  const completedCount = allGoals.filter((goal) => goal.completed).length;

  const Item = ({ item }) => (
   
      <TouchableOpacity onPress={() => setGoal(item)} style={[styles.goalContainer, item.completed ? styles.completedGoal : null]}
      >
        <Text style={styles.goalText}>{item.title.toUpperCase()}</Text>
      </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Goals</Text>
        <View style={styles.statContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statText}>ToDo</Text>
            <Text style={styles.statText}>{todoCount}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statText}>Completed</Text>
            <Text style={styles.statText}>{completedCount}</Text>
          </View>
        </View>
      </View>

      {/* Filter buttons */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setCurrentFilter("all")}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setCurrentFilter("todo")}
        >
          <Text style={styles.filterButtonText}>Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setCurrentFilter("completed")}
        >
          <Text style={styles.filterButtonText}>Completed</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, width: "80%", paddingVertical: 8 }}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <FlatList
            data={filteredGoals()}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

      <TouchableOpacity style={styles.addGoalButton} onPress={() => setCreateModalVisible(true)}>
        <FontAwesomeIcon icon="plus" size={32} color="#333533" />
      </TouchableOpacity>
      <GoalCreateModal open={createModalVisible} setOpen={setCreateModalVisible} />
      <GoalModal open={goalModalVisible} setOpen={setGoalModalVisible} goal={goal} />
    </View>
  );
};

export default GoalsHomeScreen;
