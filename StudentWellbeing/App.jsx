import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import GoalsHomeScreen from "./screens/GoalsHomeScreen";

const Stack = createNativeStackNavigator();

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquareCheck, faCheck, faCheckCircle, faPlus, faGear, faBell, faBook, faX } from '@fortawesome/free-solid-svg-icons'

library.add(faSquareCheck, faCheck, faCheckCircle, faPlus, faGear, faBell, faBook, faX)

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Goals" component={GoalsHomeScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;