import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import GoalsHomeScreen from "./screens/GoalsHomeScreen";
import JournalScreen from "./screens/JournalScreen";
import ResourcesScreen from "./screens/ResourcesScreen";
import DailyScreen from "./screens/DailyScreen";
import SomeoneElseScreen from "./screens/SomeoneElseScreen";
import UrgentScreen from "./screens/UrgentScreen";

const Stack = createNativeStackNavigator();

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquareCheck, faCheck, faCheckCircle, faPlus, faGear, faBell, faBook, faX, faLink, faCircleExclamation, faPhone } from '@fortawesome/free-solid-svg-icons'

library.add(faSquareCheck, faCheck, faCheckCircle, faPlus, faGear, faBell, faBook, faX, faLink, faCircleExclamation, faPhone)

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Goals" component={GoalsHomeScreen}/>
        <Stack.Screen name="Journal" component={JournalScreen}/>
        <Stack.Screen name="Resources" component={ResourcesScreen}/>
        <Stack.Screen name="DailyCheckIn" component={DailyScreen}/>
        <Stack.Screen name="ConcernedForSomeone" component={SomeoneElseScreen}/>
        <Stack.Screen name="Urgent" component={UrgentScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;