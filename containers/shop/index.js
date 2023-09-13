import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { BoldView } from "../../components/text/bold";
import { MediumView } from "../../components/text/medium";
import { RegularView } from "../../components/text/regular";
import { SemiBoldView } from "../../components/text/semibold";

/**
 * @author
 * @function Shop
 **/

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

export const Shop = (props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View>
              <Image
                resizeMode="cover"
                source={require("../../assets/provider.jpeg")}
                style={{
                  height: Height / 4,
                  width: Width,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}
              />
              <View
                style={{
                  height: Height / 4,
                  width: Width,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  position: "absolute",
                  top: 0,
                  backgroundColor: "#000",
                  opacity: 0.2,
                }}
              />
            </View>
            <View
              style={{
                height: Height / 4,
                width: Width,
                position: "absolute",
                top: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderRadius: 15,
                  height: 40,
                  justifyContent: "center",
                }}
              >
                <BoldView>
                  <Text style={{ color: "#F09001" }}>Dummy Meal Provider</Text>
                </BoldView>
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "#F09001",
                    borderRadius: 15,
                    top: -15,
                    left: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}
                >
                  <BoldView>
                    <Text style={{ color: "#fff", fontSize: 10 }}>
                      Rating 3.9(547)
                    </Text>
                  </BoldView>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              margin: 20,
              padding: 20,
              borderWidth: 2,
              borderColor: "#DADADA",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <SemiBoldView>
                  <Text style={{ fontSize: 17 }}>Package 01 | Cheap</Text>
                </SemiBoldView>
                <RegularView>
                  <Text style={{ fontSize: 13, marginTop: 5 }}>
                    Price BDT 99/Day | BDT 659/Week
                  </Text>
                </RegularView>
              </View>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  borderWidth: 1.5,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#F09001",
                }}
                onPress={() => navigation.navigate("Checkout")}
              >
                <Image
                  source={require("../../assets/plus.png")}
                  style={{ height: 30, width: 30, tintColor: "#F09001" }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 25,
                }}
              >
                <View style={{ width: 40 }}>
                  <SemiBoldView>
                    <Text>Day</Text>
                  </SemiBoldView>
                </View>
                <View style={{ width: (Width - 80) / 3 }}>
                  <SemiBoldView>
                    <Text>Lunch</Text>
                  </SemiBoldView>
                </View>
                <View style={{ width: (Width - 80) / 3 }}>
                  <SemiBoldView>
                    <Text>Dinner</Text>
                  </SemiBoldView>
                </View>
              </View>
              <View
                style={{ backgroundColor: "#DADADA", height: 1, marginTop: 10 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // flexWrap: "wrap",
                  marginTop: 10,
                }}
              >
                <View style={{ width: 40 }}>
                  <SemiBoldView>
                    <Text>Sat</Text>
                  </SemiBoldView>
                </View>

                <View style={{ width: (Width - 80) / 3 }}>
                  <RegularView>
                    <Text style={{ fontSize: 12 }}>
                      Steam Rice, Chicken Curry, Dal, Potato Vorta
                    </Text>
                  </RegularView>
                </View>
                <View style={{ width: (Width - 80) / 3 }}>
                  <RegularView>
                    <Text style={{ fontSize: 12 }}>
                      Steam Rice, Chicken Curry, Dal, Potato Vorta
                    </Text>
                  </RegularView>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // flexWrap: "wrap",
                  marginTop: 10,
                }}
              >
                <View style={{ width: 40 }}>
                  <SemiBoldView>
                    <Text>Sun</Text>
                  </SemiBoldView>
                </View>

                <View style={{ width: (Width - 80) / 3 }}>
                  <RegularView>
                    <Text style={{ fontSize: 12 }}>
                      Steam Rice, Chicken Curry, Dal, Potato Vorta
                    </Text>
                  </RegularView>
                </View>
                <View style={{ width: (Width - 80) / 3 }}>
                  <RegularView>
                    <Text style={{ fontSize: 12 }}>
                      Steam Rice, Chicken Curry, Dal, Potato Vorta
                    </Text>
                  </RegularView>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // flexWrap: "wrap",
                  marginTop: 10,
                }}
              >
                <View style={{ width: 40 }}>
                  <SemiBoldView>
                    <Text>Mon</Text>
                  </SemiBoldView>
                </View>

                <View style={{ width: (Width - 80) / 3 }}>
                  <RegularView>
                    <Text style={{ fontSize: 12 }}>
                      Steam Rice, Chicken Curry, Dal, Potato Vorta
                    </Text>
                  </RegularView>
                </View>
                <View style={{ width: (Width - 80) / 3 }}>
                  <RegularView>
                    <Text style={{ fontSize: 12 }}>
                      Steam Rice, Chicken Curry, Dal, Potato Vorta
                    </Text>
                  </RegularView>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
