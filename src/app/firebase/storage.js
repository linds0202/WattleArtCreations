import { format } from 'date-fns';
import { deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';
 
// Bucket URL from Storage in Firebase Console
const BUCKET_URL = "gs://wattle-commission-site.appspot.com";//gs://wattleartcreations.appspot.com
 
// Uploads image and returns the storage bucket
export async function uploadImage(image, portraitId) {
  const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
  
  const bucket = `${BUCKET_URL}/${portraitId}/${formattedDate}.jpg`;
 
  const checking = await uploadBytes(ref(storage, bucket), image);

  return bucket;
}

// Uploads image and returns the storage bucket
export async function uploadArtistPortfolioImage(image, artistId, num) {
  
  const bucket = `${BUCKET_URL}/${artistId}/${num}.jpg`;
 
  const checking = await uploadBytes(ref(storage, bucket), image);

  return bucket;
}

// Uploads MULTIPLE images and returns the storage bucket
export async function uploadImages(uploads, portraitId) {
  const uploadedImgs = []

  for (const upload of uploads) {
    const imgSet = []
    for (const file of upload.files) {
      //const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
      const bucket = `${BUCKET_URL}/${portraitId}/${file.name}`;
      await uploadBytes(ref(storage, bucket ), file)
      imgSet.push(bucket)
    }
    uploadedImgs.push(imgSet)
  }
  
  return uploadedImgs;
}

// Replaces existing image in storage and returns the storage bucket
export async function replaceImage(image, bucket) {
  const checking = await uploadBytes(ref(storage, bucket), image);
  return bucket
}

// Deletes existing image in storage
export function deleteImage(id, name) {
  // Delete the file
  deleteObject(ref(storage, `${id}/${name}`))
}

// Deletes existing images in storage
export async function deleteImages(id, names) {
  // Delete the file
  for(const name of names) {
    await deleteObject(ref(storage, `${id}/${name}`))
  }
  
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
 
  // const filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0]
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'blob'
  xhr.onload = function() {
    let a = document.createElement('a')
    a.href = window.URL.createObjectURL(xhr.response)
    a.download = "finalImage.jpg" // Name the file anything you'd like.
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
  };
  xhr.open('GET', url)
  xhr.send()
}