import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Page() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>User Profile for: {id}</Text>
    </View>
  )
}