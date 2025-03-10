import { usePermissions } from "expo-media-library";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export function useImagePicker() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [status, requestPermissions] = usePermissions();

  async function openImagePicker() {
    if (status === null) {
      const permission = await requestPermissions();
      if (permission.granted === false) {
        alert("You need to grant permission to access your images");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  function reset() {
    alert("reset");
  }

  return { image, openImagePicker, reset };
}