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
  endBefore, 
  or,
  and,
  Timestamp
} from 'firebase/firestore'; 
import { db } from './firebase';
import { getDownloadURL } from './storage';
import { getDownloadURLs } from './storage';
import { connectStorageEmulator } from 'firebase/storage';



export async function getCategories(id) {
  const docRef = doc(db, "categories", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return {}
  };
}


export async function setNewCategories(id, newData) {
    updateDoc(doc(db, 'categories', id), {...newData})
}



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
                  unit_amount: item.price.total * 100,
              },
              quantity: 1
          }
      }),
      payment_method_types: ["card"],
      mode: 'payment',
      success_url: `https://wattle-art-creations.vercel.app/dashboard/${userId}?complete=true`,
      cancel_url: 'https://wattle-art-creations.vercel.app/portraits?direct=false',
      metadata: {
        'portraitIds': portraitIds,
        'userId': userId,
        'type': 'first'
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
          unsubscribe();
          resolve(url);
      }
      });
  });
};

// Purchase additional 3D model, character sheet, or weapon sheet from portrait page
export async function getExtrasCheckoutUrl (portrait, userId) {
  if (!userId) throw new Error("User is not authenticated");
  
  const portraitIds = portrait.id
  const items = portrait.addOns

  const checkoutSessionRef = collection(
      db,
      "users",
      userId,
      "checkout_sessions"
  );

  const docRef = await addDoc(checkoutSessionRef, {
      line_items: items.map((item) => {
        const newName = (item.type === 'character' || item.type === 'weapons') 
          ? item.type.charAt(0).toUpperCase() + item.type.slice(1) + ' sheet' 
          : item.type === 'model' ? '3D model' 
          : item.type
        return {
              price_data: {
                  currency: "USD",
                  product_data: {
                      name: newName,
                  },
                  unit_amount: item.price * 100,
              },
              quantity: 1
          }
      }),
      payment_method_types: ["card"],
      mode: 'payment',
      success_url: `https://wattle-art-creations.vercel.app/portraits/${portraitIds}?complete=true&type=additional`,
      cancel_url: `https://wattle-art-creations.vercel.app/portraits/${portraitIds}?complete=false&type=additional`,
      metadata: {
        'portraitIds': portraitIds,
        'userId': userId,
        'type': 'additional',
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
          unsubscribe();
          resolve(url);
      }
      });
  });
};

// Purchase additional revisions
export async function getRevisionCheckoutUrl (portrait, userId) {
  if (!userId) throw new Error("User is not authenticated");
  
  const portraitIds = portrait.id
  const items = [portrait.additionalRevisionInfo]

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
                      name: 'Additional Revision - ' + item.type.charAt(0).toUpperCase() + item.type.slice(1),
                  },
                  unit_amount: item.price * 100,
              },
              quantity: 1
          }
      }),
      payment_method_types: ["card"],
      mode: 'payment',
      success_url: `https://wattle-art-creations.vercel.app/portraits/${portraitIds}?complete=true`,
      cancel_url: `https://wattle-art-creations.vercel.app/portraits/${portraitIds}?complete=false&type=revision`,
      metadata: {
        'portraitIds': portraitIds,
        'userId': userId,
        'type': 'additionalRevision'
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
          unsubscribe();
          resolve(url);
      }
      });
  });
};

// Purchase additional options after portrait completion from testimonial page
export async function getAddOnCheckoutUrl(portrait, userId) {

  if (!userId) throw new Error("User is not authenticated") 
  
  const items = portrait.addOns

  const checkoutSessionRef = collection(
      db,
      "users",
      userId,
      "checkout_sessions"
  );

  const docRef = await addDoc(checkoutSessionRef, {
      line_items: items.map((item) => {
        const newName = (item.type === 'character' || item.type === 'weapons') 
          ? item.type.charAt(0).toUpperCase() + item.type.slice(1) + ' sheet' 
          : '3D model' 
        return {
              price_data: {
                  currency: "USD",
                  product_data: {
                      name: newName,
                  },
                  unit_amount: item.price * 100,
              },
              quantity: 1
          }
      }),
      payment_method_types: ["card"],
      mode: 'payment',
      success_url: `https://wattle-art-creations.vercel.app/portraits/${portrait.id}?complete=true&type=addOn`,
      cancel_url: `https://wattle-art-creations.vercel.app/testimonials?portraitId=${portrait.id}&artistId=${portrait.artist[0].id}&complete=false`,
      metadata: {
        'portraitIds': portrait.id,
        'userId': userId,
        'type': 'addOn',
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
          unsubscribe();
          resolve(url);
      }
      });
  });
};

export async function getTipUrl(tip, portrait, userId) {

  if (!userId) throw new Error("User is not authenticated") 
  
  const newItem = { type: "Artist tip", price: tip}

  const items = [newItem]

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
                      name: item.type,
                  },
                  unit_amount: item.price * 100,
              },
              quantity: 1
          }
      }),
      payment_method_types: ["card"],
      mode: 'payment',
      success_url: `https://wattle-art-creations.vercel.app/dashboard/${userId}?complete=true&type=tip`,
      cancel_url: `https://wattle-art-creations.vercel.app/testimonials?portraitId=${portrait.id}`,
      metadata: {
        'portraitIds': portrait.id,
        'userId': userId,
        'type': 'tip',
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

export async function getAllUserInfo(setAllUsers, setFilteredUsers) {
  
  const q = query(collection(db, "users"), or(where("roles", "==", "Admin"), where("roles", "==", "Customer"), where("roles", "==", "Artist")))

  const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    let users = [];
    
    QuerySnapshot.forEach((doc) => {
      users.push({ ...doc.data(), uid: doc.id });
    });
    
    setAllUsers(users);
    setFilteredUsers(users)
  });
  return unsubscribe;
}

export async function getAllArtistsInfo(setAllArtists, setFilteredArtists) {
  
  const q = query(collection(db, "users"), where("roles", "==", "Artist"))

  const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    let artists = [];
    
    QuerySnapshot.forEach((doc) => {
      artists.push({ ...doc.data(), uid: doc.id });
    });
    
    setAllArtists(artists);
    setFilteredArtists(artists)
  });
  return unsubscribe;
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
  const q = query(collection(db, "users"), where("roles", "==", 'Artist'), orderBy("starRating", "desc"), orderBy("totalCompletedCommissions", "desc"));

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
    artistImgs: docSnap.data().artistImgs,
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
    payouts: docSnap.data().payouts
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
    artistName: user.displayName, 
    bio: "",
    links: [],
    artistImgs: {
      imgUrl1: "",
      imgBucket1: "",
      imgUrl2: "",
      imgBucket2: "",
      imgUrl3: "",
      imgBucket3: "",
      imgUrl4: "",
      imgBucket4: "",
      imgUrl5: "",
      imgBucket5: "",
      imgUrl6: "",
      imgBucket6: "",
      imgUrl7: "",
      imgBucket7: "",
  },
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
    avatar: "",
    payouts: []
  })
  return {uid: user.uid, email: user.email, displayName: user.displayName, roles: "Customer", oldEnough: false }
}

//update user role
export async function updateUser(userId, role) {
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
export async function updateArtistOnCompletion(portrait, newArtistPay) {
  const userId = portrait.artist[0].id
  const newPayment = {
    date: serverTimestamp(),
    amount: newArtistPay,
    portraitId: portrait.uid,
    released: false
  }

  const newPaymentsOwing = [...portrait.paymentsOwing, newPayment] 

  await updateDoc(doc(db, 'users', userId),  
    { 
      activeCommissions: increment(-1),
      totalCompletedCommissions: increment(1),
      paymentsOwing: newPaymentsOwing,
    }
  )
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
export async function addPortrait(data) {
  
  const portraitRef = await addDoc(collection(db, 'portraits'), { 
    mode: data.mode,
    characters: data.characters,
    animals: data.animals,
    bg: data.bg,
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
    purchaseDate: null,
    status: 'Unordered',
    lastUpdatedStatus: new Date,
    paymentComplete: false,
    revisions: data.revisions,
    revised: false,
    reassigned: false,
    additionalRevision: false,
    images: [],
    finalImages: [],
    additionalRevisionInfo: {price: 0, type: ""},
    additionalRevisionRequest: data.additionalRevisionRequest,
    revisionNotes: [],
    sheetUploads: [],
    addOns: [],
    additionalPayments: [],
    reviewed: false
  })
  return portraitRef.id
}

//edit portrait before purchase
export async function updatePortrait( portraitId, portraitData) {
  updateDoc(doc(db, 'portraits', portraitId), { ...portraitData })
}

//failure on purchase of addOn
export async function updateFailedAddOn( portraitId ) {
  updateDoc(doc(db, 'portraits', portraitId), { addOns: [] });
}

// Update portrait as reviewed
//failure on purchase of addOn
export async function updateReviewed( portraitId ) {
  updateDoc(doc(db, 'portraits', portraitId), { reviewed: true });
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
    lastUpdatedStatus: new Date,
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
export function addChar( portraitId, bodyStyle, numCharVariations, extras) {
  updateDoc(doc(db, 'portraits', portraitId), { 
    characters: arrayUnion({bodyStyle, numCharVariations, extras })
  });
}

//returns an array of all portraits
export async function getAllPortraits() {
  const allPortraits = []
  const q = query(collection(db, "portraits"), where("paymentComplete", "==", true), orderBy("creationDate"), limit(50))
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    allPortraits.push({...doc.data(), uid: doc.id})
  })
  return allPortraits
} 

//returns an array of all portraits
export async function getAllUndorderedPortraits() {
  const allPortraits = []
  const q = query(collection(db, "portraits"), where("paymentComplete", "==", false), orderBy("creationDate"), limit(50))
  const querySnapshot = await getDocs(q);
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
    animals: docSnap.data().animals,
    bg: docSnap.data().bg,
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
    additionalRevisionInfo: docSnap.data().additionalRevisionInfo,
    additionalRevisionRequest: docSnap.data().additionalRevisionRequest,
    revisionNotes: docSnap.data().revisionNotes, 
    portraitCompletionDate: docSnap.data().portraitCompletionDate,
    sheetUploads: docSnap.data().sheetUploads,
    addOns: docSnap.data().addOns,
    additionalPayments: docSnap.data().additionalPayments,
    reviewed: docSnap.data().reviewed,
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
  
  const imageUrl = await getDownloadURL(imageBucket)

  updateDoc(doc(db, 'portraits', portraitId), 
    { 
      finalImages: arrayUnion({userId: userId, imageUrl: imageUrl, date: new Date}), 
      revised: true,
      additionalRevision: false,
      additionalRevisionRequest: false,
    })
}

//Submit an image for review 
export async function updatePortraitWithSheet(portraitId, {index, portrait, imageBucket}) {
  let imageUrl 
  if (imageBucket !== '') {
    imageUrl = await getDownloadURL(imageBucket)
  } else {
    imageUrl = ""
  }

  const newObj = {
    ...portrait.sheetUploads[index],
    src: imageUrl,
  } 

  const newArr = portrait.sheetUploads.map((sheet, i) => {
    if (i === index) return newObj
    else return sheet
  })

  updateDoc(doc(db, 'portraits', portraitId), 
    { 
      sheetUploads: newArr, 
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

// Get All unclaimed portraits
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


export async function getAllMyPortraits(setPortraits, setFiltered, artist) {
  
  const q = query(collection(db, "portraits"), and(where("artist", "array-contains", artist), or(where("status", "==", "Unclaimed"), where("status", "==", "Unassigned"), where("status", "==", "In Progress"), where("status", "==", "Completed"))), orderBy("creationDate"), limit(20))
  
  
  const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    let portraits = [];
    
    QuerySnapshot.forEach((doc) => {
      portraits.push({ ...doc.data(), id: doc.id });
    });
    
    setPortraits(portraits);
    setFiltered(portraits)
  });
  return unsubscribe;
}

export async function getAllCustomersPortraits(setPortraits, setFiltered, userId) {
  
  const q = query(collection(db, "portraits"), and(where("customerId", "==", userId), or(where("status", "==", "Unpaid"), where("status", "==", "Unclaimed"), where("status", "==", "Unassigned"), where("status", "==", "In Progress"), where("status", "==", "Completed"))), orderBy("creationDate"), limit(20))
    
  const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    let portraits = [];
    
    QuerySnapshot.forEach((doc) => {
      portraits.push({ ...doc.data(), id: doc.id });
    });
    
    setPortraits(portraits);
    setFiltered(portraits)
  });
  return unsubscribe;
}


// Get single portrait listener
export async function getMyPortrait(setPortrait, portraitId) {
  
  const unsubscribe = onSnapshot(doc(db, "portraits", portraitId), (doc) => {
    setPortrait(doc.data())
  });

  return unsubscribe;
}

export async function getAllModels(setAllModels, setFilteredModels) {
  
  const q = query(collection(db, "models"))

  const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    let models = [];
    
    QuerySnapshot.forEach((doc) => {
      models.push({ ...doc.data(), uid: doc.id });
    });
    
    setAllModels(models);
    setFilteredModels(models)
  });
  return unsubscribe;
}

//update model Completion status
export async function updateModel(modelId, value, user, type) {
  
  if (type === 'complete') {
    updateDoc(doc(db, 'models', modelId), { 
      portraitComplete: value,
      admin: user
    })
  } else if (type === 'ordered') {
    updateDoc(doc(db, 'models', modelId), { 
      ordered: value,
      admin: user
    })
  }
}

// Update 3D models once portrait is complete
export async function updatePortraitModels(portraitId) {
  const q = query(collection(db, "models"), where("portraitId", "==", portraitId))
  const models = []
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    models.push(doc.id)
  })

  models.forEach(model => {
    updateDoc(doc(db, "models", model), {
      portraitComplete: true
    })
  })
  
  return models
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
    if (messages.length === 0) addChatMessage( portraitId, "Step 1: Check the Artist Selection section to pick your artist", 'Admin Bot', 'aBcDeFgHiJkLmNoPqRsTuVwxYzAb')
    setMessages(messages);
  });
  return unsubscribe;
}


//Add a new Testimonial
export async function addTestimonial( data) {

  if (data.artistId !== '') {
    updateArtistRating(data.artistId, data.stars)
  }

  let imgUrl
  let portrait
  let completionDate
  
  if (data.includeImg) {
    if (data.portraitId) {
      portrait = await getPortrait(data.portraitId)
      imgUrl = portrait.finalImages[portrait.finalImages.length - 1].imageUrl
    } else {
      imgUrl = data.imgUrl
    }
  } else {
    imgUrl = ""
  }
  
  if (data.portraitCompletionDate) {
    if (data.portraitId) {
      if (portrait) {
        completionDate = {...portrait.portraitCompletionDate}
      } else {
        portrait = await getPortrait(data.portraitId)
        completionDate = portrait.portraitCompletionDate
      }
    } else {
      completionDate = data.completionDate
    }
  } else {
    completionDate = ""
  }

  const newTestimonial = {
    portraitId: data.portraitId,
    artistId: data.artistId,
    category: data.category,
    customerId: data.customerId,
    customerDisplayName: data.customerDisplayName,
    text: data.text,
    stars: data.stars,
    includeImg: data.includeImg,
    imgUrl: imgUrl,
    featured: data.featured,
    featuredHome: data.featuredHome,
    portraitCompletionDate: completionDate
  }

  const testimonialRef = await addDoc(collection(db, 'testimonials'), newTestimonial)
  return newTestimonial
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


export async function getAllTestimonials() {
  const testimonials = []

  const documentSnapshots = await getDocs(query(collection(db, "testimonials"), orderBy("stars", "desc"), limit(50)))

  documentSnapshots.forEach((doc) => {
    testimonials.push({...doc.data(), uid: doc.id})
  });
  // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1]

  return testimonials
}


export async function updateAllFeatureTestimonials(testimonials){
  for (const testimonial in testimonials) {
    await updateDoc(doc(db, 'testimonials', testimonials[testimonial].uid), { ...testimonials[testimonial] })
  }
  
}

export async function updateFeatureTestimonial(testimonial){

  await updateDoc(doc(db, 'testimonials', testimonial.uid), { ...testimonial })
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


//Add Artist's portfolio img
export async function getImgUrl(imageBucket) {
  const imgUrl = await getDownloadURL(imageBucket)

  return imgUrl
}



//Updates Artist's portfolio img
export async function updateArtistPortfolioImg( user, num, newUrl) {

  let newArtistImgs

  if (num === 1) {
    newArtistImgs = {
        ...user.artistImgs,
        imgUrl1: newUrl
    }
  } else if (num === 2) {
      newArtistImgs = {
          ...user.artistImgs, 
          imgUrl2: newUrl,
      }
  } else if (num === 3) {
      newArtistImgs = {
          ...user.artistImgs,
          imgUrl3: newUrl,
      }
  } else if (num === 4) {
      newArtistImgs = {
          ...user.artistImgs,
          imgUrl4: newUrl,
      }
  } else if (num === 5) {
      newArtistImgs = {
          ...user.artistImgs,
          imgUrl5: newUrl,
      }
  } else if (num === 6) {
    newArtistImgs = {
        ...user.artistImgs,
        imgUrl6: newUrl,
    }
  } else if (num === 7){
      newArtistImgs = {
          ...user.artistImgs,
          imgUrl7: newUrl,
      }
  }

  const updatedUser = {
      ...user,
      artistImgs: newArtistImgs
  }

  await updateDoc(doc(db, 'users', user.uid), { 
    ...updatedUser,
  }, { merge: true }); 

  return updatedUser
}
