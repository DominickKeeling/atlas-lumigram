import { View, Text, Image, StyleSheet } from 'react-native';
import Gestures from './Gestures';

type HomeFeedItem = {
  id: string;
  image: string;
  caption: string;
  createdBy: string;
};

type ImageItemProps = {
  item: HomeFeedItem;
  isFavorite: boolean;
  visibleCaption: string | null;
  onToggleFavorite: (id: string) => void;
  onShowCaption: (id: string) => void;
};

const ImageItem = ({ item, isFavorite, visibleCaption, onToggleFavorite, onShowCaption }: ImageItemProps) => {
  return (
    <Gestures 
      onDoubleTap={() => onToggleFavorite(item.id)}
      onLongPress={() => onShowCaption(item.id)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }}
          style={styles.image}
        />
        {visibleCaption === item.id ? (
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>{item.caption}</Text>
          </View>
        ) : null}
        {isFavorite && (
          <View style={styles.favoriteContainer}>
            <Text style={styles.favoriteText}>❤️</Text>
          </View>
        )}     
      </View>
    </Gestures>
  );
};

export default ImageItem;

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  captionContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  caption: {
    color: 'white',
    fontSize: 14,
  },
  favoriteContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 5,
    borderRadius: 10,
  },
  favoriteText: {
    color: 'white',
    fontSize: 18,
  }
});