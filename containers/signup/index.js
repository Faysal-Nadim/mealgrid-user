import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Font from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions";
import { useNavigation } from "@react-navigation/native";

/**
 * @author
 * @function Signup
 **/

const Width = Dimensions.get("window").width;

export const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.error === null && auth.user.status === 201) {
      navigation.navigate("Verify", { email: email });
    }
  }, [auth.user]);

  useEffect(() => {
    Font.loadAsync({
      Montserrat: require("../../assets/fonts/Montserrat-Regular.ttf"),
      "Montserrat-SemiBold": {
        uri: require("../../assets/fonts/Montserrat-Regular.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "Montserrat-Medium": {
        uri: require("../../assets/fonts/Montserrat-Medium.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "Montserrat-SemiBold": {
        uri: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  const handleSignup = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
      gender: gender,
    };
    console.log(data);
    dispatch(signup(data));
  };

  const { container } = styles;
  return (
    <View style={container}>
      <View
        style={{
          marginTop: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          //   resizeMode="contain"
          source={require("../../assets/splash.png")}
          style={{
            height: 100,
            width: 200,
            // marginBottom: -50,
          }}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: loaded ? "Montserrat-SemiBold" : null,
            margin: 5,
          }}
        >
          Provide Following Information
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          value={firstName}
          placeholder="Enter First Name"
          onChangeText={setFirstName}
          style={{
            fontFamily: loaded ? "Montserrat" : null,
            height: 40,
            width: Width / 2.3,
            borderRadius: 5,
            margin: 5,
            padding: 10,
            backgroundColor: "#fff",
          }}
        />
        <TextInput
          value={lastName}
          placeholder="Enter Last Name"
          onChangeText={setLastName}
          style={{
            fontFamily: loaded ? "Montserrat" : null,
            height: 40,
            width: Width / 2.3,
            borderRadius: 5,
            margin: 5,
            padding: 10,
            backgroundColor: "#fff",
          }}
        />
      </View>
      <View>
        <TextInput
          value={email}
          placeholder="Enter Valid Email"
          onChangeText={setEmail}
          style={{
            fontFamily: loaded ? "Montserrat" : null,
            height: 40,
            width: (Width / 2.3) * 2 + 10,
            borderRadius: 5,
            margin: 5,
            padding: 10,
            backgroundColor: "#fff",
          }}
          keyboardType="email-address"
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          value={phone}
          placeholder="Enter Phone"
          onChangeText={setPhone}
          style={{
            fontFamily: loaded ? "Montserrat" : null,
            height: 40,
            width: Width / 2.3,
            borderRadius: 5,
            margin: 5,
            padding: 10,
            backgroundColor: "#fff",
          }}
          keyboardType="numeric"
        />
        <View
          style={{
            height: 40,
            width: Width / 2.3,
            backgroundColor: "#fff",
            justifyContent: "center",
            margin: 5,
            borderRadius: 5,
            padding: 10,
          }}
        >
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>
      </View>
      <View>
        <TextInput
          value={password}
          placeholder="Enter a Strong Password"
          onChangeText={setPassword}
          style={{
            fontFamily: loaded ? "Montserrat" : null,
            height: 40,
            width: (Width / 2.3) * 2 + 10,
            borderRadius: 5,
            margin: 5,
            padding: 10,
            backgroundColor: "#fff",
          }}
          secureTextEntry={true}
          clearButtonMode="always"
        />
      </View>
      <TouchableOpacity style={{ margin: 20 }} onPress={() => handleSignup()}>
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
            Sign Up
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: loaded ? "Montserrat" : null,
          }}
        >
          Version 1.0.1 (Beta)
        </Text>
        <Text
          style={{
            fontFamily: loaded ? "Montserrat-Medium" : null,
          }}
        >
          Powered By Aleeha Technologies LTD.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
