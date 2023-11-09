import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import ModalParent from "../components/modalParent";

/**
 * ViewRatingsModal Component
 * 
 * Description:
 * This component displays a modal with daily check-in ratings, showing questions, and corresponding ratings.
 * It utilises the ModalParent component to maintain a consistent modal layout.
 * 
 * Props:
 * - open: Boolean indicating whether the modal is open
 * - setOpen: Function to toggle the modal's open state
 * - questions: Array of questions for which ratings are displayed
 * - ratings: Array of rating data
 * - date: Date object representing the date of the ratings
 */
const ViewRatingsModal = (props) => {
  const { questions, ratings, date } = props;

  /**
   * Item Component
   * 
   * Description:
   * This component renders each item (question) in the FlatList.
   * It displays the question and a set of star ratings based on the user's response.
   * 
   * @param {Object} item - The item (question) to be rendered
   */
  const Item = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text>{item.question}</Text>

        <Text style={styles.ratingText}>
          <View style={styles.ratingContainer}>
            {[0, 1, 2, 3, 4, 5].map((value) => (
              <TouchableOpacity key={value} style={[styles.star, value <= ratings.find((rating) => rating.category === item.category).rating ? styles.selectedStar : null]}>
                <Text>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Text>
      </View>
    </View>
  );

  return (
    <ModalParent open={props.open} setOpen={props.setOpen}>
      <View style={styles.modalContent}>
        <Text>Daily Check-In Ratings</Text>
        {date && <Text>{date.toDate().toDateString()}</Text>}
      </View>
      <FlatList data={questions} renderItem={({ item }) => <Item item={item} />} keyExtractor={(item) => item.category} style={styles.goalList} />
    </ModalParent>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
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
  ratingText: {
    fontSize: 18,
  },
});

export default ViewRatingsModal;
