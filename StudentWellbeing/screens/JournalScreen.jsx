import { View, Text, StyleSheet, TouchableOpacity, Button, } from "react-native";
import React, { useState, useEffect } from "react";
import JournalEntry from "../components/journalModal"

const styles = StyleSheet.create({
    entries: {
      backgroundColor: "#333533",
      padding: 8,
      width: "47%", // Adjust the width as needed for a 2-column grid
      borderRadius: 8,
      marginVertical: 8,
      height: 110,
      overflow: "hidden",
      alignItems: "center",
      
    },
    gridContainer: {
      flexDirection: "row",
      flexWrap: "wrap", // This will create a new row when the width is exceeded
      justifyContent: "space-between", // Adjust as needed
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

  const [modalVisible, setModalVisible] = useState(false);

    const journalEntries = [
        {
          title: "First Entry",
          content:
            "Today, I woke up feeling energized and ready to take on the day. I had a healthy breakfast with a cup of freshly brewed coffee. As I started my work, I couldn't help but notice the beautiful sunrise outside my window. It's amazing how nature can inspire us in the simplest ways. Throughout the day, I accomplished several tasks and even had a productive meeting with my team. In the evening, I decided to go for a long walk in the park to clear my mind and enjoy the fresh air. It was a wonderful day overall."
        },
        {
          title: "Second Entry",
          content:
            "I've been reading a fascinating book lately that has opened my mind to new ideas and perspectives. The author's insights into the human condition are thought-provoking and have led me to reflect on my own life. Today, I spent some time jotting down my thoughts and reactions to the book. It's amazing how literature can expand our horizons and make us more empathetic. I also had a heartwarming conversation with an old friend I hadn't spoken to in years. It's moments like these that remind me of the importance of maintaining connections with loved ones."
        },
        {
          title: "Third Entry",
          content:
            "The weather today was quite unpredictable, with sudden rain showers followed by bursts of sunshine. Despite the weather, I decided to try a new recipe for dinner. Cooking has always been a therapeutic activity for me, and experimenting with flavors is a delightful experience. The meal turned out to be a delicious success, and I felt a sense of accomplishment. Later in the evening, I spent some time practicing mindfulness meditation to unwind and center myself. It's essential to find moments of inner peace in our busy lives."
        }
      ];
      

    // Use map to create an array of JSX elements
  const entryElements = journalEntries.map((entry, index) => (
    <View key={index} style={styles.entries}>
      <Text style={styles.heading}>{entry.title}</Text>
      <Text style= {styles.content} ellipsozeMode='tail' numberOfLines={4}>{entry.content}</Text>
    </View>
  ));

return (
    <>
    <View style={styles.pageStyle}>
    <TouchableOpacity style={[styles.button]}>
        <JournalEntry open={modalVisible} setOpen={setModalVisible}/>
        <Text style={styles.buttonText} onPress={()=>setModalVisible(true)}>New Entry</Text>
    </TouchableOpacity>
    <View style ={styles.gridContainer}>
        {entryElements}
    </View>
    </View>
    </>
);

}

export default Journal;