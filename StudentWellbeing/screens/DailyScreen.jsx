import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native"; // Import TouchableOpacity for the FontAwesomeIcon
import Slider from "@react-native-community/slider";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import ModaParent from "../components/modalParent";

const DailyScreen = () => {
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal); // Toggle the modal state
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={toggleModal}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Daily Check-In</Text>
          <FontAwesomeIcon icon="plus" />
        </View>
      </TouchableOpacity>

      <ModaParent open={openModal} setOpen={toggleModal}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Daily Check-In</Text>
          <Text>How are you feeling today?</Text>
          <Text>{value}</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onValueChange={(newValue) => setValue(newValue)}
          />
        </View>
      </ModaParent>
    </View>
  );
};

export default DailyScreen;
