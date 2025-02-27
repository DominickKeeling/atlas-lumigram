import { Alert, Image, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { homeFeed as rawHomeFeed } from "@/placeholder";
import ImageItem from '@/components/ImageItem';
import { useState } from "react";

type HomeFeedItem = {
  id: string;
  image: string;
  caption: string;
  createdBy: string;
};

const homeFeed: HomeFeedItem[] = rawHomeFeed;

export default function HomeScreen() {
  const [visibleCaption, setVisibleCaption] = useState<string | null>(null);

  const handleLongPress = (id: string) => {
    setVisibleCaption(id);
  };

  const handleDoubleTap = (caption: string) => {
    Alert.alert(`${caption} double-tapped`);
  };

  const renderItem = ({ item }: { item: HomeFeedItem }) => (
    <ImageItem
    item={item}
    visibleCaption={visibleCaption}
    onDoubleTap={handleDoubleTap}
    onLongPress={handleLongPress}
    />
  )

  return (
    <View style={styles.homepageContainer}>
      <FlashList
        data={homeFeed}
        renderItem={renderItem}
        keyExtractor={(item: HomeFeedItem) => item.id}
        estimatedItemSize={250}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homepageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
