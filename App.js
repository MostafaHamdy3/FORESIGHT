import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux"

import Login from "./screens/Login";
import { Colors } from "./constants/config";
import Manager from "./screens/Manager";
import ManageUser from "./components/manager/ManageUser";
import UserDetails from "./components/manager/UserDetails";
import { configureStore } from "./store/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={configureStore()}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="Foresight"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Manager"
            component={Manager}
            // options={{ headerShown: false }}
          />
          <Stack.Screen name="ManageUser" component={ManageUser} />
          <Stack.Screen name="UserDetails" component={UserDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
