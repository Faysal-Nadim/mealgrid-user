import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";

/**
 * @author
 * @function ThinView
 **/
export const ThinView = (props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    Font.loadAsync({
      Montserrat: require("../../assets/fonts/Montserrat-Thin.ttf"),
      "Montserrat-Thin": {
        uri: require("../../assets/fonts/Montserrat-Thin.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <Text style={{ fontFamily: loaded ? "Montserrat-Thin" : null }}>
      {props.children}
    </Text>
  );
};
