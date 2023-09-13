import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { MediumView } from "../../components/text/medium";
import { RegularView } from "../../components/text/regular";
import { SemiBoldView } from "../../components/text/semibold";
import Toast from "react-native-toast-message";
import * as Font from "expo-font";

/**
 * @author
 * @function Checkout
 **/

const Width = Dimensions.get("window").width;

export const Checkout = (props) => {
  const [date, setDate] = useState(new Date());
  const [currYear, setCurrYear] = useState(date.getFullYear());
  const [currMonth, setCurrMonth] = useState(date.getMonth());
  const [selectedDates, setSelectedDates] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [totalMeal, setTotalMeal] = useState(0);
  const [payment, setPayment] = useState("");

  let dateArray = [];

  useEffect(() => {
    Font.loadAsync({
      Montserrat: require("../../assets/fonts/Montserrat-Regular.ttf"),
      Montserrat: {
        uri: require("../../assets/fonts/Montserrat-Regular.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    let lunchCount = 0;
    let dinnerCount = 0;
    Object.keys(selectedDates).map((date, key) => {
      selectedDates[key].lunch === true ? lunchCount++ : lunchCount;
      selectedDates[key].dinner === true ? dinnerCount++ : dinnerCount;
    });
    setTotalMeal(lunchCount + dinnerCount);
  }, [selectedDates]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  const lastDayofMonth = new Date(
    currYear,
    currMonth,
    lastDateofMonth
  ).getDay();
  const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

  for (let i = firstDayofMonth; i > 0; i--) {
    dateArray.push({
      date: lastDateofLastMonth - i + 1,
      weekday:
        weekdays[
          new Date(
            `${months[currMonth - 1]} ${
              lastDateofLastMonth - i + 1
            }, ${currYear}`
          ).getDay()
        ],
      disabled: true,
    });
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    dateArray.push({
      date: i,
      weekday:
        weekdays[new Date(`${months[currMonth]} ${i}, ${currYear}`).getDay()],
      disabled: false,
      month: months[currMonth],
      year: currYear,
      fullDate: new Date(
        `${months[currMonth]} ${i}, ${currYear}`
      ).toDateString(),
    });
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    dateArray.push({
      date: i - lastDayofMonth + 1,
      weekday:
        weekdays[
          new Date(
            `${months[currMonth + 1]} ${i - lastDayofMonth + 1}, ${currYear}`
          ).getDay()
        ],
      disabled: true,
    });
  }

  const handleCalender = (fx) => {
    setCurrMonth(fx === "prev" ? currMonth - 1 : currMonth + 1);
  };

  useEffect(() => {
    if (currMonth < 0 || currMonth > 11) {
      let newDate = new Date(currYear, currMonth);
      setCurrYear(newDate.getFullYear());
      setCurrMonth(newDate.getMonth());
    }
  }, [currMonth]);

  const handleSelectedDate = (data) => {
    if (
      selectedDates.some(
        (c) => c.date === data.date && c.month === data.month
      ) === false
    ) {
      if (
        data.date > date.getDate() ||
        (data.date <= date.getDate() &&
          months.findIndex((x) => x === data.month) > date.getMonth()) ||
        (data.date <= date.getDate() &&
          months.findIndex((x) => x === data.month) <= date.getMonth() &&
          data.year > date.getFullYear())

        // data.year <= date.getFullYear()
      ) {
        const info = {
          fullDate: data.fullDate,
          date: data.date,
          weekday: data.weekday,
          month: data.month,
          year: data.year,
          lunch: false,
          dinner: false,
        };
        setSelectedDates([...selectedDates, info]);
      } else {
        Toast.show({
          type: "info",
          text1: "Sorry!",
          text2: "Can't Select This Date.",
        });
      }
    } else if (
      selectedDates.some(
        (c) => c.date === data.date && c.month === data.month
      ) === true
    ) {
      setSelectedDates(
        selectedDates.filter((c) => c.fullDate !== data.fullDate)
      );
    }
  };

  const handleColor = (data) => {
    if (
      selectedDates.some(
        (c) =>
          c.date === data.date &&
          c.month === data.month &&
          c.year === data.year &&
          data.disabled === false
      ) === true
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleMeal = (prop, mealName) => {
    for (let data in selectedDates) {
      if (
        selectedDates[data].fullDate === prop.fullDate &&
        mealName === "lunch"
      ) {
        selectedDates[data].lunch = !selectedDates[data].lunch;
      } else if (
        selectedDates[data].fullDate === prop.fullDate &&
        mealName === "dinner"
      ) {
        selectedDates[data].dinner = !selectedDates[data].dinner;
      }
    }
    setSelectedDates([...selectedDates]);
  };

  const handleLunch = (data) => {
    if (
      selectedDates.some(
        (c) => c.fullDate === data.fullDate && c.lunch === true
      ) === true
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleDinner = (data) => {
    if (
      selectedDates.some(
        (c) => c.fullDate === data.fullDate && c.dinner === true
      ) === true
    ) {
      return true;
    } else {
      return false;
    }
  };

  const sortedDate = selectedDates.sort(function (a, b) {
    return new Date(a.fullDate) - new Date(b.fullDate);
  });

  const mealTotal = totalMeal * 55;
  const deliveryTotal = totalMeal * 10;
  const orderTotal = mealTotal + deliveryTotal;

  const handleOrder = () => {
    const data = {
      vendor: "6385bd3464573887e12a11b2",
      invoice: {
        orderTotal: orderTotal,
        mealTotal: mealTotal,
        deliveryTotal: deliveryTotal,
        paid: 0,
        vat: ((mealTotal - (mealTotal * 12) / 100) * 5) / 100,
        paymentMethod: payment,
        status: "Unpaid",
        trxID: null,
      },
      meals: sortedDate.map((meals) => ({
        date: meals.fullDate,
        lunch: {
          items: "Rice, Fish Curry, Potato Bhorta, Dal",
          isOrdered: meals.lunch,
          price: 55,
        },
        dinner: {
          items: "Rice, Fish Curry, Potato Bhorta, Dal",
          isOrdered: meals.dinner,
          price: 55,
        },
      })),
      address: {
        latitude: 23.818846280137365,
        longitude: 90.42143016507173,
        street_address: "KA 96/1, Kazibari, Kuril, Dhaka 1229",
      },
    };
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              backgroundColor: "#fff",
              margin: 10,
              padding: 15,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <MediumView>
                <Text style={{ fontSize: 17 }}>
                  {months[currMonth]}, {currYear}
                </Text>
              </MediumView>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    height: 30,
                    width: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => handleCalender("prev")}
                  disabled={
                    currMonth > date.getMonth()
                      ? false
                      : currMonth <= date.getMonth() &&
                        currYear > date.getFullYear()
                      ? false
                      : true
                  }
                >
                  <Image
                    //   resizeMode="contain"
                    source={require("../../assets/right-arrow.png")}
                    style={{
                      height: 17,
                      width: 17,
                      transform: [{ rotate: "180deg" }],
                      tintColor:
                        currMonth > date.getMonth()
                          ? null
                          : currMonth <= date.getMonth() &&
                            currYear > date.getFullYear()
                          ? null
                          : "#BEBEBE",
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 30,
                    width: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => handleCalender("next")}
                >
                  <Image
                    source={require("../../assets/right-arrow.png")}
                    style={{ height: 17, width: 17 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 10,
              }}
            >
              <View style={styles.date}>
                <MediumView>Sun</MediumView>
              </View>
              <View style={styles.date}>
                <MediumView>Mon</MediumView>
              </View>
              <View style={styles.date}>
                <MediumView>Tue</MediumView>
              </View>
              <View style={styles.date}>
                <MediumView>Wed</MediumView>
              </View>
              <View style={styles.date}>
                <MediumView>Thu</MediumView>
              </View>
              <View style={styles.date}>
                <MediumView>Fri</MediumView>
              </View>
              <View style={styles.date}>
                <MediumView>Sat</MediumView>
              </View>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                flexWrap: "wrap",
                //   position: "relative",
                //   zIndex: 1,
              }}
            >
              {dateArray.length > 0 &&
                dateArray.map((dates) => (
                  <TouchableOpacity
                    key={Math.random() * 1000}
                    style={{
                      margin: 1,
                      height: 25,
                      width: (Width - 100) / 7,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth:
                        date.getDate() === dates.date &&
                        currMonth === date.getMonth() &&
                        currYear === date.getFullYear() &&
                        dates.disabled === false
                          ? 1
                          : 0,
                      borderRadius: 50,
                      backgroundColor:
                        handleColor(dates) === true ? "#F74D56" : null,
                    }}
                    disabled={dates.disabled}
                    onPress={() => handleSelectedDate(dates)}
                  >
                    <RegularView>
                      <Text
                        style={{
                          color: dates.disabled
                            ? "#BEBEBE"
                            : handleColor(dates) === true
                            ? "#fff"
                            : "#000",
                        }}
                      >
                        {dates.date}
                      </Text>
                    </RegularView>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
          {selectedDates.length > 0 && (
            <View
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10,
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: "#F09001",
              }}
            >
              <View style={{ marginBottom: 5 }}>
                <SemiBoldView>
                  <Text style={{ fontSize: 15 }}>Select Your Meals</Text>
                </SemiBoldView>
              </View>
              <View>
                {selectedDates.length > 0 &&
                  sortedDate.map((dates) => (
                    <View
                      key={dates.fullDate}
                      style={{
                        // marginLeft: 5,
                        // marginRight: 5,
                        marginTop: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <MediumView>{dates.fullDate}</MediumView>
                      </View>
                      <View style={{ flexDirection: "row", marginRight: 5 }}>
                        <TouchableOpacity
                          style={{
                            marginRight: 15,
                            borderWidth: 0.3,
                            borderRadius: 5,
                            borderStyle: "dashed",
                            flexDirection: "row",
                          }}
                          onPress={() => handleMeal(dates, "lunch")}
                        >
                          <Text
                            style={{
                              padding: 2,
                            }}
                          >
                            <RegularView>Lunch</RegularView>
                          </Text>
                          {handleLunch(dates) === true ? (
                            <Text
                              style={{
                                marginLeft: 3,
                                backgroundColor: "#28A745",
                                borderRadius: 5,
                                color: "#fff",
                                padding: 2,
                                width: 20,
                              }}
                            >
                              <RegularView> ✓ </RegularView>
                            </Text>
                          ) : (
                            <Text
                              style={{
                                marginLeft: 3,
                                backgroundColor: "#F74D56",
                                borderRadius: 5,
                                color: "#fff",
                                padding: 2,
                                width: 20,
                              }}
                            >
                              <RegularView> X </RegularView>
                            </Text>
                          )}
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            marginRight: 15,
                            borderWidth: 0.3,
                            borderRadius: 5,
                            borderStyle: "dashed",
                            flexDirection: "row",
                          }}
                          onPress={() => handleMeal(dates, "dinner")}
                        >
                          <Text
                            style={{
                              padding: 2,
                            }}
                          >
                            <RegularView>Dinner</RegularView>
                          </Text>
                          {handleDinner(dates) === true ? (
                            <Text
                              style={{
                                marginLeft: 3,
                                backgroundColor: "#28A745",
                                borderRadius: 5,
                                color: "#fff",
                                padding: 2,
                                width: 20,
                              }}
                            >
                              <RegularView> ✓ </RegularView>
                            </Text>
                          ) : (
                            <Text
                              style={{
                                marginLeft: 3,
                                backgroundColor: "#F74D56",
                                borderRadius: 5,
                                color: "#fff",
                                padding: 2,
                                width: 20,
                              }}
                            >
                              <RegularView> X </RegularView>
                            </Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          )}
          <View
            style={{
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 10,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <MediumView>
                <Text>
                  Total Meal Price ({totalMeal}{" "}
                  {totalMeal > 1 ? "Meals" : "Meal"})
                </Text>
              </MediumView>
              <MediumView>
                <Text>BDT {totalMeal * 55}</Text>
              </MediumView>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              <MediumView>
                <Text>Delivery Charge</Text>
              </MediumView>
              <MediumView>
                <Text>BDT {totalMeal * 10}</Text>
              </MediumView>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              <MediumView>
                <Text>Discount (- 10%)</Text>
              </MediumView>
              <MediumView>
                <Text>BDT -725</Text>
              </MediumView>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                // value={coupon}
                placeholder="Enter Coupon Code (If Any)"
                // onChangeText={setCoupon}
                style={{
                  width: Width - 150,
                  height: 35,
                  borderRadius: 5,
                  borderColor: "#FB6A43",
                  borderWidth: 1,
                  padding: 3,
                  fontFamily: loaded ? "Montserrat" : null,
                }}
              />

              <TouchableOpacity
                style={{
                  width: 100,
                  height: 35,
                  backgroundColor: "#FB6A43",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 8,
                  borderRadius: 5,
                }}
              >
                <MediumView>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#fff",
                    }}
                  >
                    Apply
                  </Text>
                </MediumView>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 55 }}>
            <Text
              style={{
                fontFamily: loaded ? "Montserrat-SemiBold" : null,
                fontSize: 15,
                marginBottom: 5,
                marginTop: 10,
              }}
            >
              Select Payment Method
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: payment === "COD" ? "#EDFBEE" : "#fff",
                justifyContent: "center",
                padding: 5,
                marginTop: 5,
                borderRadius: 5,
                height: 50,
              }}
              onPress={() => setPayment("COD")}
            >
              {payment === "COD" ? (
                <View
                  style={{
                    height: 50,
                    width: 5,
                    backgroundColor: "#53D451",
                    opacity: 1,
                    position: "absolute",
                    left: 0,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                />
              ) : null}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  resizeMode="contain"
                  source={require("../../assets/cod.png")}
                  style={{
                    height: 50,
                    width: 35,
                    marginLeft: 10,
                  }}
                />

                <Text
                  style={{
                    marginLeft: 5,
                    fontFamily: loaded ? "Montserrat" : null,
                  }}
                >
                  Cash On Delivery
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: payment === "bKash" ? "#EDFBEE" : "#fff",
                justifyContent: "center",
                padding: 5,
                marginTop: 5,
                borderRadius: 5,
                height: 50,
              }}
              onPress={() => setPayment("bKash")}
            >
              {payment === "bKash" ? (
                <View
                  style={{
                    height: 50,
                    width: 5,
                    backgroundColor: "#53D451",
                    opacity: 1,
                    position: "absolute",
                    left: 0,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                />
              ) : null}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  // resizeMode="contain"
                  source={require("../../assets/bkash.png")}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                />
                <RegularView>
                  <Text>bKash Checkout</Text>
                </RegularView>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: payment === "SSL" ? "#EDFBEE" : "#fff",
                justifyContent: "center",
                padding: 5,
                marginTop: 5,
                borderRadius: 5,
                height: 50,
                // marginBottom: 100,
              }}
              onPress={() => setPayment("SSL")}
            >
              {payment === "SSL" ? (
                <View
                  style={{
                    height: 50,
                    width: 5,
                    backgroundColor: "#53D451",
                    opacity: 1,
                    position: "absolute",
                    left: 0,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                />
              ) : null}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  resizeMode="contain"
                  source={require("../../assets/card.png")}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                />
                <RegularView>
                  <Text>Debit/Credit Card</Text>
                </RegularView>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={handleOrder}
        style={{
          position: "absolute",
          bottom: 0,
          padding: 10,
          alignItems: "center",
          width: Width,
        }}
      >
        <View
          style={{
            backgroundColor: "#FB6A43",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            borderRadius: 5,
            width: Width - 20,
          }}
        >
          <Text
            style={{
              fontFamily: loaded ? "Montserrat-SemiBold" : null,
              fontSize: 18,
              color: "#fff",
            }}
          >
            Place Order
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  date: {
    height: 25,
    width: (Width - 100) / 7,
    justifyContent: "center",
    alignItems: "center",
  },
});
