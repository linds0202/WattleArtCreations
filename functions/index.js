//import * as functions from 'firebase-functions';  
//import admin from 'firebase-admin';    
//admin.initializeApp();
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Timestamp } = require('firebase-admin/firestore');

admin.initializeApp(functions.config().firebase);

const usersRef = admin.firestore().collection('users')

// exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
//     .onCreate((snap, context) => {
//     const original = snap.data().original;
//     console.log('Uppercasing', context.params.documentId, original);
//     const uppercase = original.toUpperCase();
//     return snap.ref.set({uppercase}, {merge: true});
//     });


    // snap.ref.set({message: message, customerId: order.customerId});
exports.makeEmail = functions.firestore.document('/emails/{documentId}')
    .onCreate((snap, context) => {
    const email = snap.data().email;
    console.log(`Sending email for ${email.days} remaining to approve your artist submission for the ${email.text} portrait. Login in and check your dashboard for more info.`);
    return email.days
    });


exports.updatePurchaseStatus = functions.firestore.document('users/{usersId}/payments/{documentId}')
    .onCreate(async (snap, context) => {
    
    const payment = snap.data();
    // console.log('payment: ', payment)

    if (payment.status === 'succeeded') {
        const portraitIds = payment.metadata.portraitIds.split(',')
        
        for (let i = 0; i < portraitIds.length; i++) {
            const portraitDocRef = admin.firestore().collection("portraits").doc(portraitIds[i])
            const currentPortraitSnap = await portraitDocRef.get()
            const currentPortrait = currentPortraitSnap.data()
            console.log("current portrait: ", currentPortrait)
            
            if (payment.metadata.type === 'first') {
                const answer = await portraitDocRef.update({
                    "status": 'Unclaimed',
                    "paymentComplete": true,
                    "purchaseDate": Timestamp.now(),
                    "lastUpdatedStatus": Timestamp.now(),
                })

                const userId = payment.metadata.userId
        
                const userDocRef = admin.firestore().collection("users").doc(userId);
                await userDocRef.update({"totalCompletedCommissions": admin.firestore.FieldValue.increment(portraitIds.length)})
            } else if (payment.metadata.type === 'additional'){
                const newPayment = {
                    "paymentComplete": true, 
                    "purchaseDate": Timestamp.now(),
                    "total": payment.amount / 100,
                    "type": "additional",
                    "invoiceId" : payment.id
                }
                
                const newSheetUploads = []
                for (const addOn of currentPortrait.addOns) { 
                    newSheetUploads.push({
                    src: "",
                    index: 0,
                    charNum: "AddOn",
                    type: addOn.type,
                    price: addOn.price
                    })
                }

                const allSheetUploads = [...currentPortrait.sheetUploads, ...newSheetUploads]
                
                const finalSheetUploads = allSheetUploads.map((sheet, i) => ({
                    ...sheet,
                    index: i
                }))

                const answer = await portraitDocRef.update({
                    additionalPayments: [...currentPortrait.additionalPayments, newPayment],
                    sheetUploads: finalSheetUploads,
                    addOns: []
                })
            } else if (payment.metadata.type === 'additionalRevision'){

                const newPayment = {
                    "paymentComplete": true, 
                    "purchaseDate": Timestamp.now(),
                    "total": payment.amount / 100,
                    "type": `additionalRevision ${currentPortrait.additionalRevisionInfo.type}`,
                    "invoiceId" : payment.id
                }
                const answer = await portraitDocRef.update({
                    additionalPayments: [...currentPortrait.additionalPayments, newPayment],
                    additionalRevisionInfo: {type: "", price: 0},
                    additionalRevisionRequest: true,
                    additionalRevision: true
                })
            } else if (payment.metadata.type === 'addOn'){
                console.log("called addOn")
                const newPayment = {
                    "paymentComplete": true, 
                    "purchaseDate": Timestamp.now(),
                    "total": payment.amount / 100,
                    "type": `addOn ${currentPortrait.addOns.map(addOn => addOn.type).join(", ")}`,
                    "invoiceId" : payment.id
                }

                const newSheetUploads = []
                for (const addOn of currentPortrait.addOns) { 
                    newSheetUploads.push({
                    src: "",
                    index: 0,
                    charNum: "AddOn",
                    type: addOn.type,
                    price: addOn.price
                    })
                }

                const allSheetUploads = [...currentPortrait.sheetUploads, ...newSheetUploads]
                
                const finalSheetUploads = allSheetUploads.map((sheet, i) => ({
                    ...sheet,
                    index: i
                }))

                const answer = await portraitDocRef.update({
                    additionalPayments: [...currentPortrait.additionalPayments, newPayment],
                    sheetUploads: finalSheetUploads,
                    addOns: [],
                    status: "In Progress"
                })
            }
          }  
    }

    return payment
    })
