import { Link, useRouter } from 'expo-router';
import { openAuthSessionAsync } from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Pressable, Text, View, TextInput, StyleSheet, Image } from 'react-native';
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';
import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    signOut(auth).catch((error) => console.log("Error logging out:", error));
  }, []);

  const login = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)");
    } catch (error) {
      setError("Invalid email or password.");
    }
  }
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.loginHeader}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={"#E0E0E0"}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={"#E0E0E0"}
        secureTextEntry={true}
      />
      <Pressable
        onPress={login}
        style={styles.signInButton}
      >
        <Text style={styles.signInText}>
          Sign In
        </Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/register")}
        style={styles.createAccount}
      >
        <Text style={styles.buttonText}>Create a new account</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({

container: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#00003C"
},
logo: {
  width: 260,
  height: 160,
  resizeMode: "contain",
  marginBottom: 40,
},
loginHeader: {
  fontSize: 20,
  color: "#fff",
  marginBottom: 20,
  fontWeight: 'bold'
},
input: {
  width: '92%',
  borderWidth: 1,
  borderColor: '#1ED2AF',
  borderRadius: 4,
  marginBottom: 10,
  color: "white",
  paddingLeft: 8,
  paddingTop: 15,
  paddingBottom: 15
},
signInText: {
  color: "#fff",
},
signInButton: {
  backgroundColor: "#1ED2AF",
  color: "white",
  width: "92%",
  borderWidth: 1,
  borderColor: "#1ED2AF",
  borderRadius: 4,
  padding: 10,
  alignItems: "center",
  marginTop: 18,
  marginBottom: 9
},
buttonText: {
  color: "#E0E0E0",
},
createAccount: {
  width: "92%",
  borderWidth: 2,
  borderColor: "black",
  borderRadius: 4,
  padding: 10,
  alignItems: "center",
},
linkWrapper: {
  alignItems: "center"
}
})