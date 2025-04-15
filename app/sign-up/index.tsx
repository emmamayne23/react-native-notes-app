// app/signup.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { signUp } from "@/utils/auth";

const SignUpScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      setMessage("Check your email to confirm sign up.");
      setError("");
      // Optionally navigate to sign-in:
      router.navigate("/sign-in");
    } catch (error: any) {
      console.error("Sign up failed", error);
      setError(error.message || "Sign up failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>

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
        title="Sign Up"
        onPress={handleSignUp}
        disabled={!email || !password}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 16, color: "#333" }}>
          Already have an account?{" "}
          <Link
            href={"/sign-in"}
            style={{ textDecorationLine: "underline", color: "#007bff" }}
          >
            sign in
          </Link>
        </Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

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
  message: {
    marginTop: 10,
    color: "green",
    textAlign: "center",
  },
});

export default SignUpScreen;
