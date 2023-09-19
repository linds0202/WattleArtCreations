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
  increment,
  startAfter,
  endBefore
} from 'firebase/firestore'; 
import { db } from './firebase';
import { getDownloadURL } from './storage';
import { getDownloadURLs } from './storage';

export async function getCheckoutUrl (items, userId) {

  if (!userId) throw new Error("User is not authenticated");

  const portraitIds = items.map(portrait => portrait.id).join(',')
  
  const checkoutSessionRef = collection(
      db,
      "users",
      userId,
      "checkout_sessions"
  );

  const docRef = await addDoc(checkoutSessionRef, {
      line_items: items.map((item) => {
          return {
              price_data: {
                  currency: "USD",
                  product_data: {
                      name: item.portraitTitle,
                      description: item.mode,
                  },
                  unit_amount: item.price * 100,
              },
              quantity: 1
          }
      }),
      payment_method_types: ["card"],
      mode: 'payment',
      success_url: `https://wattle-art-creations-qssacq6oj-linds0202.vercel.app/dashboard/${userId}`,
      cancel_url: 'https://wattle-art-creations-qssacq6oj-linds0202.vercel.app/',
      metadata: {
        'portraitIds': portraitIds,
        'userId': userId
      },
  });

  // success?session_id={CHECKOUT_SESSION_ID}


  return new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data() 
      if (error) {
          unsubscribe();
          reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
          console.log("Stripe Checkout URL:", url);
          unsubscribe();
          resolve(url);
      }
      });
  });
};

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

  const user = {
    displayName: docSnap.data().displayName, 
    email: docSnap.data().email, 
    roles: docSnap.data().roles, 
    oldEnough: docSnap.data().oldEnough,
    uid: userId,
    avatar: avatarBucket,
    artistName: docSnap.data().artistName, 
    bio: docSnap.data().bio,
    links: docSnap.data().links,
    website: docSnap.data().website,
    country: docSnap.data().country,
    activeCommissions: docSnap.data().activeCommissions,
    maxCommissions: docSnap.data().maxCommissions,
    totalCompletedCommissions: docSnap.data().totalCompletedCommissions,
    lifeTimeEarnings: docSnap.data().lifeTimeEarnings,
    paymentsOwing: docSnap.data().paymentsOwing,
    totalPortraits: docSnap.data().totalPortraits,
    totalStars: docSnap.data().totalStars,
    totalReviews: docSnap.data().totalReviews,
    starRating: docSnap.data().starRating,
    joinedOn: docSnap.data().joinedOn,
  }

  if (!docSnap.exists()) {
    return null
  } else {
    return user
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
    totalPortraits: 0,
    totalStars: 0,
    totalReviews: 0,
    starRating: 0,
    oldEnough: false,
    joinedOn: new Date,
    avatar: ""
  })
  return {uid: user.uid, email: user.email, displayName: user.displayName, roles: "Customer", oldEnough: false }
}

//update user role
export function updateUser(userId, role) {
  updateDoc(doc(db, 'users', userId), { 
    roles: role
  });
}

//update any user data
export async function updateUserById(userId) {
  updateDoc(doc(db, 'users', userId),  
    { oldEnough: true }
  );
}

//update any user data
export async function updateUserData(user) {

  let updatedUser
  if (user.displayName === undefined) {
    updatedUser = {
      ...user,
      displayName: ''
    }
  } else {
    updatedUser = { ... user }
  }

  updateDoc(doc(db, 'users', user.uid),  
    { 
      ...updatedUser,
    }, { merge: true }
  );
}

//update customer total commissions
export function updateCustomerCommissionsTotal(userId) {
  updateDoc(doc(db, 'users', userId), { 
    totalCompletedCommissions: increment(1)
  });
}

//update artist when commission completed
export async function updateArtistOnCompletion(userId, price) {
  await updateDoc(doc(db, 'users', userId),  
    { 
      activeCommissions: increment(-1),
      totalCompletedCommissions: increment(1),
      paymentsOwing: increment(price),
    }
  );
}

//update artist rating with new testimonial
export async function updateArtistRating(userId, stars) {
  const docSnap = await getDoc(doc(db, "users", userId));

  let newRating
  if (docSnap.data().totalStars) {
    const allStars = (docSnap.data().totalStars + stars) / (docSnap.data().totalReviews + 1)
    newRating = Math.round( allStars * 100 + Number.EPSILON ) / 100
  } else {
    newRating = stars / (docSnap.data().totalReviews + 1)
  }
  
  await updateDoc(doc(db, 'users', userId),  
    { 
      totalReviews: increment(1),
      totalStars: increment(stars),
      starRating: newRating
    }
  )
}

//update artist comms when bid on portrait
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
    artistNotes: [],
    artistAssigned: false,
    creationDate: new Date,
    purchaseDate: new Date,
    status: 'Unordered',
    lastUpdatedStatus: new Date,
    paymentComplete: false,
    revisions: data.revisions,
    revised: false,
    reassigned: false,
    additionalRevision: false,
    images: [],
    finalImages: [],
    revisionLevel: "",
    additionalRevisionRequest: data.additionalRevisionRequest,
    purchaseRevisionLink: data.purchaseRevisionLink,
    revisionNotes: []
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
export async function addArtist( portraitId, artistId, artistName, artistNote) {
  updateDoc(doc(db, 'portraits', portraitId), { 
    artist: arrayUnion({ id: artistId, artistName: artistName}),
    artistNotes: arrayUnion(artistNote),
    status: 'Unassigned',
  });
}

//Assign artist to portrait per customer action
export async function addSelectedArtist( portraitId, artistId, displayName) {
  updateDoc(doc(db, 'portraits', portraitId), { 
    artist: [{artistName: displayName, id: artistId}],
    artistAssigned: true,
    status: 'In Progress',
    lastUpdatedStatus: new Date
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

  const newPortrait = {
    mode: docSnap.data().mode,
    characters: docSnap.data().characters,
    portraitTitle: docSnap.data().portraitTitle,
    requiredQs: docSnap.data().requiredQs,
    questions: docSnap.data().questions, 
    price: docSnap.data().price,
    customer: docSnap.data().customer,
    customerId: docSnap.data().customerId,
    artist: docSnap.data().artist,
    artistNotes: docSnap.data().artistNotes,
    artistAssigned: docSnap.data().artistAssigned,
    creationDate: docSnap.data().creationDate,
    purchaseDate: docSnap.data().purchaseDate,
    status: docSnap.data().status,
    lastUpdatedStatus: docSnap.data().lastUpdatedStatus,
    paymentComplete: docSnap.data().paymentComplete,
    revisions: docSnap.data().revisions,
    revised: docSnap.data().revised,
    reassigned: docSnap.data().reassigned,
    additionalRevision: docSnap.data().additionalRevision,
    images: docSnap.data().images,
    finalImages: docSnap.data().finalImages,
    revisionLevel: docSnap.data().revisionLevel,
    additionalRevisionRequest: docSnap.data().additionalRevisionRequest,
    purchaseRevisionLink: docSnap.data().purchaseRevisionLink,
    revisionNotes: docSnap.data().revisionNotes, 
    id: uid
  }

  if (docSnap.exists()) {

    return newPortrait
  } else {
    console.log("No such document!");
    return (null)
  }
}


export async function updateOrCreatePortrait(portraitId, {userId}) {
  const imageUrl = await getDownloadURL(imageBucket)
  updateDoc(doc(db, 'portraits', portraitId), { images: arrayUnion({userId, imageUrl})})
}

//Submit an image for review 
export async function updatePortraitWithImage(portraitId, {userId, imageBucket}) {
  console.log('portraitId: ', portraitId)
  console.log('userId', userId)
  console.log('imageBucket, ', imageBucket)
  
  const imageUrl = await getDownloadURL(imageBucket)

  console.log(imageUrl)

  updateDoc(doc(db, 'portraits', portraitId), 
    { 
      finalImages: arrayUnion({userId: userId, imageUrl: imageUrl, date: new Date}), 
      revised: true,
      additionalRevision: false,
      additionalRevisionRequest: false,
      purchaseRevisionLink: ''
    })
}

//add customer uploaded images to portrait
export async function getImageUrls(portraitId, imageBucket, uploads) { 
  const urls = []
  for (const bucket of imageBucket) {
    const imageUrls = await getDownloadURLs(bucket)
    urls.push(imageUrls)
  }

  const fileNames = []
  for(const fileGroup of uploads) {
    const fileGroupNames = []
    for(const file of fileGroup.files) {
      fileGroupNames.push(file.name)
    }
    fileNames.push(fileGroupNames)
  }
  
  const newImgs = urls.map((urlSet, i) => {
    return {imageUrls: urlSet, fileNames: fileNames[i], text: uploads[i].text} 
  })

  return newImgs
}

//Edit customer uploaded images to portrait
export async function updateEditedPortraitWithImages(portraitId, imageBucket, fileNames, portraitData) {
  const imageUrls = await getDownloadURLs(imageBucket)
  updateDoc(doc(db, 'portraits', portraitId), { uploadedImageUrls: [...portraitData.uploadedImageUrls, ...imageUrls], uploadedImageBucket: [...portraitData.uploadedImageBucket, ...imageBucket], uploadedImageInfo: [...portraitData.uploadedImageInfo, ...fileNames]})
  return [...portraitData.uploadedImageUrls, ...imageUrls]
}

//delete info for removed file
export async function deletePortraitImages(portraitId, images) {
  updateDoc(doc(db, 'portraits', portraitId), { images: images})
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
  
  const q = query(collection(db, "portraits"), where("artist", "array-contains", { id: uid, artistName: displayName })); 
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
  const q = query(collection(db, "portraits"), where("status", "in", ["Unclaimed", "Unassigned"]));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    unclaimed.push({...doc.data(), uid: doc.id})
  });
  return unclaimed
}

// Get All chat messages
export async function getUnclaimedPortraits(setPortraits) {
  const q = query(collection(db, "portraits"), where("paymentComplete", "==", true), orderBy("creationDate"), limit(50))
  
  const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    let portraits = [];
    QuerySnapshot.forEach((doc) => {
      portraits.push({ ...doc.data(), id: doc.id });
    });
    setPortraits(portraits);
  });
  return unsubscribe;
}


//Add chat message
export async function addChatMessage( portraitId, message, displayName, uid  ) {
  addDoc(collection(db, "messages"), {
    portraitId: portraitId,
    text: message,
    img: '',
    name: displayName,
    createdAt: serverTimestamp(),
    uid
  });
}

//upload image in chat
export async function addChatImage( portraitId, imageBucket, displayName, uid  ) {
  
  const imageUrl = await getDownloadURL(imageBucket)
  
  addDoc(collection(db, "messages"), {
    portraitId: portraitId,
    name: displayName,
    createdAt: serverTimestamp(),
    text: '',
    img: imageUrl,
    uid
  })
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
export async function addTestimonial( data) {
  
  updateArtistRating(data.artistId, data.stars)

  let imgUrl

  if (data.includeImg) {
    imgUrl = await getPortrait(data.portraitId)
  }

  const testimonialRef = await addDoc(collection(db, 'testimonials'), { 
    portraitId: data.portraitId,
    artistId: data.artistId,
    customerId: data.customerId,
    customerDisplayName: data.displayName,
    text: data.text,
    stars: data.stars,
    includeImg: data.includeImg,
    imgUrl: imgUrl.finalImages[imgUrl.finalImages.length - 1].imageUrl
  })
  return testimonialRef.id
}

//Get testimonial for one portrait
export async function getTestimonial(portraitId) {
  const testimonial = []
  const documentSnapshots = await getDocs(query(collection(db, "testimonials"), where("portraitId", "==", portraitId)))

  documentSnapshots.forEach((doc) => {
    testimonial.push({...doc.data(), uid: doc.id})
  })
  return testimonial[0]
}


export async function getArtistsTestimonials( artistId) {
    const testimonials = []

    const documentSnapshots = await getDocs(query(collection(db, "testimonials"), where("artistId", "==", artistId), orderBy("stars", "desc"), limit(5)))

    documentSnapshots.forEach((doc) => {
      testimonials.push({...doc.data(), uid: doc.id})
    });
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1]

    return { testimonials, lastVisible }
}

export async function getNextTestimonials(artistId, last) {
  const testimonials = []

  const next = await getDocs(query(collection(db, "testimonials"), where("artistId", "==", artistId), orderBy("stars", "desc"), startAfter(last), limit(5)))

  next.forEach((doc) => {
    testimonials.push({...doc.data(), uid: doc.id})
  });
  const lastVisible = next.docs[next.docs.length-1]
  
  return { testimonials, lastVisible }
}

export async function getPreviousTestimonials(artistId, last) {
  const testimonials = []

  const next = await getDocs(query(collection(db, "testimonials"), where("artistId", "==", artistId), orderBy("stars", "desc"), endBefore(last), limit(5)))

  next.forEach((doc) => {
    testimonials.push({...doc.data(), uid: doc.id})
  });
  const lastVisible = next.docs[next.docs.length-1]
  
  return { testimonials, lastVisible }
}