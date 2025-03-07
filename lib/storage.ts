import { storage } from "@/firebaseConfig";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";



async function upload(uri: string, name: string) {
  console.log("Uploading image from URI:", uri);
  try {

    console.log("Uploading image from URI:", uri);

    const encodedUri = encodeURI(uri);
    console.log("Encoded URI:", encodedUri);

    const response = await fetch(uri);
    const blob = await response.blob();
    const imageRef = ref(storage, `images/${name}`);
    const result = await uploadBytes(imageRef, blob);

    const downloadUrl = await getDownloadURL(result.ref);
    console.log("Image uploaded successfully:", downloadUrl);

    const metadata = result.metadata;

    return { downloadUrl, metadata };
  } catch (error) {
    console.log("Error uplading image", error);
    throw error;
  }
}

export default {
  upload,
};