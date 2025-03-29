import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" screenOptions={{ headerShown: false }} />
      <Stack.Screen name="dashboard" />
    </Stack>
  );
}
