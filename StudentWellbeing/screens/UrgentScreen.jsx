import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput, Button, ScrollView} from "react-native";
import call from 'react-native-phone-call'
import {Linking} from 'react-native'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const UrgentScreen = () => {

    const args = {
        number: '0800762786', // String value with the number to call
        prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
        skipCanOpen: true // Skip the canOpenURL check
      }

      const triggerCall = () => {
        call(args).catch(console.error);
      }

    return (
    <>
    <View style={styles.screen}>
        <Text style={styles.text}>Student Success is open Monday to Friday 8:30 am - 5 pm</Text>
        <TouchableOpacity onPress= {()=> triggerCall()}>
        <FontAwesomeIcon icon="phone" size={30} style={styles.icon} />
        </TouchableOpacity> 

    </View>
    </>
    )
}

const styles = StyleSheet.create({
    text: {
        width: "80%",
        textAlign: "center",
        fontWeight: "bold",
        color: "black",
        fontSize: 20
    },
    screen: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "15%",
        alignItems: "center",
    },
    icon: {
        marginTop: "15%",
        display: "flex",
        color: "green",
        justifyContent: "center",
        alignItems: "center", // Center horizontally
    }
})

export default UrgentScreen;