import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { useThemeStyles } from "@/hooks/useThemeStyles";
import { useEvent } from "../context/EventsContext";
import { useUser } from "../context/UserContext";
import CountDownTimer from "../components/CountDownTimer";
import * as Location from "expo-location";
import getDistance from "../utils/calculateDistance";
import { convertDate } from "../utils/convertDate";

const EventLists = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const { allEvents } = useLocalSearchParams();
  const [eventsData, setEventsData] = useState([]);

  const { border, text } = useThemeStyles();

  const { user } = useUser();
  const { allEvents } = useEvent();
  const { handleSelectedEvent } = useEvent();

  console.log(allEvents);
  // Get user Location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      console.log(currentLocation);
    })();
  }, []);

  // Handel Event Time, Location and Selected Event
  const handleLocation = (event) => {
    const startTime = new Date(event.start_time);
    const endTime = new Date(event.end_time);
    const now = new Date();
    // Check event Time
    if (now >= endTime) {
      alert("Event has ended");
    } else if (now < startTime) {
      alert("Event has not started");
    } else {
      const homeLat = 6.5244; // Latitude
      const homeLon = 3.1926642868809285; //Longitude

      // Check and confirm user location
      if (location) {
        const distance = getDistance(
          location.latitude,
          location.longitude,
          homeLat,
          homeLon
        );
        if (distance > 400) {
          alert("You are too far from the allowed area!");
        } else {
          // Mark the student Attendance to the selected Event
          handleSelectedEvent(event, user);
          alert("You have been added to the Attendance List ✅");
        }
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={{ fontSize: 30, paddingTop: 20, fontWeight: "bold" }}>
        Events
      </ThemedText>
      {!location ? (
        <ThemedView
          style={{
            display: "flex",
            alignSelf: "center",
            height: "90%",
            // backgroundColor: "green",
            top: "45%",
          }}
        >
          <ActivityIndicator />
          <ThemedText style={{ fontWeight: "bold" }}>
            Searching Location
          </ThemedText>
        </ThemedView>
      ) : (
        <ThemedView style={{ width: "100%", height: "100%" }}>
          <ScrollView style={{ height: "100%" }}>
            {allEvents ? (
              allEvents.map((event) => {
                return (
                  <TouchableOpacity
                    // key={event.event_name} change to id later
                    onPress={() => handleLocation(event)}
                  >
                    <ThemedView
                      key={event.id}
                      style={[
                        styles.eventContainer,
                        { borderColor: border, position: "relative" },
                      ]}
                    >
                      <View style={{ padding: 10 }}>
                        <ThemedText
                          style={{ fontSize: 25, fontWeight: "bold" }}
                        >
                          {event.event_name}
                        </ThemedText>
                        <ThemedText>{event.description}</ThemedText>

                        <ThemedText style>
                          {convertDate(event.start_time)} -{" "}
                          {convertDate(event.end_time)}
                        </ThemedText>
                      </View>
                      <View
                        style={{
                          alignSelf: "flex-end",
                          marginBottom: 10,
                          marginRight: 10,
                        }}
                      >
                        <CountDownTimer
                          start={event.start_time}
                          end={event.end_time}
                        />
                      </View>
                    </ThemedView>
                  </TouchableOpacity>
                );
              })
            ) : (
              <>
                <ActivityIndicator />
                <ThemedText style={{ fontWeight: "bold" }}>
                  Getting Events
                </ThemedText>
              </>
            )}
          </ScrollView>
        </ThemedView>
      )}
    </ThemedView>
  );
};

export default EventLists;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  eventContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    height: 100,
    alignItems: "flex-start",
    borderWidth: 2,
    marginTop: 30,
    alignSelf: "center",
    borderRadius: 10,
  },
});
