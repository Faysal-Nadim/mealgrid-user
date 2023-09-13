import React from "react";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth.action";
import { useNavigation } from "@react-navigation/native";

// import * as Google from "expo-google-app-auth";
// import { GoogleSignin, GoogleSigninButton } from "react-native-login-google";

/**
 * @author
 * @function Login
 **/
export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loaded, setLoaded] = useState(false);

  const navigation = useNavigation();

  const auth = useSelector((state) => state.auth);
  const verify = useSelector((state) => state.verify);

  useEffect(() => {
    Font.loadAsync({
      Montserrat: require("../../assets/fonts/Montserrat-Regular.ttf"),
      "Montserrat-SemiBold": {
        uri: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  // GoogleSignin.configure({
  //   webClientId:
  //     "665178446094-ci8tq3phvuv23bju5gij3q3imjuujopk.apps.googleusercontent.com",
  //   iosClientId:
  //     "665178446094-0t32o2ahfm396oss96jrs1391dnmrvb5.apps.googleusercontent.com",
  //   scopes: ["profile", "email"],
  // });

  // const googleLogin = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     // const userInfo = await GoogleSignin.signIn();
  //     // console.log(userInfo);
  //   } catch (error) {
  //     console.log(error);
  //     // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //     //   // user cancelled the login flow
  //     // } else if (error.code === statusCodes.IN_PROGRESS) {
  //     //   // operation (e.g. sign in) is in progress already
  //     // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //     //   // play services not available or outdated
  //     // } else {
  //     //   // some other error happened
  //     // }
  //   }
  // };

  useEffect(() => {
    if (auth.error !== null && auth.error.status === 403) {
      navigation.navigate("Verify", { email: email });
    }
  }, [auth.error]);

  const dispatch = useDispatch();

  const userlogin = () => {
    const user = {
      email: email,
      password: password,
    };
    dispatch(login(user));
  };

  const { container } = styles;
  return (
    <View style={container}>
      <View style={{ height: 200, justifyContent: "center" }}>
        <Image
          resizeMode="contain"
          source={require("../../assets/aleeha-tech.png")}
          style={{
            height: 100,
            width: 160,
            marginBottom: -50,
          }}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: loaded ? "Montserrat-SemiBold" : null,
          }}
        >
          Welcome To MealGrid
        </Text>
      </View>
      <View>
        <TextInput
          value={email}
          placeholder="Enter Email"
          onChangeText={setEmail}
          style={{
            fontFamily: loaded ? "Montserrat" : null,
            height: 40,
            width: 300,
            borderRadius: 5,
            margin: 12,
            padding: 10,
            backgroundColor: "#fff",
          }}
          keyboardType="email-address"
        />
      </View>
      <View>
        <TextInput
          value={password}
          placeholder="Enter Password"
          onChangeText={setPassword}
          style={{
            fontFamily: loaded ? "Montserrat" : null,
            height: 40,
            width: 300,
            borderRadius: 5,
            padding: 10,
            backgroundColor: "#fff",
          }}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={{ margin: 20 }} onPress={userlogin}>
        <View
          style={{
            width: 100,
            backgroundColor: "#1461AC",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: loaded ? "Montserrat-SemiBold" : null,
            }}
          >
            Login
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 1,
            width: "40%",
            backgroundColor: "#090909",
            opacity: 0.5,
          }}
        />
        <Text
          style={{
            fontFamily: loaded ? "Montserrat" : null,
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          Or
        </Text>
        <View
          style={{
            height: 1,
            width: "40%",
            backgroundColor: "#090909",
            opacity: 0.5,
          }}
        />
      </View>
      <TouchableOpacity
        style={{ flexDirection: "row", marginTop: 15 }}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text
          style={{ fontFamily: loaded ? "Montserrat" : null, fontSize: 15 }}
        >
          New User?
        </Text>
        <Text
          style={{
            fontFamily: loaded ? "Montserrat-SemiBold" : null,
            color: "#1461AC",
            fontSize: 15,
          }}
        >
          {" "}
          Create One
        </Text>
      </TouchableOpacity>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: loaded ? "Montserrat" : null,
          }}
        >
          Version 1.0.1 (Beta)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
});
