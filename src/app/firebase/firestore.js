import { addDoc, collection, getDocs, deleteDoc, doc, getDoc, updateDoc, arrayUnion, query, onSnapshot, where, orderBy, limit, serverTimestamp } from 'firebase/firestore'; 
import { db } from './firebase';
import { getDownloadURL } from './storage';

// Name of receipt collection in Firestore
const PORTRAIT_COLLECTION_REF = collection(db, 'portraits');

//const CHARACTER_COLLECTION_REF = collection(db, 'portraits', portraitId, 'characters');

//Get All Users - NEEDS WORK
// export async function getAllUsers() {
//   const listAllUsers = (nextPageToken) => {
//     // List batch of users, 1000 at a time.
//     getAuth()
//       .listUsers(1000, nextPageToken)
//       .then((listUsersResult) => {
//         listUsersResult.users.forEach((userRecord) => {
//           console.log('user', userRecord.toJSON());
//         });
//         if (listUsersResult.pageToken) {
//           // List next batch of users.
//           listAllUsers(listUsersResult.pageToken);
//         }
//       })
//       .catch((error) => {
//         console.log('Error listing users:', error);
//       });
//   };
//   // Start listing users from the beginning, 1000 at a time.
//   listAllUsers();

//   const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// }


//cORPORATE cONSULT
export function addConsult( data) {
  console.log('in add CONSULT: ', data.customerFirstName)
  const consultRef = addDoc(collection(db, 'consults'), { 
    category: data.category, 
    subcategories: data.subcategories, 
    questions: data.questions, 
    generalAnswers: data.generalAnswers,
    advertisingAnswers: data.advertisingAnswers,
    storyAnswers: data.storyAnswers,
    tableAnswers: data.tableAnswers,
    videoGameAnswers: data.videoGameAnswers,
    price: '',
    customerFirstName: data.customerFirstName,
    customerLastName: data.customerLastName,
    customerEmail: data.customerEmail,
    consultant: '',
    date: new Date,
    status: 'Pending',
    lastUpdatedStatus: new Date,
    paymentComplete: false,
  })
  return consultRef
}

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

//returns an array of all portraits
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

//Get one Portrait from uid
export async function getPortrait(uid) {
  console.log('getting portrait')
  const docSnap = await getDoc(doc(db, "portraits", uid));

  if (docSnap.exists()) {
    return {
      ...docSnap.data(), 
      uid: uid     
    }
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return ({})
  }
}

export async function updatePortraitWithImage(portraitId, {userId, imageBucket}) {
  console.log('made it to here')
  const imageUrl = await getDownloadURL(imageBucket)
  console.log('changed the url: ', imageUrl)
  updateDoc(doc(db, 'portraits', portraitId), { images: arrayUnion({userId, imageUrl})})
}

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

//returns all portraits that are not claimed for portrait queue
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

// export async function getCharacters() {
//   const querySnapshot = await getDocs(collection(db, CHARACTER_COLLECTION));
//   console.log('in get all characters', querySnapshot)
//   const charArr = []
//   querySnapshot.forEach((doc) => {
//     charArr.push({ id: doc.id, ...doc.data() })
//   });
//   return charArr
// }



// Deletes receipt with given @id.
export function deleteCharacter(id) {
  deleteDoc(doc(db, CHARACTER_COLLECTION, id));
}

//Add chat message
export function addChatMessage( portraitId, message, email, uid  ) {
  addDoc(collection(db, "messages"), {
    portraitId: portraitId,
    text: message,
    name: email,
    createdAt: serverTimestamp(),
    uid,
  });
}

// Get All chat messages
export async function getChats(setMessages, portraitId) {
  const q = query(collection(db, "messages"), where("portraitId", "==", portraitId), orderBy("createdAt"), limit(50));
  
  console.log('q in get chats is: ', q)
  
  const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    let messages = [];
    QuerySnapshot.forEach((doc) => {
      messages.push({ ...doc.data(), id: doc.id });
    });
    setMessages(messages);
  });
  return unsubscribe;
}