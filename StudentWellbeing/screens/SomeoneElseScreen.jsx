import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";



const SomeoneElseScreen = () => {

    const data = [{description: "Are you concerned about the wellbeing of someone you know or who is near to you?", left: "Unsure", leftPosition: 2, rightPosition: 1,  right: "Yes"}, {description: "Is anyone involved at risk of being hurt, by themself or by someone else?", leftPosition: 4 ,left: "No", rightPosition: 3, right: "Yes"}, {description:"What are you noticing that is worrying you? In the person \n-Tense/irritable/distressed? \n-Sad/Tearful/Down? \n-Panicky/Anxious? \n-Lonely/Withdrawn \n-Smelling of a substance \n-Changing in personality? \n-Changing in weight or health status? \n -Dropping in punctuality, attendance or academic results?", rightPosition: 3, right: "Yes", leftPosition: 4 , left: "No" },{description: "Stay Calm \nDo not put yourself in harm's way. If you can, find a staff member to help you. Do not stay in a situation where you are at risk.", rightPosition: 5, right: "Continue", leftPosition: 6, left: ""}]
    const [description, setDescription] = useState(data[0].description);
    const [leftButtonText, setLeftButtonText] = useState(data[0].left);
    const [rightButtonText, setRightButtonText] = useState(data[0].right);
    const [leftPosition, setLeftPosition] = useState(data[0].leftPosition);
    const [rightPosition, setRightPosition] = useState(data[0].rightPosition);


    const updateData = (position) => {
        console.log(data[position])
        setDescription(data[position].description)
        setLeftButtonText(data[position].left)
        setRightButtonText(data[position].right)
        setLeftPosition(data[position].leftPosition)
        setRightPosition(data[position].rightPosition)
    }

    return (
    <View>
        <Text style={styles.text}>{description}</Text>
        <Button onPress={() => updateData(leftPosition)} title={leftButtonText}></Button>
        <Button onPress={() => updateData(rightPosition)} title={rightButtonText}></Button>
    </View>
    ) 
}

const styles = StyleSheet.create({
    text: {
        width: "80%",
        height: "70%",
        backgroundColor: "gray",
        borderRadius: 10,
        textAlign: "center",
        fontWeight: "bold",
        left: 40,
        padding: 20
    }
})

export default SomeoneElseScreen;