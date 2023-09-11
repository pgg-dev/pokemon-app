import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PockmonList from "./pages/pockmonList";
import PockmonDetail from "./pages/pockmonDetail";
import { TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Todos from "./pages/Todos";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={PockmonDetail}
          options={({ route }: any) => ({
            title: route.params.item.names.find(
              (name) => name.language.name === "ko"
            ).name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={PockmonList}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Entypo name="home" size={24} />,
        }}
      />
      <Tab.Screen
        name="Todo"
        component={Todos}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <AntDesign name="form" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};
