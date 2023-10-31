import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from "react-native"; // Import TouchableOpacity for the FontAwesomeIcon
import Slider from "@react-native-community/slider";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { collection, orderBy, query, getDocs } from "firebase/firestore";

import database from "../config/firebase";

import DailyCheckIn from "../components/dailyCheckIn";

const DailyScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [prevResponses, setPrevResponses] = useState([]);
  
  const questions = [
    {
      question: "How is your spiritual health?",
      category: "spiritual",
    },
    {
      question: "How is your mental health?",
      category: "mental",
    },
    {
      question: "How is your physical health?",
      category: "physical",
    },
    {
      question: "How is your family and social wellbeing?",
      category: "family",
    },
    {
      question: "How is your land and roots feeling?",
      category: "land",
    },
  ];
  

  const toggleModal = () => {
    setOpenModal(!openModal); // Toggle the modal state
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(database, "dailyCheckIn"), orderBy("createdAt"));
        const collectionRef = await getDocs(q);
        const fetchedData = collectionRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPrevResponses(fetchedData);
        setLoading(false);
        console.log(fetchedData);
        return () => unsubscribe(); // Detach listener
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  const Item = ({ item }) => (
    <View style={styles.indivualGoal}>
      <TouchableOpacity style={styles.indivualGoal} >
        {/* <Text style={styles.indivualGoalText}>{item}</Text> */}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flexGrow: 1 ,backgroundColor: "#E8EDDF"}}>
    
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <View >
          <Text style={styles.buttonText}>Check In Today</Text>
        </View>
      </TouchableOpacity>

      {/* if loading is true, display loading text, else display the flatlist */}
    <View style={{width:"100%", height: "60%", overflow:"scroll", display:'flex', justifyContent:"center", alignItems:"center", padding:"2 0"}}>
    {loading ? <Text>Loading...</Text> : <FlatList
        data={prevResponses}
        renderItem={({ item }) => <Item item={item}/>}
        keyExtractor={(item) => item.id}
      
      />}
      </View>



      <DailyCheckIn open={openModal} setOpen={toggleModal} questions={questions}/>

    </View>
  );
};

const styles = StyleSheet.create({
  button:{
    backgroundColor: "#333533",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: "hidden",
    padding: 16,
  },
  buttonText: {
    textAlign: "center",
    color: "#CFDBD5",
    fontSize: 24,
    fontWeight: "bold",
  },

});

export default DailyScreen;
