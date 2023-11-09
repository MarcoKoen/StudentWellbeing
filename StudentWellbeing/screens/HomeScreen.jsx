/**
 * HomeScreen 
 * 
 * Description:
 * This screen represents the main screen of the application, providing buttons for daily check-in, concerns, goals, journal, resources,
 * and settings. It also includes an urgent button that navigates to an urgent screen.
 * 
 * @param {object} props - React props passed to the component.
 * @returns {JSX.Element} - Rendered component structure.
 */

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  buttonMainParent: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
    justifyContent: "content", 
    alignItems: "center",
    width: "100%", 
  },
  buttonMain: {
    width: "100%",
    height: 100,
  },
  buttonGrid: {
    width: "48%", 
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
  urgentButton: {
    backgroundColor: "#333533",
    borderRadius: 16,
    overflow: "hidden",
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 4,
  }

});

const HomeScreen = (props) => {

  return (
    <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 ,backgroundColor: "#E8EDDF"}}>
      <View style={styles.buttonMainParent}>
        <TouchableOpacity  onPress={() =>
            props.navigation.navigate("DailyCheckIn")
          } style={[styles.buttonMain, styles.button]}>
          <Text style={styles.buttonText}>Daily Check-In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>
            props.navigation.navigate("ConcernedForSomeone")
          } style={[styles.buttonMain, styles.button]}>
          <Text style={styles.buttonText}>Concerned for someone else</Text>
        </TouchableOpacity>
      </View>
      
      {/* Grid of buttons for Goals, Journal, Resources, and Settings */}
      <View style={styles.container}>
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
        <TouchableOpacity onPress={() =>
            props.navigation.navigate("Resources")
          } style={[styles.buttonGrid, styles.button]}>
          <Text style={styles.buttonText}>Resources</Text>
          <FontAwesomeIcon icon="link" size={60} color="#F5CB5C" style={styles.icon} />
        </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonGrid, styles.button]}>
          <Text style={styles.buttonText}>Settings</Text>
          <FontAwesomeIcon icon="gear" size={60} color="#F5CB5C" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </ScrollView>

     {/* Urgent button for navigating to the Urgent screen */}
    <TouchableOpacity
        onPress={()=> (props.navigation.navigate("Urgent"))}
        style={styles.urgentButton}
      >
        <FontAwesomeIcon icon={"circle-exclamation"} size={40} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
