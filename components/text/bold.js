import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";

/**
 * @author
 * @function BoldView
 **/
export const BoldView = (props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    Font.loadAsync({
      Montserrat: require("../../assets/fonts/Montserrat-Bold.ttf"),
      "Montserrat-Bold": {
        uri: require("../../assets/fonts/Montserrat-Bold.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <Text style={{ fontFamily: loaded ? "Montserrat-Bold" : null }}>
      {props.children}
    </Text>
  );
};
