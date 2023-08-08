import { format } from 'date-fns';
import { deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';
 
// Bucket URL from Storage in Firebase Console
const BUCKET_URL = "gs://wattleartcreations.appspot.com";
 
// Uploads image and returns the storage bucket
export async function uploadImage(image, portraitId) {
  const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
  
  const bucket = `${BUCKET_URL}/${portraitId}/${formattedDate}.jpg`;
 
  const checking = await uploadBytes(ref(storage, bucket), image);

  return bucket;
}

// Uploads MULTIPLE images and returns the storage bucket
export async function uploadImages(images, portraitId) {
  const uploadedImgs = []
  
  for (const file of images) {
    //const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
    const bucket = `${BUCKET_URL}/${portraitId}/${file.name}`;
    await uploadBytes(ref(storage, bucket ), file)
    uploadedImgs.push(bucket)
  }
  
  return uploadedImgs;
}

// Replaces existing image in storage and returns the storage bucket
export function replaceImage(image, bucket) {
  uploadBytes(ref(storage, bucket), image);
}

// Deletes existing image in storage
export function deleteImage(id, name) {
  // Delete the file
  deleteObject(ref(storage, `${id}/${name}`))
}

// Gets the download URL from the reference URL
export async function getDownloadURL(bucket) {
  return await getStorageDownloadURL(ref(storage, bucket));
}

// Gets the download URLs from the reference URL
export async function getDownloadURLs(bucket) {
  const urls = []
  for (const file of bucket) {
    const downlaodUrl = await getStorageDownloadURL(ref(storage, file))
    urls.push(downlaodUrl)
  }
  return urls
}

export async function downloadImage(url) {
  
  var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(xhr.response);
    a.download = "finalImage.jpg"; // Name the file anything you'd like.
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
  };
  xhr.open('GET', url);
  xhr.send();
}