import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";

const CountDownTimer = ({ start, end }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function startClassCountdown() {
      const startTime = new Date(start); // Class start time
      const endTime = new Date(end); // Class end time
      const now = new Date();

      if (now < startTime) {
        setTimeLeft("Not started");
        return;
      } else if (now >= endTime) {
        setTimeLeft("Ended");
        return;
      }

      function updateCountdown() {
        const now = new Date();

        if (now >= endTime) {
          clearInterval(interval);
          return;
        }

        const diff = endTime - now;
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft(`Time Left: ${hours}:${minutes}`);
        // console.log(`${hours} : ${minutes}: ${seconds}s remaining`);
      }

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
    }

    startClassCountdown();
  }, []);
  return <ThemedText style={{ fontWeight: "bold" }}>{timeLeft} </ThemedText>;
};

export default CountDownTimer;

const styles = StyleSheet.create({});
