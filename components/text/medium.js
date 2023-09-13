import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";

/**
 * @author
 * @function MediumView
 **/
export const MediumView = (props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    Font.loadAsync({
      Montserrat: require("../../assets/fonts/Montserrat-Medium.ttf"),
      "Montserrat-Medium": {
        uri: require("../../assets/fonts/Montserrat-Medium.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <Text style={{ fontFamily: loaded ? "Montserrat-Medium" : null }}>
      {props.children}
    </Text>
  );
};
