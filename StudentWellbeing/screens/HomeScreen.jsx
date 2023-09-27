import { text } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Adjust as needed
  },
  buttonMainParent: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
    justifyContent: "content", // Adjust as needed
    alignItems: "center",
    width: "100%", // Adjust the width as needed for 2 columns
  },
  buttonMain: {
    width: "100%", // Adjust the width as needed for 2 columns
    height: 100,
  },
  buttonGrid: {
    width: "48%", // Adjust the width as needed for 2 columns
    aspectRatio: 1,
  },
  button: {
    backgroundColor: "#333533",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 8,
    overflow: "hidden",
  },
  buttonText: {
    textAlign: "center",
    color: "#CFDBD5",
    fontSize: 24,
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    bottom: -8,
    right: -10,
    transform: [{ rotate: "25deg" }],
  },

});

const HomeScreen = (props) => {

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 ,backgroundColor: "#E8EDDF"}}>
   
      <View style={styles.buttonMainParent}>
        <TouchableOpacity  onPress={() =>
            props.navigation.navigate("DailyCheckIn")
          } style={[styles.buttonMain, styles.button]}>
          <Text style={styles.buttonText}>Daily Check-In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonMain, styles.button]}>
          <Text style={styles.buttonText}>Concerned for someone else</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.container}>
        <TouchableOpacity style={[styles.buttonGrid, styles.button]}>
          <Text style={styles.buttonText}>Reminders</Text>
          <FontAwesomeIcon icon="bell" size={60} color="#F5CB5C" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>
            props.navigation.navigate("Goals")
          } style={[styles.buttonGrid, styles.button]}>
          <Text style={styles.buttonText}>Goals</Text>
          <FontAwesomeIcon icon="square-check" size={60} color="#F5CB5C" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => 
            props.navigation.navigate("Journal")
          }style={[styles.buttonGrid, styles.button]}>
          <Text style={styles.buttonText}>Journal</Text>
          <FontAwesomeIcon icon="book" size={60} color="#F5CB5C" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonGrid, styles.button]}>
          <Text style={styles.buttonText}>Settings</Text>
          <FontAwesomeIcon icon="gear" size={60} color="#F5CB5C" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>
            props.navigation.navigate("Resources")
          } style={[styles.buttonGrid, styles.button]}>
          <Text style={styles.buttonText}>Resources</Text>
          <FontAwesomeIcon icon="link" size={60} color="#F5CB5C" style={styles.icon} />
        </TouchableOpacity>

      </View>
 
    </ScrollView>
  );
};

export default HomeScreen;
