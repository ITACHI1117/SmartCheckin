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

export default function Index() {
  const {
    user,
    LoginLoading,
    email,
    password,
    LoginError,
    Login,
    handelChange,
  } = useUser();

  const { border, text, background } = useThemeStyles();

  const router = useRouter();

  user && router.replace("/QrScanScreen");

  return (
    <ThemedView style={{ height: "100%" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          enabled={true}
          //   behavior={Platform.OS === "ios" ? "padding" : "height"}
          // style={{ flex: 1, width: "100%" }}
        >
          <View style={styles.container}>
            <ThemedText type="title">Login</ThemedText>
            <View style={{ marginTop: 30 }}>
              <ThemedText type="label">Email</ThemedText>
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
                  placeholder="john@example.com"
                  color={text}
                  value={email}
                  onChangeText={(text) => handelChange("email", text)}
                  //onChangeText={handlePasswordChange}
                />
                <Ionicons
                  style={{ position: "absolute", right: 35, top: "30%" }}
                  name="mail-outline"
                  size={20}
                  color="gray"
                />
              </View>
              {/* password */}
              <ThemedText type="label">Password</ThemedText>
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
                  placeholder="***********"
                  value={password}
                  onChangeText={(text) => handelChange("password", text)}
                  //onChangeText={handlePasswordChange}
                  color={text}
                  // secureTextEntry={viewPassword}
                />
                <MaterialCommunityIcons
                  // onPress={() => ViewInputPassword()}
                  name="eye-off-outline"
                  size={20}
                  color="gray"
                  style={{ position: "absolute", right: 35, top: "30%" }}
                />
              </View>
              {/* password entry green */}
              {/* Policy */}
              <View style={styles.policy}>
                {LoginError ? (
                  <ThemedText
                    style={{ width: "80%", color: "red" }}
                    type="tiny"
                  >
                    {LoginError}
                  </ThemedText>
                ) : (
                  <ThemedText
                    style={{ width: "80%", textDecorationLine: "underline" }}
                    type="tiny"
                  ></ThemedText>
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
          bottom: "6%",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* <Link replace href="/HomeScreen" asChild> */}
        <TouchableOpacity
          style={[styles.LoginButton, { backgroundColor: border }]}
          onPress={Login}
        >
          {LoginLoading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <ThemedText style={{ color: background }} type="button">
              Login
            </ThemedText>
          )}
        </TouchableOpacity>
        {/* </Link> */}
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Link href="/QrScanScreen" asChild>
            <TouchableOpacity>
              <ThemedText style={{ color: text }} type="tiny">
                Don't have an account?{" "}
                <ThemedText
                  style={{
                    color: text,
                    textDecorationLine: "underline",
                  }}
                  type="tiny"
                >
                  Create account
                </ThemedText>
              </ThemedText>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ThemedView>
  );
}
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
    marginTop: 0,
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
