import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet, FlatList } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import database from "../config/firebase";

import ModaParent from "../components/modalParent";

const DailyCheckIn = (props) => {
  const questions = props.questions;

  const [ratings, setRatings] = useState(
    questions.map((item) => ({ category: item.category, rating: 0 }))
  );

  const handleRatingPress = (selectedRating, category) => {
    const questionIndex = ratings.findIndex((item) => item.category === category);

    if (questionIndex !== -1) {
      const updatedRatings = [...ratings];
      updatedRatings[questionIndex].rating = selectedRating;

      setRatings(updatedRatings);
    }
  };

  const subitResponses = async () => {
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

  const Item = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity>
        <Text>{item.question}</Text>
        <View style={styles.ratingContainer}>
          {/* chatGPT assisted */}
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

  return (
    <ModaParent open={props.open} setOpen={props.setOpen}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Daily Check-In</Text>
        <Text>The higher the better</Text>
      </View>

      <FlatList
        data={questions}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.category}
        style={styles.goalList}
      />

      <View style={styles.buttonParent}>
        <TouchableOpacity style={styles.button} onPress={() => subitResponses()}>
          <View>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ModaParent>
  );
};

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
