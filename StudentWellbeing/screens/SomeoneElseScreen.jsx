import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput, Button, ScrollView} from "react-native";
import React, { useState, useEffect } from "react";



const SomeoneElseScreen = (props) => {

    const data = [
    {description: "Are you concerned about the wellbeing of someone you know or who is near to you?", left: "Unsure", leftPosition: 2, rightPosition: 1,  right: "Yes"}, 
    {description: "Is anyone involved at risk of being hurt, by themself or by someone else?", leftPosition: 4 ,left: "No", rightPosition: 3, right: "Yes"}, 
    {description:"What are you noticing that is worrying you? In the person \n-Tense/irritable/distressed? \n-Sad/Tearful/Down? \n-Panicky/Anxious? \n-Lonely/Withdrawn \n-Smelling of a substance \n-Changing in personality? \n-Changing in weight or health status? \n-Dropping in punctuality, attendance or academic results?", rightPosition: 4, right: "Yes", leftPosition: 4 , left: "No" },
    {description: "Stay Calm \nDo not put yourself in harm's way. If you can, find a staff member to help you. Do not stay in a situation where you are at risk.", rightPosition: 5, right: "Continue", leftPosition: 6, left: ""},
    {description: "The situation seems non urgent, but getting more advice from someone on staff would be a good idea - such as:\n-Lecturer/Tutor or Manager\n-Student Success (avaliable Mon-Fri, 9am-5pm for on campus and distance students\n03 479 3743\nHere students can access:\n-Wellbeing Advisor\n-Learning Advisors\n-Pasifika support\n-Disability/Accessibility Support\n-Student Support for international and domestic students\n-Careers Advisors\n-Budgeting Advice\n-Grief Support\n-Refugee student support\n-Chaplains\n-Health Promotion Navigator\n-Te Punaka Owheo Kaimahi\n-Counsellors\n\n-Student Health 03 4796082\n-OPSA 034776974 \n-Te Pa Tauira (Student Village)\nVillage manager 021735536", left: "", leftPosition: 2, rightPosition: 7,  right: "Continue"},
    {description: "If you can't find a staff member to help you, consider:\nIs the person suicidal, intoxicated, or speaking/acting in a way that is really worrying you:\n- Call Student Success \n03 479 3743\n - Call Campus Watch \n0800 479 5000\n - Call Emergency Psychiatric Services(ESP) on 03 474 0999 (ask for EPS)\n - Dial 111 and ask for emergency services to help.", left: "", leftPosition: 2, rightPosition: 6,  right: "Continue"},
    {description: "Sometimes asking for help is the hardest part. If you feel comfortable doing so, you could offer to go with the person to book an appointment, and could even offer to help them get to the appointment.", left: "", leftPosition: 2, rightPosition: 7,  right: "Continue"},
    {description: "If the person will not book an appointment to get extra support:\n- Stay calm - they might just need a bit of time to consider the idea.\n- Let the person know that the offer to help them book and attend an appointment is open and they can change their mind.\n- You can approach Student Success yourself to get advice on what to do next.\nThis is NOT something you should have to carry and worry about on your own.\nThere are people whos job it is to help", left: "", leftPosition: 2, rightPosition: 8,  right: "Continue"},
    {description: "External Services in Dunedin:\nEmergency Pyschiatric Services\n03 474 0999 (ask for EPS)\n\nUrgent Doctors (Costs Apply)\n18 Filleul St, 03 479 2900\n\n OCASA - Otago Community Against Sexual Abuse (formerly Rape Crisis)\n03 474 1592", left: "", leftPosition: 2, rightPosition: 9,  right: "Continue"},
    {description: "External Services:\n\nNew Zealand Wide:\nYouthline - 24/7 help for those under 25\n0800 376 633 or free text 234\nHealthline - 24/7 health advice\n0800 611 116\n\nOUTline - Sexuality or gender identity helpline\n0800 688 5463(0800 OUTLINE)\n\nNeed to Talk - 24/7 counselling for all ages - Free text 1737", left: "", leftPosition: 2, rightPosition: 1,  right: "Home"}
]
    const [description, setDescription] = useState(data[0].description);
    const [leftButtonText, setLeftButtonText] = useState(data[0].left);
    const [rightButtonText, setRightButtonText] = useState(data[0].right);
    const [leftPosition, setLeftPosition] = useState(data[0].leftPosition);
    const [rightPosition, setRightPosition] = useState(data[0].rightPosition);


    const updateData = (position) => {
        setDescription(data[position].description)
        setLeftButtonText(data[position].left)
        setRightButtonText(data[position].right)
        setLeftPosition(data[position].leftPosition)
        setRightPosition(data[position].rightPosition)
    }

    return (
    <ScrollView>
    <View style={styles.screen}>
        <Text style={styles.text}>{description}</Text>
        <View style={styles.grid}>
        {rightButtonText == "Continue" ?  
        <TouchableOpacity onPress={() => updateData(rightPosition)} style={styles.button}>
            <Text style={styles.buttonText}>{rightButtonText}</Text>
        </TouchableOpacity> 
        :
        rightButtonText == "Home" ? <TouchableOpacity onPress={() => props.navigation.navigate("Home")} style={styles.button}>
        <Text style={styles.buttonText}>{rightButtonText}</Text>
        </TouchableOpacity>  
        :  <>
        <TouchableOpacity onPress={() => updateData(leftPosition)} style={styles.button}>
             <Text style={styles.buttonText}>{leftButtonText}</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => updateData(rightPosition)} style={styles.button}>
             <Text style={styles.buttonText}>{rightButtonText}</Text>
         </TouchableOpacity></> }
        </View>
    </View>
    </ScrollView>
    ) 
}

const styles = StyleSheet.create({
    text: {
        width: "80%",
        backgroundColor: "#333533",
        borderRadius: 10,
        textAlign: "center",
        fontWeight: "bold",
        left: 40,
        color: "#CFDBD5",
        padding: 20,
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
    singleButton:{

    }
})

export default SomeoneElseScreen;