import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export function LogoutComponent() {
  const router = useRouter();
  
  const logout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.log("Logout failed");
    }
  };

  return <Pressable onPress={logout}>
    <Ionicons name="log-out-outline" size={24} style={{ marginRight: 16 }} />
  </Pressable>
}