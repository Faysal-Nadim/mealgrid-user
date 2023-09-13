import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Button,
  ScrollView,
  StatusBar,
} from "react-native";
import { RegularView } from "../../components/text/regular";
import { MediumView } from "../../components/text/medium";
import SearchBar from "react-native-platform-searchbar";
import { BoldView } from "../../components/text/bold";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getVendor } from "../../actions";
/**
 * @author
 * @function Home
 **/

const Width = Dimensions.get("window").width;

export const Home = (props) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVendor());
  }, []);

  const vendor = useSelector((state) => state.vendor);

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../../assets/location.png")}
              style={{ height: 45, width: 45 }}
            />
            <View>
              <RegularView>
                <Text style={{ color: "#A8A8A6", fontSize: 13 }}>
                  Deliver To
                </Text>
              </RegularView>
              <MediumView>
                <Text style={{ fontSize: 13 }}>
                  96/1, Vodra More, Rajshahi 6000
                </Text>
              </MediumView>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Account")}>
            <Image
              resizeMode="contain"
              source={require("../../assets/user.png")}
              style={{
                height: 40,
                width: 40,
                // tintColor: "#FF6D00",
                marginRight: 5,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 5,
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <SearchBar
            value={value}
            onChangeText={(text) => setValue(text)}
            placeholder="Search"
            theme="light"
            platform="ios"
            style={{ height: 40, width: Width - 10 }}
          >
            {loading ? (
              <ActivityIndicator style={{ marginRight: 10 }} />
            ) : undefined}
          </SearchBar>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginLeft: 10,
              marginRight: 10,
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View
                style={{
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 50,
                  padding: 10,
                }}
              >
                <Image
                  source={require("../../assets/healthy.png")}
                  style={{
                    height: (Width - 60) / 8,
                    width: (Width - 60) / 8,
                  }}
                />
              </View>
              <RegularView>Healthy</RegularView>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View
                style={{
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 50,
                  padding: 10,
                }}
              >
                <Image
                  source={require("../../assets/manage.png")}
                  style={{ height: (Width - 60) / 8, width: (Width - 60) / 8 }}
                />
              </View>
              <RegularView>Affordable</RegularView>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View
                style={{
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 50,
                  padding: 10,
                }}
              >
                <Image
                  source={require("../../assets/convenient.png")}
                  style={{ height: (Width - 60) / 8, width: (Width - 60) / 8 }}
                />
              </View>
              <RegularView>Convenient</RegularView>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View
                style={{
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 50,
                  padding: 10,
                }}
              >
                <Image
                  source={require("../../assets/effective.png")}
                  style={{ height: (Width - 60) / 8, width: (Width - 60) / 8 }}
                />
              </View>
              <RegularView>Effective</RegularView>
            </View>
          </View>
          {/* <View
        style={{
          borderWidth: 0.2,
          borderColor: "#808080",
          marginTop: 15,
          borderRadius: 5,
          width: Width - 30,
          alignSelf: "center",
        }}
      /> */}
          <View style={{ marginLeft: 10, marginTop: 25 }}>
            <BoldView>
              <Text style={{ fontSize: 15 }}>Nearby Meal Providers</Text>
            </BoldView>
          </View>

          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{
                paddingLeft: 10,
                marginTop: 10,
              }}
            >
              {vendor.loading === false &&
                vendor.vendors.map((info) => (
                  <TouchableOpacity
                    style={{ width: 250, marginRight: 10 }}
                    onPress={() => navigation.navigate("Shop")}
                    key={info._id}
                  >
                    <View>
                      <Image
                        source={{
                          uri: `https://aleeha.s3.ap-southeast-1.amazonaws.com/${info.cover.key}`,
                        }}
                        // resizeMode="center"
                        style={{
                          height: 150,
                          width: 250,
                          borderRadius: 10,
                        }}
                      />
                    </View>
                    <View>
                      <View style={{ marginTop: 5 }}>
                        <MediumView>
                          <Text style={{ fontSize: 16 }}>
                            {info.legal_info.vendor_name}
                          </Text>
                        </MediumView>
                      </View>
                      <View
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row",
                          marginTop: 5,
                        }}
                      >
                        <RegularView>
                          <Text style={{ fontSize: 12 }}>
                            Delivery BDT {info.delivery.fee}/Meal
                          </Text>
                        </RegularView>
                        <RegularView>
                          <Text style={{ fontSize: 12, color: "#FF6D00" }}>
                            Rating{" "}
                            {Object.keys(info.reviews).reduce((rating, key) => {
                              return rating + +info.reviews[key].rating;
                            }, 0) /
                              info.reviews.length >
                            0
                              ? Object.keys(info.reviews).reduce(
                                  (rating, key) => {
                                    return rating + +info.reviews[key].rating;
                                  },
                                  0
                                ) / info.reviews.length
                              : "N/A"}{" "}
                            ({info.reviews.length})
                          </Text>
                        </RegularView>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
          <View style={{ marginLeft: 10, marginTop: 25 }}>
            <BoldView>
              <Text style={{ fontSize: 15 }}>Top Rated</Text>
            </BoldView>
          </View>

          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{
                paddingLeft: 10,
                marginTop: 10,
              }}
            >
              <View style={{ width: 250, marginRight: 10 }}>
                <View>
                  <Image
                    source={require("../../assets/kacchi.png")}
                    // resizeMode="center"
                    style={{
                      height: 150,
                      width: 250,
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View>
                  <View style={{ marginTop: 5 }}>
                    <MediumView>
                      <Text style={{ fontSize: 16 }}>Dummy Meal Provider</Text>
                    </MediumView>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      marginTop: 5,
                    }}
                  >
                    <RegularView>
                      <Text style={{ fontSize: 13 }}>Delivery BDT 10/Meal</Text>
                    </RegularView>
                    <RegularView>
                      <Text style={{ fontSize: 13, color: "#FF6D00" }}>
                        Rating 4.0 (582)
                      </Text>
                    </RegularView>
                  </View>
                </View>
              </View>
              <View style={{ width: 250 }}>
                <View>
                  <Image
                    source={require("../../assets/tehari.jpeg")}
                    // resizeMode="center"
                    style={{
                      height: 150,
                      width: 250,
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View>
                  <View style={{ marginTop: 5 }}>
                    <MediumView>
                      <Text style={{ fontSize: 16 }}>Dummy Meal Provider</Text>
                    </MediumView>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      marginTop: 5,
                    }}
                  >
                    <RegularView>
                      <Text style={{ fontSize: 13 }}>Delivery BDT 10/Meal</Text>
                    </RegularView>
                    <RegularView>
                      <Text style={{ fontSize: 13, color: "#FF6D00" }}>
                        Rating 4.0 (582)
                      </Text>
                    </RegularView>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={{ marginLeft: 10, marginTop: 25 }}>
            <BoldView>
              <Text style={{ fontSize: 15 }}>Top Rated</Text>
            </BoldView>
          </View>

          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{
                paddingLeft: 10,
                marginTop: 10,
              }}
            >
              <View style={{ width: 250, marginRight: 10 }}>
                <View>
                  <Image
                    source={require("../../assets/kacchi.png")}
                    // resizeMode="center"
                    style={{
                      height: 150,
                      width: 250,
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View>
                  <View style={{ marginTop: 5 }}>
                    <MediumView>
                      <Text style={{ fontSize: 16 }}>Dummy Meal Provider</Text>
                    </MediumView>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      marginTop: 5,
                    }}
                  >
                    <RegularView>
                      <Text style={{ fontSize: 13 }}>Delivery BDT 10/Meal</Text>
                    </RegularView>
                    <RegularView>
                      <Text style={{ fontSize: 13, color: "#FF6D00" }}>
                        Rating 4.0 (582)
                      </Text>
                    </RegularView>
                  </View>
                </View>
              </View>
              <View style={{ width: 250 }}>
                <View>
                  <Image
                    source={require("../../assets/tehari.jpeg")}
                    // resizeMode="center"
                    style={{
                      height: 150,
                      width: 250,
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View>
                  <View style={{ marginTop: 5 }}>
                    <MediumView>
                      <Text style={{ fontSize: 16 }}>Dummy Meal Provider</Text>
                    </MediumView>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      marginTop: 5,
                    }}
                  >
                    <RegularView>
                      <Text style={{ fontSize: 13 }}>Delivery BDT 10/Meal</Text>
                    </RegularView>
                    <RegularView>
                      <Text style={{ fontSize: 13, color: "#FF6D00" }}>
                        Rating 4.0 (582)
                      </Text>
                    </RegularView>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          backgroundColor: "#232323",
          height: 140,
          width: Width - 20,
          position: "absolute",
          bottom: 0,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: 20,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          right: 10,
          left: 10,
          display: show ? null : "none",
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 110,
            right: 10,
            height: 30,
            width: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setShow(!show)}
        >
          <BoldView>
            <Text style={{ color: "#fff", fontSize: 19 }}>✕</Text>
          </BoldView>
        </TouchableOpacity>
        <View>
          <View>
            <MediumView>
              <Text style={{ color: "#fff", fontSize: 15 }}>Join us as</Text>
            </MediumView>
            <BoldView>
              <Text style={{ color: "#fff", fontSize: 18 }}>
                MealGrid Rider
              </Text>
            </BoldView>
          </View>
          <View style={{ marginTop: 10 }}>
            <RegularView>
              <Text style={{ color: "#fff", fontSize: 11 }}>
                Sign up today and start making {"\n"}money from tomorrow
              </Text>
            </RegularView>
            <View
              style={{
                backgroundColor: "#D9D9D9",
                width: 100,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                marginTop: 5,
              }}
            >
              <MediumView>
                <Text style={{ color: "#E44D44" }}>Sign Up →</Text>
              </MediumView>
            </View>
          </View>
        </View>
        <View>
          <Image
            source={require("../../assets/rider.png")}
            style={{ height: 140, width: 130 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
