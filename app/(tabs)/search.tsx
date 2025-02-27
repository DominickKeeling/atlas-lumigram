import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Search</Text>
      <Link href="/profile/1">
        <Text>Profile 1</Text>
      </Link>
      <Link href="/profile/1">
        <Text>Profile 2</Text>
      </Link>
    </View>
  )
}