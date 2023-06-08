import { addDoc, setDoc, collection, getDocs, deleteDoc, doc, getDoc, updateDoc, arrayUnion, query, onSnapshot, where, orderBy, limit, serverTimestamp } from 'firebase/firestore'; 
import { db } from './firebase';
import { getDownloadURL } from './storage';

// Name of receipt collection in Firestore
const PORTRAIT_COLLECTION_REF = collection(db, 'portraits');

export async function getAllUsers() {
  const allUsers = []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      allUsers.push({...doc.data(), uid: doc.id})
    });
    return allUsers
}

export async function getAllCustomers() {
  const allUsers = []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
      // doc.data() is never undefined for query doc snapshots
      if (doc.data().roles.includes('artist')) allUsers.push({...doc.data(), uid: doc.id})
    });
    return allUsers
}

//Add USER on sign in
export async function getUser(user) {
  const docSnap = await getDoc(doc(db, "users", user.uid));

  if (!docSnap.exists()) {
    const newUser = addUser(user)
    return (newUser)
  } else {
    return {...docSnap.data(), uid: user.uid}
  }
}

//Adds a new user to Users collection on registration
export function addUser(user) {
  const userRef = setDoc(doc(db, 'users', user.uid), { 
    email: user.email,
    displayName: user.displayName,
    roles: ["customer"]
  })
  console.log('userRef in addUser is: ', userRef)
  return {uid: user.uid, email: user.email, displayName: user.displayName, roles: ["customer"] }
}

export function updateUser(userId, role) {
  console.log(userId)
  updateDoc(doc(db, 'users', userId), { 
    roles: [role]
  });
}


//Add new corporate consult data
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

export async function getAllConsults() {
  const allConsults = []
    const querySnapshot = await getDocs(collection(db, "consults"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      allConsults.push({...doc.data(), uid: doc.id})
    });
    return allConsults
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
  const imageUrl = await getDownloadURL(imageBucket)
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
export function addChatMessage( portraitId, message, displayName, uid  ) {
  addDoc(collection(db, "messages"), {
    portraitId: portraitId,
    text: message,
    name: displayName,
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