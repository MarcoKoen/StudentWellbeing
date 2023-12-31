/**
 * Journal 
 * 
 * Description:
 * This screen serves as the main screen for managing journal entries. It allows users to view, create, and edit
 * journal entries. The entries are displayed in a two-column grid, and each entry includes a title and a truncated
 * description.
 * 
 * @returns {JSX.Element} - Rendered component structure.
 */

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
  

   // Fetch journal entries from Firebase on component mount and when modals are closed
    useEffect(() => {
    const fetchJournalData = async () => {
      try{
        const q = query(collection(database, "journal"), orderBy("createdAt", "desc"));
        const collectionRef = await getDocs(q);
        const fetchedData = collectionRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setJournalEntries(fetchedData);
        setLoading(false)
        return () => unsubscribe();
        }catch (err) {
          console.log(err);
        }
      };
        fetchJournalData();
      }, [,createJournalVisible, editJournalVisible]);


    // Use map to create an array of JSX elements for each journal entry
    const Item = ({ item }) => {
      const handleItemPress = (itemId) => {
        setJournal({item})
        
      };
    
      return (
        <View style={styles.entries}>
          {/* Display the JournalUpdate modal if in editing mode */}
          {editJournalVisible ? <JournalUpdate open={editJournalVisible} setOpen={setEditJournalVisible} item={journal}/> : null}
          <TouchableOpacity onPress={() => {handleItemPress(item.id), setEditJournalVisible(true)}}>
            <Text style={styles.heading}>{item.title}</Text>
            <Text style={styles.content} ellipsizeMode='tail' numberOfLines={4}>{item.description}</Text>
          </TouchableOpacity>
        </View>
      );
      
    };
    

    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemPress = (item) => {
      setSelectedItem(item);
      setEditJournalVisible(true);
    };
  
    return (
      <View style={styles.pageStyle}>
        {/* Render the "New Entry" button with the JournalEntry modal */}
        {loading ? (
          <Text>Loading....</Text>
        ) : (
          <>
            <TouchableOpacity style={styles.button}>
              <JournalEntry open={createJournalVisible} setOpen={setCreateJournalVisible} />
              <Text style={styles.buttonText} onPress={() => setCreateJournalVisible(true)}>
                New Entry
              </Text>
            </TouchableOpacity>
            {/* Display the JournalUpdate modal if an item is selected */}
            {selectedItem && (
              <JournalUpdate open={editJournalVisible} setOpen={setEditJournalVisible} item={selectedItem} />
            )}
            {/* FlatList to display the list of journal entries in a two-column grid */}
            <FlatList
              data={journalEntries}
              renderItem={({ item }) => (
                <Item item={item} onPress={() => handleItemPress(item)} />
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
            />
          </>
        )}
      </View>
    );
  };

export default Journal;