import { addDoc, collection, getDocs, deleteDoc, doc, getDoc, updateDoc, arrayUnion, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'; 
import { db } from './firebase';
import { getDownloadURL } from './storage';

// Name of receipt collection in Firestore
const PORTRAIT_COLLECTION_REF = collection(db, 'portraits');

//const CHARACTER_COLLECTION_REF = collection(db, 'portraits', portraitId, 'characters');

//Portraits
export function addPortrait( data) {
  console.log('in add portrait: ', data.customer)
  const portraitRef = addDoc(collection(db, 'portraits'), { 
    styleOne: data.styleOne, 
    styleTwo: data.styleTwo, 
    styleThree: data.styleThree, 
    characters: data.characters,
    questions: data.questions, 
    price: '',
    customer: data.customer,
    artist: '',
    date: new Date,
    status: 'Pending',
    lastUpdatedStatus: new Date,
    paymentComplete: false,
  })
  return portraitRef
}

//add artist to portrait when claimed
export function addArtist( portraitId, artistId) {
  updateDoc(doc(db, 'portraits', portraitId), { 
    artist: artistId,
    status: 'Claimed'
  });
}


/* 
 Adds character to Portrait in Firestore with given character information:
*/
export function addChar( portraitId, bodyStyle, numCharVariations, pets, numPets, extras) {
  // console.log('calling addDoc in character uid and style', uid, style, bodyStyle, numCharVariations, pets, numPets, extras)
  updateDoc(doc(db, 'portraits', portraitId), { 
    characters: arrayUnion({bodyStyle, numCharVariations, pets, numPets, extras })
  });
}



// export async function getPortrait( portraitId ) {
//   const docRef = doc(db, 'portraits', portraitId)
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//     return docSnap.data().characters
//   } else {
//     // docSnap.data() will be undefined in this case
//     console.log("No such document!");
//     return []
//   }
// }

//returns array of customers portraits
export async function getCustomersPortraits( uid ) {
  const q = query(collection(db, "portraits"), where("customer", "==", uid));
  const portraits = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    portraits.push({...doc.data(), uid: doc.id})
  });
  return portraits
}

//returns all portraits
export async function getAllPortraits() {
  const allPortraits = []
    const querySnapshot = await getDocs(collection(db, "portraits"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      allPortraits.push({...doc.data(), uid: doc.id})
    });
    return allPortraits
} 

//returns all portraits that are not claimed
export async function getAllUnclaimed() {
  const unclaimed = []
  const q = query(collection(db, "portraits"), where("artist", "==", ""));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    unclaimed.push({...doc.data(), uid: doc.id})
  });
  return unclaimed
}

//returns array of artists claimed portraits
export async function getArtistsPortraits( uid ) {
  const q = query(collection(db, "portraits"), where("artist", "==", uid));
  const portraits = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    portraits.push({...doc.data(), uid: doc.id})
  });
  return portraits
}

/* 
 Adds receipt to Firestore with given receipt information:
 - address: address at which purchase was made
 - amount: amount of expense
 - date: date of purchase
 - imageBucket: bucket at which receipt image is stored in Firebase Storage
 - items: items purchased
 - locationName: name of location
 - uid: user ID who the expense is for
*/



// export async function getCharacters() {
//   const querySnapshot = await getDocs(collection(db, CHARACTER_COLLECTION));
//   console.log('in get all characters', querySnapshot)
//   const charArr = []
//   querySnapshot.forEach((doc) => {
//     charArr.push({ id: doc.id, ...doc.data() })
//   });
//   return charArr
// }

/* 
 Returns list of all receipts for given @uid.
 Each receipt contains:
 - address: address at which purchase was made
 - amount: amount of expense
 - date: date of purchase
 - id: receipt ID
 - imageUrl: download URL of the stored receipt image
 - imageBucket: bucket at which receipt image is stored in Firebase Storage
 - items: items purchased
 - locationName: name of location
 - uid: user id of which the receipt is for
*/
// export async function getReceipts(uid, setReceipts, setIsLoadingReceipts) {
//   const receiptsQuery = query(collection(db, RECEIPT_COLLECTION), where("uid", "==", uid), orderBy("date", "desc"));

//   const unsubscribe = onSnapshot(receiptsQuery, async (snapshot) => {
//     let allReceipts = [];
//     for (const documentSnapshot of snapshot.docs) {
//       const receipt = documentSnapshot.data();
//       allReceipts.push({
//         ...receipt, 
//         date: receipt['date'].toDate(), 
//         id: documentSnapshot.id,
//         imageUrl: await getDownloadURL(receipt['imageBucket']),
//       });
//     }
//     setReceipts(allReceipts);
//     setIsLoadingReceipts(false);
//   })
//   return unsubscribe;
// }

// // Updates receipt with @docId with given information.
// export function updateReceipt(docId, uid, date, locationName, address, items, amount, imageBucket) {
//   setDoc(doc(db, RECEIPT_COLLECTION, docId), { uid, date, locationName, address, items, amount, imageBucket });
// }

// Deletes receipt with given @id.
export function deleteCharacter(id) {
  deleteDoc(doc(db, CHARACTER_COLLECTION, id));
}