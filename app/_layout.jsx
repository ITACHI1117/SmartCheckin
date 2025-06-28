import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { UserProvider } from "../context/UserContext";
import { EventProvider } from "../context/EventsContext";
import Toast from "react-native-toast-message";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <>
      <UserProvider>
        <EventProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <StatusBar
              barStyle={
                colorScheme === "dark" ? "light-content" : "dark-content"
              }
              backgroundColor={colorScheme === "dark" ? "black" : "#FFF"}
            />
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" options={{ headerShown: false }} />
              <Stack.Screen
                name="QrScanScreen"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="NFCScreen" options={{ headerShown: false }} />
              <Stack.Screen
                name="EventLists"
                options={{ headerShown: false, presentation: "modal" }}
              />
              <Stack.Screen name="Admin" options={{ headerShown: false }} />
            </Stack>
          </ThemeProvider>
        </EventProvider>
      </UserProvider>
    </>
  );
}
