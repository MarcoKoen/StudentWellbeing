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
        <FontAwesomeIcon icon="phone" size={30} color="green" style={styles.icon} />
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
        left: 40,
        color: "black",
        fontSize: 20
    },
    button: {
        backgroundColor: "#333533",
        padding: 5,
        marginTop: 10,
        borderRadius: 10,
        width: "30%",
    },
    buttonText: {
        color: "#CFDBD5",
        textAlign: "center",
        fontSize: 20
    },
    grid: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 10,
    }, 
    screen: {
        display: "flex",
        justifyContent: "center",
        marginTop: "15%",
    },
    icon: {
        display: "flex",
        justifyContent: "center"
    }
})

export default UrgentScreen;