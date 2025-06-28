import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CameraView, useCameraPermissions, Camera } from "expo-camera";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeStyles } from "@/hooks/useThemeStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useUser } from "../context/UserContext";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEvent } from "../context/EventsContext";

export default function QrScanScreen() {
  const { user, dispatch } = useUser();
  const { getAllEvents, allEvents } = useEvent();
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanedData, setScannedData] = useState(null);

  const router = useRouter();
  const { border, text } = useThemeStyles();

  if (!permission) {
    // Permission is still loading
    return (
      <View style={styles.container}>
        <Text>Loading permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    console.log("Permission not granted. Requesting...");
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to access the camera
        </Text>
        <Button
          onPress={async () => {
            try {
              const response = await requestPermission();
              console.log("Request Permission Response:", response);
            } catch (error) {
              console.log("Error requesting permission:", error);
            }
          }}
          title="Grant Permission"
        />
      </View>
    );
  }

  // Set Camera Facing (Front Camera or BAck)
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  //  Handel the Qr Scanned
  const handleScannedData = async (data) => {
    await getAllEvents();
    allEvents && router.navigate(`/EventLists`);
  };

  // Handel Log out
  const handleLogOut = () => {
    dispatch({ type: "LOGOUT", payload: null });
    router.replace("/");
  };

  const handleNfc = () => {
    router.replace("/NFCScreen");
  };

  return (
    <ThemedView style={{ display: "flex", height: "100%", gap: 0 }}>
      <ThemedView
        style={{
          padding: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ThemedText
          style={{
            fontSize: 25,
            fontWeight: "bold",
            padding: 10,
          }}
        >
          {user.lastName} {user.firstName}
        </ThemedText>
        <TouchableOpacity onPress={() => handleLogOut()}>
          <AntDesign
            name="logout"
            size={24}
            color={border}
            style={{ padding: 20 }}
          />
        </TouchableOpacity>
      </ThemedView>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleScannedData}
      />

      <ThemedView style={styles.container}>
        <ThemedText
          style={{
            fontSize: 40,
            fontWeight: "bold",
            paddingTop: 30,
            paddingBottom: 30,
          }}
        >
          Scan Qr Code
        </ThemedText>
        <MaterialCommunityIcons name="qrcode-scan" size={150} color={text} />
        <ThemedText>{scanedData}</ThemedText>
      </ThemedView>
      <TouchableOpacity
        onPress={handleNfc}
        style={[styles.button, { borderColor: border }]}
      >
        <ThemedText style={[styles.text, { color: text }]}>Use NFC</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

{
  /* <TouchableOpacity
        onPress={toggleCameraFacing}
        style={[styles.button, { borderColor: border }]}
      >
        <ThemedText style={[styles.text, { color: text }]}>
          Flip Camera
        </ThemedText>
      </TouchableOpacity> */
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "50%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "",
    position: "relative",
    marginTop: 20,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    width: "100%",
    height: "40%",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
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
    borderRadius: 10,
    position: "absolute",
    alignSelf: "center",
    bottom: 30,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
