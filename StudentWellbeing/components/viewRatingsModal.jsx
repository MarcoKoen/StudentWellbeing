import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import ModalParent from "../components/modalParent";

const ViewRatingsModal = (props) => {
  const { questions, ratings, date } = props;

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
  ratingText: {
    fontSize: 18,
  },
});

export default ViewRatingsModal;
