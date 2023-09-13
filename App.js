import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./containers/home";
import { Shop } from "./containers/shop";
import { Profile } from "./containers/profile";
import * as Font from "expo-font";
import { Checkout } from "./containers/checkout";
import Toast from "react-native-toast-message";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { isUserLoggedIn } from "./actions";
import { Login } from "./containers/login";
import { Signup } from "./containers/signup";
import { Verify } from "./containers/verification";

const Stack = createNativeStackNavigator();
export default function App() {
  const [loaded, setLoaded] = useState(false);

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);

  useEffect(() => {
    Font.loadAsync({
      Montserrat: require("./assets/fonts/Montserrat-SemiBold.ttf"),
      "Montserrat-SemiBold": {
        uri: require("./assets/fonts/Montserrat-SemiBold.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {auth.authenticate ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Shop"
              component={Shop}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Account"
              component={Profile}
              options={{
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontFamily: loaded ? "Montserrat-SemiBold" : null,
                },
              }}
            />
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontFamily: loaded ? "Montserrat-SemiBold" : null,
                },
              }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Verify"
              component={Verify}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="Shop"
                component={Shop}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Account"
                component={Profile}
                options={{
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    fontFamily: loaded ? "Montserrat-SemiBold" : null,
                  },
                }}
              />
              <Stack.Screen
                name="Checkout"
                component={Checkout}
                options={{
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    fontFamily: loaded ? "Montserrat-SemiBold" : null,
                  },
                }}
              /> */}
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}
