import { 
  addDoc,
  setDoc,
  collection, 
  getDocs, 
  deleteDoc, 
  doc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  query, 
  onSnapshot, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp, 
  increment
} from 'firebase/firestore'; 
import { db } from './firebase';
import { getDownloadURL } from './storage';
import { getDownloadURLs } from './storage';

export async function getAllUsers() {
  const allUsers = []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      allUsers.push({...doc.data(), uid: doc.id})
    });
    return allUsers
}

export async function getAllCustomers() {
  const allCustomers = []  
  const q = query(collection(db, "users"), where("roles", "==", 'Customer'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      allCustomers.push({...doc.data(), uid: doc.id})
    });
    return allCustomers
}

export async function getAllArtists() {
  const allArtists = []  
  const q = query(collection(db, "users"), where("roles", "==", 'Artist'));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    allArtists.push({...doc.data(), uid: doc.id})
  });
  return allArtists
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

//Get user by Id
export async function getUserById(userId) {
  const docSnap = await getDoc(doc(db, "users", userId));

  let avatarBucket = ''
  if (docSnap.data().avatarBucket !== undefined) {
    avatarBucket = await getDownloadURL(docSnap.data().avatarBucket)
  }

  if (!docSnap.exists()) {
    return null
  } else {
    return {
      ...docSnap.data(), 
      uid: userId,
      avatar: avatarBucket
    }
  }
}

//Adds a new user to Users collection on registration
export function addUser(user) {
  const userRef = setDoc(doc(db, 'users', user.uid), { 
    email: user.email,
    displayName: user.displayName,
    roles: "Customer",
    artistName: "", 
    bio: "",
    links: [],
    website: "",
    country: "",
    activeCommissions: 0,
    maxCommissions: 0,
    totalCompletedCommissions: 0,
    lifeTimeEarnings: 0,
    paymentsOwing: 0,
    totalPortraits: 0
  })
  return {uid: user.uid, email: user.email, displayName: user.displayName, roles: "Customer" }
}

//update user role
export function updateUser(userId, role) {
  updateDoc(doc(db, 'users', userId), { 
    roles: role
  });
}

//update any user data
export function updateUserData(user) {
  updateDoc(doc(db, 'users', user.uid),  
    { ...user }, { merge: true }
  );
}

//update any user data
export async function updateArtistComms(userId) {
  await updateDoc(doc(db, 'users', userId),  
    { 
      activeCommissions: increment(-1)
    }
  );
}


//Add new corporate consult data
export function addConsult( data) {
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
      allConsults.push({...doc.data(), uid: doc.id})
    });
    return allConsults
}

//Create new Portrait
export async function addPortrait( data) {
  const portraitRef = await addDoc(collection(db, 'portraits'), { 
    mode: data.mode,
    characters: data.characters,
    portraitTitle: data.portraitTitle,
    requiredQs: data.requiredQs,
    questions: data.questions, 
    price: data.price,
    customer: data.customer,
    customerId: data.customerId,
    artist: [],
    artistAssigned: false,
    artistComplete: false,
    date: new Date,
    status: 'Unordered',
    lastUpdatedStatus: new Date,
    paymentComplete: false,
    uploadedImageUrls: [],
    uploadedImageBucket: [],
    uploadedImageInfo: [],
  })
  return portraitRef.id
}

//edit portrait before purchase
export function updatePortrait( portraitId, portraitData) {
  updateDoc(doc(db, 'portraits', portraitId), { ...portraitData });
}


//add images to new portrait
export async function updateNewPortraitWithImage(portraitId, imageBucket) {
  const imageUrl = await getDownloadURL(imageBucket)
  updateDoc(doc(db, 'portraits', portraitId), { imageBucket: imageUrl})
}


//add artist to artist list for portrait when claimed
export function addArtist( portraitId, artistId, displayName) {
  console.log('calling addArtist')
  updateDoc(doc(db, 'portraits', portraitId), { 
    artist: arrayUnion({artistName: displayName, id: artistId}),
    status: 'Unassigned',
  });
}

//Assign artist to portrait per customer action
export function addSelectedArtist( portraitId, artistId, displayName) {
  console.log('calling addSelectedArtist')
  updateDoc(doc(db, 'portraits', portraitId), { 
    artist: [{artistName: displayName, id: artistId}],
    artistAssigned: true,
    status: 'In Progress'
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
      allPortraits.push({...doc.data(), uid: doc.id})
    });
    return allPortraits
} 

//Get one Portrait from uid
export async function getPortrait(uid) {
  const docSnap = await getDoc(doc(db, "portraits", uid));

  if (docSnap.exists()) {
    return {
      ...docSnap.data(), 
      uid: uid     
    }
  } else {
    console.log("No such document!");
    return ({})
  }
}


export async function updateOrCreatePortrait(portraitId, {userId}) {
  const imageUrl = await getDownloadURL(imageBucket)
  updateDoc(doc(db, 'portraits', portraitId), { images: arrayUnion({userId, imageUrl})})
}

//add one image to portrait
export async function updatePortraitWithImage(portraitId, {userId, imageBucket}) {
  const imageUrl = await getDownloadURL(imageBucket)
  updateDoc(doc(db, 'portraits', portraitId), { images: arrayUnion({userId, imageUrl})})
}

//add customer uploaded images to new portrait
export async function updateNewPortraitWithImages(portraitId, imageBucket, fileNames) {
  const imageUrls = await getDownloadURLs(imageBucket)
  
  updateDoc(doc(db, 'portraits', portraitId), { uploadedImageUrls: imageUrls, uploadedImageBucket: imageBucket, uploadedImageInfo: fileNames})
  return imageUrls
}

//Edit customer uploaded images to portrait
export async function updateEditedPortraitWithImages(portraitId, imageBucket, fileNames, portraitData) {
  const imageUrls = await getDownloadURLs(imageBucket)
  updateDoc(doc(db, 'portraits', portraitId), { uploadedImageUrls: [...portraitData.uploadedImageUrls, ...imageUrls], uploadedImageBucket: [...portraitData.uploadedImageBucket, ...imageBucket], uploadedImageInfo: [...portraitData.uploadedImageInfo, ...fileNames]})
  return [...portraitData.uploadedImageUrls, ...imageUrls]
}

//delete info for removed file
export async function deletePortraitImages(portraitId, imageBucket, urls, fileNames) {
  updateDoc(doc(db, 'portraits', portraitId), { uploadedImageUrls: urls, uploadedImageBucket: imageBucket, uploadedImageInfo: fileNames})
}



//Update user's Avatar
export async function addAvatar(userId, imageBucket) {
  const avatarUrl = await getDownloadURL(imageBucket)

  updateDoc(doc(db, 'users', userId), { avatar: avatarUrl, avatarBucket: imageBucket})
  return avatarUrl
}

// Updates user's avatar image
export async function updateAvatar( uid, imageBucket) {
  updateDoc(doc(db, 'users', uid), { avatarBucket: imageBucket}); 
}





//returns array of customers portraits
export async function getCustomersPortraits( uid ) {
  const q = query(collection(db, "portraits"), where("customerId", "==", uid));
  const portraits = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    portraits.push({...doc.data(), uid: doc.id})
  });
  return portraits
}

//returns array of artists claimed portraits
export async function getArtistsPortraits( displayName, uid ) {
  const q = query(collection(db, "portraits"), where("artist", "array-contains", { id: uid, artistName: displayName })); //"artist.artistName", "==", uid
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
  const q = query(collection(db, "portraits"), where("status", "==", "Unclaimed"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    unclaimed.push({...doc.data(), uid: doc.id})
  });
  return unclaimed
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
  const q = query(collection(db, "messages"), where("portraitId", "==", portraitId), orderBy("createdAt"), limit(50))
  
  const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    let messages = [];
    QuerySnapshot.forEach((doc) => {
      messages.push({ ...doc.data(), id: doc.id });
    });
    setMessages(messages);
  });
  return unsubscribe;
}

//Add a new Testimonial
//Create new Portrait
export async function addTestimonial( data) {
  const testimonialRef = await addDoc(collection(db, 'testimonials'), { 
    portraitId: data.portraitId,
    artistId: data.artistId,
    customerId: data.customerId,
    customerDisplayName: data.displayName,
    text: data.text
  })
  return testimonialRef.id
}