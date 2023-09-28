import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import JournalEntry from "../components/journalModal";
import JournalUpdate from "../components/journalUpdateModal";
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
  const [editJournalVisible, setEditJournalVisible] = useState(false);
  const [journal, setJournal] = useState({});
  

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


    // Use map to create an array of JSX elements
    const Item = ({ item }) => {
      const handleItemPress = (itemId) => {
        setEditJournalVisible(true);
        setJournal({item})
      };
    
      return (
        <View style={styles.entries}>
          <TouchableOpacity onPress={() => handleItemPress(item.id)}>
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
    <JournalUpdate open={editJournalVisible} setOpen={setEditJournalVisible} item={journal}/>
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