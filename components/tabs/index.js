import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @author
 * @function BottomTab
 **/
export const BottomTab = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>BottomTab</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
