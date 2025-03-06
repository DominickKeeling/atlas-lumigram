import { Alert, Image, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { homeFeed as rawHomeFeed } from "@/placeholder";
import ImageItem from '@/components/ImageItem';
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type HomeFeedItem = {
  id: string;
  image: string;
  caption: string;
  createdBy: string;
};

const homeFeed: HomeFeedItem[] = rawHomeFeed;

export default function HomeScreen() {
  const [visibleCaption, setVisibleCaption] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleShowCaption = (id: string) => {
    console.log(`Showing caption for Image ${id}`);
    setVisibleCaption((prevCaption) => (prevCaption === id ? null : id));
  };

  const handleToggleFavorite = (id: string) => {
    console.log(`Toggling favorite for Image ${id}`);
    setFavorites((prevFavorites) => {
      const newfavorites = new Set(prevFavorites);
      if (newfavorites.has(id)) {
        newfavorites.delete(id);
      } else {
        newfavorites.add(id);
      }
      console.log(`Update favorites:`, [...newfavorites]);
      return newfavorites;
    });
  };

  const renderItem = ({ item }: { item: HomeFeedItem }) => (
    <ImageItem
      item={item}
      isFavorite={favorites.has(item.id)}
      visibleCaption={visibleCaption}
      onToggleFavorite={handleToggleFavorite}
      onShowCaption={handleShowCaption}
    />
  )

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.homepageContainer}>
        <FlashList
          data={homeFeed}
          renderItem={renderItem}
          keyExtractor={(item: HomeFeedItem) => item.id}
          estimatedItemSize={250}
          extraData={{visibleCaption, favorites}}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  homepageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
