import { Alert, Image, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { homeFeed as rawHomeFeed } from "@/placeholder";
import ImageItem from '@/components/ImageItem';
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type FavoriteItem = {
  id: string;
  image: string;
  caption: string;
  createdBy: string;
};

const favoriteItem: FavoriteItem[] = rawHomeFeed; // will need to change for part two

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
      console.log(`Updated favorites:`, [...newfavorites]);
      return newfavorites;
    });
  };

  const renderItem = ({ item }: { item: FavoriteItem }) => (
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
      <View style={styles.favoriteContainer}>
        <FlashList
          data={favoriteItem}
          renderItem={renderItem}
          keyExtractor={(item: FavoriteItem) => item.id}
          estimatedItemSize={250}
          extraData={{visibleCaption, favorites}}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  favoriteContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
