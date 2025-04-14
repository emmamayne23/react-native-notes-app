import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import PostItImage from "@/assets/images/post-it.png"

export default function Index() {
  const router = useRouter()
  return (
    <View
      style={styles.container}
    >
      <Image source={PostItImage} style={styles.image} />
      <Text style={styles.title}>Welcome to Notes App</Text>
      <Text style={styles.subtitle}>Capture Your thoughts anytime, anywhere</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/notes")}>
        <Text style={styles.text}>Get Started</Text>
      </TouchableOpacity>
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
