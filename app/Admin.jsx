import {
  Image,
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TextInput,
  useColorScheme,
  Switch,
  Button,
} from "react-native";
import { useState, useContext } from "react";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStyles } from "@/hooks/useThemeStyles";
import { useUser } from "../context/UserContext";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEvent } from "../context/EventsContext";

const Admin = () => {
  const { user, SignUpLoading, SignUp, SignUpError } = useUser();

  const {
    event_name,
    description,
    location,
    start_date,
    end_date,
    handelChange,
    createEvent,
    isLoading,
  } = useEvent();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    handelChange("start_date", selectedDate);
    console.log(start_date);

    setShow(false);
    setStartDate(currentDate);
  };

  const setEndDateFunc = (event, setSelectedEndDate) => {
    const EndDate = setSelectedEndDate;
    handelChange("end_date", setSelectedEndDate);
    console.log(end_date);

    setShow(false);
    setEndDate(EndDate);
  };

  const { border, text, background } = useThemeStyles();
  return (
    <ThemedView style={{ height: "100%" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView enabled={true}>
          <View style={styles.container}>
            <ThemedText type="title">Create Event</ThemedText>
            <View style={{ marginTop: 30 }}>
              <ThemedText type="label">Event Name</ThemedText>
              <View>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: "transparent",
                      borderColor: border,
                      borderWidth: 1,
                    },
                  ]}
                  placeholderTextColor={"gray"}
                  placeholder="CSC404"
                  color={text}
                  onChangeText={(text) => handelChange("event_name", text)}
                  //onChangeText={handlePasswordChange}
                />
              </View>
              <ThemedText type="label">Description</ThemedText>
              <View>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: "transparent",
                      borderColor: border,
                      borderWidth: 1,
                    },
                  ]}
                  placeholderTextColor={"gray"}
                  placeholder="Data structures and algorithms "
                  color={text}
                  onChangeText={(text) => handelChange("description", text)}
                  //onChangeText={handlePasswordChange}
                />
              </View>
              <ThemedText type="label">Location</ThemedText>
              <View>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: "transparent",
                      borderColor: border,
                      borderWidth: 1,
                    },
                  ]}
                  placeholderTextColor={"gray"}
                  placeholder="NAS1"
                  onChangeText={(text) => handelChange("location", text)}
                  //onChangeText={handlePasswordChange}
                  color={text}
                  // secureTextEntry={viewPassword}
                />
              </View>
              <ThemedText type="label">Date and Tine</ThemedText>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "center",
                  marginTop: 10,
                  marginLeft: -10,
                }}
              >
                <DateTimePicker
                  testID="dateTimePicker"
                  value={startDate}
                  mode={"datetime"}
                  is24Hour={true}
                  onChange={onChange}
                />
                <ThemedText style={{ paddingLeft: 10, paddingTop: 10 }}>
                  {" "}
                  End Date{" "}
                </ThemedText>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={endDate}
                  mode={"datetime"}
                  is24Hour={true}
                  onChange={setEndDateFunc}
                />
              </View>
              <View style={styles.policy}>
                {SignUpError ? (
                  <ThemedText
                    style={{ width: "80%", color: "red" }}
                    type="tiny"
                  >
                    {SignUpError}
                  </ThemedText>
                ) : (
                  <ThemedText
                    style={{ width: "80%", textDecorationLine: "underline" }}
                    type="tiny"
                  >
                    {/* forgot password here */}
                  </ThemedText>
                )}
              </View>

              {/* back img */}

              {/* Login button */}
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View
        style={{
          position: "absolute",
          bottom: "5%",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* <Link replace href="/HomeScreen" asChild> */}
        <TouchableOpacity
          style={[styles.LoginButton, { backgroundColor: border }]}
          onPress={createEvent}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <ThemedText style={{ color: background }} type="button">
              Create Event
            </ThemedText>
          )}
        </TouchableOpacity>
        {/* </Link> */}
      </View>
    </ThemedView>
  );
};

export default Admin;
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  textInput: {
    backgroundColor: "#181818",
    width: "95%",
    height: 45,
    padding: 10,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 8,
  },
  policy: {
    display: "flex",
    flexDirection: "row",
    marginTop: 4,
    width: "95%",
    height: 55,
  },
  button: {
    marginTop: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
    width: "95%",
    height: 45,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  LoginButton: {
    marginTop: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFEC51",
    height: 40,
    width: "95%",
    borderRadius: 8,
    textAlign: "center",
  },
});
