import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { VerifyEmailScreen } from "../screens/auth/VerifyEmailScreen";
import { WelcomeScreen } from "../screens/auth/WelcomeScreen";
import { HomeScreen } from "../screens/main/HomeScreen";
import { OrdersScreen } from "../screens/main/OrdersScreen";
import ProfileScreen from "../screens/auth/ProfileScreen";
import { useAuth } from "../hooks/useAuth";
import { LoadingScreen } from "../screens/LoadingScreen";
import { CreateOrderScreen } from "../screens/main/CreateOrderScreen";
import { OrderDetailsScreen } from "../screens/main/OrderDetailsScreen";
import { RateRunnerScreen } from "../screens/main/RateRunnerScreen";

// Update types
type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  VerifyEmail: undefined;
};

type MainStackParamList = {
  MainTabs: undefined;
  CreateOrder: undefined;
  OrderDetails: { orderId: string };
  RateRunner: { orderId: string; runnerId: string };
};

type MainTabParamList = {
  Home: undefined;
  Orders: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Orders" component={OrdersScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const MainStackNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="MainTabs"
      component={MainTabs}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="CreateOrder"
      component={CreateOrderScreen}
      options={{ title: "Create New Order" }}
    />
    <MainStack.Screen
      name="OrderDetails"
      component={OrderDetailsScreen}
      options={{ title: "Order Details" }}
    />
    <MainStack.Screen
      name="RateRunner"
      component={RateRunnerScreen}
      options={{ title: "Rate Runner" }}
    />
  </MainStack.Navigator>
);

export const RootNavigation = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <MainStackNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};
