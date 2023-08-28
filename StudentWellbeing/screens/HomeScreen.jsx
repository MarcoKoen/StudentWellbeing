import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

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
    height: "25%",
  },
  buttonGrid: {
    width: "48%", // Adjust the width as needed for 2 columns
    aspectRatio: 1,
  },
  button: {
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    textAlign: "center",
  },
});

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.buttonMainParent}>
        <TouchableOpacity style={[styles.buttonMain, styles.button]}>
          <Text style={styles.buttonText}>Daily Check-In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonMain, styles.button]}>
          <Text style={styles.buttonText}>Concerned for someone else</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={[styles.buttonGrid, styles.button]}>
          <Text style={styles.buttonText}>Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonGrid, styles.button]}>
          <Text style={styles.buttonText}>Daily Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonGrid, styles.button]}>
          <Text style={styles.buttonText}>Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonGrid, styles.button]}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
