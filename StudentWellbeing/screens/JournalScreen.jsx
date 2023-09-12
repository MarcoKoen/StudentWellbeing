import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import JournalEntry from "../components/journalModal"
import { collection, orderBy, query, getDocs } from "firebase/firestore";

import database from "../config/firebase";

const styles = StyleSheet.create({
    entries: {
      backgroundColor: "#333533",
      padding: 8,
      width: "47%", // Adjust the width as needed for a 2-column grid
      borderRadius: 8,
      marginVertical: 8,
      marginRight: 22,
      height: 110,
      overflow: "hidden",
      alignItems: "center",
    },
    heading: {
      fontWeight: "bold",
      color: "#CFDBD5",
      fontSize: 20,
    },
    content:{
        color: "#CFDBD5",
    },
    button: {
        backgroundColor: "#333533",
        borderRadius: 8,
        marginVertical: 8,
        height: 35,
      },
    buttonText: {
        textAlign: "center",
        color: "#CFDBD5",
        fontSize: 24,
        fontWeight: "bold",
    },
    pageStyle: {
        padding: 16,
    }
  });

const Journal = () => {

  const [createJournalVisible, setCreateJournalVisible] = useState(false);
  const [journalEntries, setJournalEntries] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchJournalData = async () => {
      try{
        const q = query(collection(database, "journal"), orderBy("createdAt", "desc"));
        const collectionRef = await getDocs(q);
        const fetchedData = collectionRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setJournalEntries(fetchedData);
        setLoading(false);
        return () => unsubscribe();
        }catch (err) {
          console.log(err);
        }
      };
        fetchJournalData();
      }, [,createJournalVisible]);
      

    // //when a goal is selected, set the goal state to that goal and open the modal, 
    // //check if the goal state is empty to avoid initial render
    // useEffect(() => {
    //   const journalModal = async () => {
    //   Object.keys(goal).length > 0 ? setGoalModalVisible(true) : setGoalModalVisible(false);
    //   };
    //   goalModal();
    // }, [goal]);


    // Use map to create an array of JSX elements
    const Item = ({ item }) => {
      const handleItemPress = (itemId) => {
        setCreateJournalVisible(true);
        setIsEditing(true);
        console.log(itemId); // Log item.id here
      };
    
      return (
        <View style={styles.entries}>
          <TouchableOpacity onPress={() => handleItemPress(item.id)}>
            <JournalEntry open={createJournalVisible} setOpen={setCreateJournalVisible} itemId={item.id} />
            <Text style={styles.heading}>{item.title}</Text>
            <Text style={styles.content} ellipsizeMode='tail' numberOfLines={4}>{item.description}</Text>
          </TouchableOpacity>
        </View>
      );
    };
    

return (
    <>
    
    <View style={styles.pageStyle}>
    <TouchableOpacity style={[styles.button]}>
        <JournalEntry open={createJournalVisible} setOpen={setCreateJournalVisible}/>
        <Text style={styles.buttonText} onPress={()=>setCreateJournalVisible(true)}>New Entry</Text>
    </TouchableOpacity>

    <ScrollView >
      <View>
        <FlatList
        data={journalEntries}
        renderItem={({item}) => <Item item={item}/> }
        keyExtractor={(item) => item.id}
        numColumns={2}
        />
    </View>
    </ScrollView>
    </View>
    
    </>
);

}

export default Journal;