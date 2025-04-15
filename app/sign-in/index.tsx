import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { signIn } from "@/utils/auth";
import { Link } from "expo-router";

export default function SignInScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      router.navigate("/notes");
    } catch (error: any) {
      console.error("Could not Sign In");
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title="Sign In"
        onPress={handleSignIn}
        disabled={!email || !password}
      />

      <Text style={{ fontSize: 16, color: "#333" }}>
        New here ?{" "}
        <Link
          href={"/sign-up"}
          style={{ textDecorationLine: "underline", color: "#007bff" }}
        >
          sign up
        </Link>
      </Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  error: {
    marginTop: 10,
    color: "red",
    textAlign: "center",
  },
});
