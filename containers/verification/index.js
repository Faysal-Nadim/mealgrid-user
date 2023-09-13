import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import * as Font from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { requestCode, verifyCode } from "../../actions";

/**
 * @author
 * @function Verify
 **/
export const Verify = ({ route }) => {
  const { container } = styles;

  const verify = useSelector((state) => state.verify);
  const auth = useSelector((state) => state.auth);

  const [code, setCode] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    Font.loadAsync({
      Montserrat: require("../../assets/fonts/Montserrat-Regular.ttf"),
      Montserrat: {
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

  useEffect(() => {
    const data = { email: route.params.email };
    dispatch(requestCode(data));
  }, []);

  useEffect(() => {
    if (verify.error === null && verify.verified === true) {
      navigation.navigate("Login");
    }
  }, [verify]);

  const verifyEmailCode = () => {
    const data = {
      code: Number(code),
      email: route.params.email,
    };
    dispatch(verifyCode(data));
  };

  return (
    <View style={container}>
      <View>
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
        <Text
          style={{
            fontFamily: loaded ? "Montserrat-SemiBold" : null,
            fontSize: 18,
          }}
        >
          Please Verify Your Email Address
        </Text>
      </View>
      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <Text
          style={{
            fontFamily: loaded ? "Montserrat" : null,
            textAlign: "center",
            fontSize: 15,
          }}
        >
          A Verification Code Has Been Sent To {route.params.email}
        </Text>
      </View>
      <OTPTextView handleTextChange={(text) => setCode(text)} inputCount={4} />

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <View>
          <Text
            style={{ fontFamily: loaded ? "Montserrat" : null, fontSize: 15 }}
          >
            Didn't Get Code?
          </Text>
        </View>
        <TouchableOpacity>
          <Text
            style={{
              fontFamily: loaded ? "Montserrat-SemiBold" : null,
              color: "#1461AC",
              fontSize: 15,
            }}
          >
            {" "}
            Resend
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ margin: 20 }} onPress={verifyEmailCode}>
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
            Verify
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
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
