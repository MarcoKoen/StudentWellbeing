/*
  File: DailyCheckIn.jsx
  Description: This file defines the DailyCheckIn component, which allows users to perform a daily check-in by answering a set of questions.
*/

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import database from "../config/firebase";
import ModalParent from "../components/ModalParent";

/*
  DailyCheckIn component
  @props:
    - questions: Array of questions for the daily check-in
    - open: Boolean indicating whether the modal is open
    - setOpen: Function to toggle the modal's open state
*/
const DailyCheckIn = (props) => {
  // State to manage user ratings for each question
  const [ratings, setRatings] = useState(
    props.questions.map((item) => ({ category: item.category, rating: 0 }))
  );

  // Function to handle user's rating selection
  const handleRatingPress = (selectedRating, category) => {
    const questionIndex = ratings.findIndex((item) => item.category === category);

    if (questionIndex !== -1) {
      const updatedRatings = [...ratings];
      updatedRatings[questionIndex].rating = selectedRating;

      setRatings(updatedRatings);
    }
  };

  // Function to submit user responses to Firebase
  const submitResponses = async () => {
    try {
      await addDoc(collection(database, "dailyCheckIn"), {
        createdAt: new Date(),
        ratings: ratings,
      });
      props.setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  // Item component for rendering each question in the FlatList
  const Item = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity>
        <Text>{item.question}</Text>
        <View style={styles.ratingContainer}>
          {/* Render star ratings for each question */}
          {[0, 1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.star,
                value <= ratings.find((rating) => rating.category === item.category).rating
                  ? styles.selectedStar
                  : null,
              ]}
              onPress={() => handleRatingPress(value, item.category)}
            >
              <Text>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </View>
  );

  // Render the DailyCheckIn component
  return (
    <ModalParent open={props.open} setOpen={props.setOpen}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Daily Check-In</Text>
        <Text>The higher the better</Text>
      </View>

      {/* Render the list of questions with star ratings */}
      <FlatList
        data={props.questions}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.category}
        style={styles.goalList}
      />

      {/* Submit button at the bottom of the modal */}
      <View style={styles.buttonParent}>
        <TouchableOpacity style={styles.button} onPress={() => submitResponses()}>
          <View>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ModalParent>
  );
};

// Styles for the DailyCheckIn component
const styles = StyleSheet.create({
  buttonParent: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  ratingContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  itemContainer: {
    marginVertical: 2,
    marginHorizontal: 16,
  },
  star: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
  },
  selectedStar: {
    backgroundColor: "gold",
  },
  button: {
    backgroundColor: "#333533",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 16,
    overflow: "hidden",
    padding: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "#CFDBD5",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default DailyCheckIn;
