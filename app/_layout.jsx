import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { UserProvider } from "../context/UserContext";
import { EventProvider } from "../context/EventsContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <UserProvider>
      <EventProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" options={{ headerShown: false }} />
            <Stack.Screen
              name="QrScanScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventLists"
              options={{ headerShown: false, presentation: "modal" }}
            />
            <Stack.Screen name="Admin" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </EventProvider>
    </UserProvider>
  );
}
