import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions";
import { MediumView } from "../../components/text/medium";
import { RegularView } from "../../components/text/regular";
import { SemiBoldView } from "../../components/text/semibold";

/**
 * @author
 * @function Profile
 **/
export const Profile = (props) => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              backgroundColor: "#fff",
              marginLeft: 20,
              marginRight: 20,
              marginTop: 5,
              padding: 20,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <Image
                  source={require("../../assets/pp.jpeg")}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                  }}
                />
              </View>
              <View style={{ alignItems: "center", marginTop: 10 }}>
                <SemiBoldView>
                  <Text style={{ fontSize: 17 }}>{auth.user.fullName}</Text>
                </SemiBoldView>
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <RegularView>
                    <Text style={{ textDecorationLine: "underline" }}>
                      {auth.user.email}
                    </Text>
                  </RegularView>
                  <RegularView>
                    <Text>+88{auth.user.phone}</Text>
                  </RegularView>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: "#F09001",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}
                >
                  <Image
                    source={require("../../assets/parcel.png")}
                    style={{ height: 25, width: 25, tintColor: "#fff" }}
                  />
                </View>
                <MediumView>Orders</MediumView>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: "#F09001",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}
                >
                  <Image
                    source={require("../../assets/profile.png")}
                    style={{ height: 25, width: 25, tintColor: "#fff" }}
                  />
                </View>
                <MediumView>Profile</MediumView>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: "#F09001",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}
                >
                  <Image
                    source={require("../../assets/address.jpeg")}
                    style={{ height: 25, width: 25, tintColor: "#fff" }}
                  />
                </View>
                <MediumView>Address</MediumView>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#EBEBEB",
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../../assets/notification.png")}
                  style={{ height: 30, width: 30 }}
                />
              </View>
              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                  //   flexDirection: "row",
                  //   alignItems: "center",
                  //   justifyContent: "space-between",
                }}
              >
                <MediumView>
                  <Text style={{ fontSize: 16 }}>Notification</Text>
                </MediumView>
              </View>
              <View style={{ position: "absolute", right: 15 }}>
                <Image
                  source={require("../../assets/right-arrow.png")}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#EBEBEB",
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../../assets/help.png")}
                  style={{ height: 30, width: 30 }}
                />
              </View>
              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                  //   flexDirection: "row",
                  //   alignItems: "center",
                  //   justifyContent: "space-between",
                }}
              >
                <MediumView>
                  <Text style={{ fontSize: 16 }}>Support Center</Text>
                </MediumView>
              </View>
              <View style={{ position: "absolute", right: 15 }}>
                <Image
                  source={require("../../assets/right-arrow.png")}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#EBEBEB",
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../../assets/wallet.png")}
                  style={{ height: 25, width: 25 }}
                />
              </View>
              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                  //   flexDirection: "row",
                  //   alignItems: "center",
                  //   justifyContent: "space-between",
                }}
              >
                <MediumView>
                  <Text style={{ fontSize: 16 }}>Payment Methods</Text>
                </MediumView>
              </View>
              <View style={{ position: "absolute", right: 15 }}>
                <Image
                  source={require("../../assets/right-arrow.png")}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#EBEBEB",
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../../assets/coupon.png")}
                  style={{ height: 25, width: 25 }}
                />
              </View>
              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                  //   flexDirection: "row",
                  //   alignItems: "center",
                  //   justifyContent: "space-between",
                }}
              >
                <MediumView>
                  <Text style={{ fontSize: 16 }}>Vouchers</Text>
                </MediumView>
              </View>
              <View style={{ position: "absolute", right: 15 }}>
                <Image
                  source={require("../../assets/right-arrow.png")}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#EBEBEB",
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <MediumView>
                  <Text style={{ fontSize: 25 }}>?</Text>
                </MediumView>
              </View>
              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                }}
              >
                <MediumView>
                  <Text style={{ fontSize: 16 }}>FAQ</Text>
                </MediumView>
              </View>
              <View style={{ position: "absolute", right: 15 }}>
                <Image
                  source={require("../../assets/right-arrow.png")}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => handleLogout()}
            >
              <View
                style={{
                  backgroundColor: "#EBEBEB",
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../../assets/logout.png")}
                  style={{ height: 20, width: 20 }}
                />
              </View>
              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                  //   flexDirection: "row",
                  //   alignItems: "center",
                  //   justifyContent: "space-between",
                }}
              >
                <MediumView>
                  <Text style={{ fontSize: 16 }}>Logout</Text>
                </MediumView>
              </View>
              <View style={{ position: "absolute", right: 15 }}>
                <Image
                  source={require("../../assets/right-arrow.png")}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RegularView>Version 1.0.1 (Beta)</RegularView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
