import { Link, useRouter } from 'expo-router';
import { Pressable, Text, View, TextInput, StyleSheet, Image } from 'react-native';

export default function Page() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.loginHeader}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"#E0E0E0"}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={"#E0E0E0"}
        secureTextEntry
      />
      <Pressable
        onPress={() => {
          router.replace("/(tabs)");
          }}
        style={styles.signInButton}
      >
        <Text style={styles.signInText}>
          Create Account
        </Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/login")}
        style={styles.createAccount}
      >
        <Text style={styles.buttonText}>Login to existing account</Text>
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