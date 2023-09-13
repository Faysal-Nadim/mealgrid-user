import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";

/**
 * @author
 * @function ExtraLightView
 **/
export const ExtraLightView = (props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    Font.loadAsync({
      Montserrat: require("../../assets/fonts/Montserrat-ExtraLight.ttf"),
      "Montserrat-ExtraLight": {
        uri: require("../../assets/fonts/Montserrat-ExtraLight.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <Text style={{ fontFamily: loaded ? "Montserrat-ExtraLight" : null }}>
      {props.children}
    </Text>
  );
};
