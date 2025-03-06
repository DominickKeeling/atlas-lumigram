import { Button, Text, View, Image, Pressable } from 'react-native';
import { useImagePicker } from '@/hooks/useImagePicker';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Loading from '@/components/Loading';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import storage from '@/lib/storage';

export default function Page() {
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { image, openImagePicker, reset } = useImagePicker();

  async function save() {
    if(!image) return;
    const name = image?.split("/").pop() as string;
    const {downloadUrl, metadata} = await storage.upload(image, name )
    console.log(downloadUrl);
  }
    
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.footerContainer}>
        {!image && (
          <View style={styles.addPhotoContainer}>
            <Image source={require('@/assets/images/placeholder.png')} style={styles.placeholderImage} />
            <Pressable style={styles.choosePhotoButton} onPress={openImagePicker}>
              <Text style={styles.choosePhotoText}>Choose a photo</Text>
            </Pressable>
          </View>
        )}
        {image && (
          <View style={styles.addImageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <TextInput
              style={styles.input}
              placeholder="Add a caption"
              placeholderTextColor="grey"
              value={caption}
              onChangeText={setCaption}
            />
            <Pressable style={styles.saveButton} onPress={() => alert("Save")}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
            <Pressable style={styles.resetButton} onPress={reset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </Pressable>
          </View>
        )}
      </View>
      {loading && <Loading />}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addPhotoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  choosePhotoButton: {
    backgroundColor: "#1ED2AF",
    padding: 10,
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 18,
    marginRight: 18
  },
  choosePhotoText: {
    color: "#FAFAFA"
  },
  placeholderImage: {
    width: 350,
    height: 350,
    margin: 20,
    borderRadius: 10,

  },
  footerContainer: { 
    alignItems: 'center',
    padding: 20
  },
  addImageContainer: {
    gap: 20,
    alignItems: 'center'
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 10,
    marginBottom: 20
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 2,
    borderColor: "#1ED2AF",
    borderRadius: 4,
    paddingLeft: 20,
    paddingRight: 275
    
  },
  saveButton: {
    backgroundColor: "#1ED2AF",
    paddingVertical: 20,
    paddingHorizontal: 145,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,    
  },
  saveButtonText: {
    color: "#FAFAFA",
    fontWeight: "bold",
    fontSize: 16,
  },
  resetButton: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  resetButtonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#555555"
  }
});