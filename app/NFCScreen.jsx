// import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
// import { ThemedText } from "@/components/ThemedText";
// import NfcManager, { NfcTech } from "react-native-nfc-manager";
// import { useEffect, useState } from "react";

// // Start NFC Manager
// NfcManager.start();

// const NFCScreen = () => {
//   const [nfcData, setNfcData] = useState(null);

//   useEffect(() => {
//     const initNFC = async () => {
//       try {
//         const isSupported = await NfcManager.isSupported();
//         if (!isSupported) {
//           Alert.alert("NFC Not Supported", "This device does not support NFC.");
//           return;
//         }

//         const isEnabled = await NfcManager.isEnabled();
//         if (!isEnabled) {
//           Alert.alert("NFC Disabled", "Please enable NFC to proceed.");
//         }
//       } catch (err) {
//         console.warn("NFC Initialization Error:", err);
//       }
//     };

//     initNFC();

//     return () => {
//       NfcManager.setEventListener(NfcTech.Ndef, null);
//       NfcManager.setEventListener(NfcTech.NfcA, null);
//     };
//   }, []);

//   const readNdef = async () => {
//     try {
//       console.log("Requesting NFC...");
//       await NfcManager.requestTechnology(NfcTech.Ndef);

//       console.log("Waiting for NFC tag...");
//       const tag = await NfcManager.getTag();
//       console.log("Tag found:", tag);

//       if (tag) {
//         setNfcData(tag);
//         // Alert.alert("Tag Found", JSON.stringify(tag));
//       } else {
//         Alert.alert("No Data", "No NFC tag data found.");
//       }
//     } catch (error) {
//       console.warn("Error reading NFC tag:", error);
//       Alert.alert("Error", "Failed to read NFC tag. Please try again.");
//     } finally {
//       console.log("Stopping NFC scan...");
//       NfcManager.cancelTechnologyRequest();
//     }
//   };

//   return (
//     <View style={styles.wrapper}>
//       <ThemedText style={styles.title}>NFC Scanner</ThemedText>

//       <TouchableOpacity style={styles.scanButton} onPress={readNdef}>
//         <ThemedText style={styles.scanText}>Scan NFC Tag</ThemedText>
//       </TouchableOpacity>

//       {nfcData && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultTitle}>NFC Tag Data:</Text>
//           <ThemedText style={styles.resultText}>
//             {JSON.stringify(nfcData)}
//           </ThemedText>
//         </View>
//       )}
//     </View>
//   );
// };

// export default NFCScreen;

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#121212",
//   },
//   title: {
//     fontSize: 24,
//     color: "#FFF",
//     marginBottom: 20,
//   },
//   scanButton: {
//     backgroundColor: "#3498db",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   scanText: {
//     color: "#FFF",
//     fontSize: 18,
//   },
//   resultContainer: {
//     marginTop: 30,
//     padding: 15,
//     backgroundColor: "#333",
//     borderRadius: 10,
//     width: "90%",
//   },
//   resultTitle: {
//     fontSize: 18,
//     color: "#FFF",
//     marginBottom: 10,
//   },
//   resultText: {
//     color: "#FFF",
//   },
// });
