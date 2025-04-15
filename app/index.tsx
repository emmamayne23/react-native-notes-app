import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import PostItImage from "@/assets/images/post-it.png"
import { useAuth } from "@/lib/AuthProvider";
import { signOut } from "@/utils/auth";

export default function Index() {
  const router = useRouter()

  const { user } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace("/sign-in")
    } catch (error) {
      console.error("Failed to sign out", error)
    }
  }
  return (
    <View
      style={styles.container}
    >
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
      <Text style={{ fontWeight: "600" }}>Welcome {user?.email ?? "Guest"}!</Text>
      <Image source={PostItImage} style={styles.image} />
      <Text style={styles.title}>Welcome to Notes App</Text>
      <Text style={styles.subtitle}>Capture Your thoughts anytime, anywhere</Text>
      {
        user ? <TouchableOpacity style={styles.button} onPress={() => router.push("/notes")}>
        <Text style={styles.text}>Start Writing</Text>
      </TouchableOpacity>
      : <TouchableOpacity style={styles.button} onPress={() => router.push("/sign-up")}>
      <Text style={styles.text}>Get Started</Text>
    </TouchableOpacity>
    
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  signOutButton: {
    padding: 10,
    alignSelf: "flex-end",
    backgroundColor: "#ff4d4d",
    borderRadius: 8,
    marginBottom: 20,
  },
  signOutText: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
})
