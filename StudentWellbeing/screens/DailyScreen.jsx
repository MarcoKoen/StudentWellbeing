import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { collection, orderBy, query, getDocs } from "firebase/firestore";
import database from "../config/firebase";
import DailyCheckIn from "../components/dailyCheckIn";

const DailyScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [prevResponses, setPrevResponses] = useState([]);
  const [buttonText, setButtonText] = useState("Check In Today");
  const [disabled, setDisabled] = useState(false);
  const [averages, setAverages] = useState({});
  const [lowest, setLowest] = useState({});
  const [highest, setHighest] = useState({});

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
    setOpenModal(!openModal);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(database, "dailyCheckIn"), orderBy("createdAt"));
        const collectionRef = await getDocs(q);
        const fetchedData = collectionRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPrevResponses(fetchedData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [openModal]);

  useEffect(() => {
    const checkDate = () => {
      if (prevResponses.length > 0) {
        if (prevResponses[0].createdAt.toDate().toDateString() === new Date().toDateString()) {
          setDisabled(true);
          setButtonText("Already Checked In Today");
        } else {
          setDisabled(false);
        }
      }
    };
    checkDate();
  }, [prevResponses]);

  useEffect(() => {
    if (prevResponses.length > 0) {
      const categorySums = {};
      const categoryLowest = {};
      const categoryHighest = {};

      //help from chatGPT
      for (const category of questions.map((q) => q.category)) {
        const categoryResponses = prevResponses.map((response) => {
          const categoryRating = response.ratings.find((rating) => rating.category === category);
          return categoryRating ? categoryRating.rating : 0;
        });

        const categorySum = categoryResponses.reduce((acc, value) => acc + value, 0);
        const categoryAverage = categoryResponses.length > 0 ? categorySum / categoryResponses.length : 0;
        const categoryMin = Math.min(...categoryResponses);
        const categoryMax = Math.max(...categoryResponses);

        categorySums[category] = categoryAverage;
        categoryLowest[category] = categoryMin;
        categoryHighest[category] = categoryMax;
      }

      setAverages(categorySums);
      setLowest(categoryLowest);
      setHighest(categoryHighest);
    }
  }, [prevResponses]);

  const Item = ({ item }) => (
    <TouchableOpacity style={styles.dateItem} onPress={() => handleDatePress(item)}>
      <Text style={styles.dateText}>{item.createdAt.toDate().toDateString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flexGrow: 1, backgroundColor: "#E8EDDF" }}>
      <TouchableOpacity style={styles.button} disabled={disabled} onPress={toggleModal}>
        <View>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </View>
      </TouchableOpacity>

      <View style={{ width: "100%", height: "50%", overflow: "scroll", display: "flex", justifyContent: "center", alignItems: "center", padding: "20" }}>
        {loading ? <Text>Loading...</Text> : <FlatList data={prevResponses} renderItem={({ item }) => <Item item={item} />} keyExtractor={(item) => item.id} />}
      </View>

      {/* Display category data */}
      <View style={styles.dataContainer}>
        <ScrollView horizontal={true}>
          <View style={styles.categoryContent}>
            <Text style={styles.categoryHeader}>Category Averages</Text>
            {questions.map((q) => (
              <Text key={q.category}>
                {q.category}: {averages[q.category] || 0}
              </Text>
            ))}
          </View>
          <View style={styles.categoryContent}>
            <Text style={styles.categoryHeader}>Category Lowest</Text>
            {questions.map((q) => (
              <Text key={q.category}>
                {q.category}: {lowest[q.category] || 0}
              </Text>
            ))}
          </View>
          <View style={styles.categoryContent}>
            <Text style={styles.categoryHeader}>Category Highest</Text>
            {questions.map((q) => (
              <Text key={q.category}>
                {q.category}: {highest[q.category] || 0}
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>

      <DailyCheckIn open={openModal} setOpen={toggleModal} questions={questions} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#333533",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: "hidden",
    padding: 16,
  },
  dateItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dateText: {
    fontSize: 18,
  },
  dataContainer: {
    margin: 20,
  },
  scrollViewContent: {
    flexDirection: "row",
  },
  categoryContent: {
    marginRight: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryText: {
    fontSize: 16,
  },

  categoryHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonText: {
    textAlign: "center",
    color: "#CFDBD5",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default DailyScreen;
