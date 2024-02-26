//import * as functions from 'firebase-functions';  
//import admin from 'firebase-admin';    
//admin.initializeApp();
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Timestamp } = require('firebase-admin/firestore');

admin.initializeApp(functions.config().firebase);

const usersRef = admin.firestore().collection('users')
const modelsRef = admin.firestore().collection('models')

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
        
        if (payment.metadata.type === 'first') {
            // Update User
            const userId = payment.metadata.userId
            const userDocRef = admin.firestore().collection("users").doc(userId)
            await userDocRef.update({"totalCompletedCommissions": admin.firestore.FieldValue.increment(portraitIds.length)})
        }

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

                // Add to admin model list
                for (const extra of currentPortrait.sheetUploads) {
                    if (extra.type === 'model') {
                        await modelsRef.add({
                            "portraitId": currentPortrait.id,
                            "customerId": currentPortrait.customerId,
                            "customeName": currentPortrait.customer,
                            "price": extra.price,
                            "portraitComplete": false,
                            "ordered": false,
                            "admin": "",
                            "creationDate": Timestamp.now()
                        }) 
                    }
                }

            } else if (payment.metadata.type === 'additional'){
                const newSheetUploads = []
                const purchasedItems = []
                let artistPay = 0
                for (const addOn of currentPortrait.addOns) { 
                    newSheetUploads.push({
                        src: "",
                        index: 0,
                        charNum: "AddOn",
                        type: addOn.type,
                        price: addOn.price
                    })
                    if (addOn.type !== "model") {
                        artistPay += addOn.price
                    }
                    purchasedItems.push({
                        type: addOn.type,
                        price: addOn.price 
                    })
                }

                const newPayment = {
                    "paymentComplete": true, 
                    "purchaseDate": Timestamp.now(),
                    "total": payment.amount / 100,
                    "type": "additional",
                    "invoiceId" : payment.id,
                    "items": purchasedItems,
                    "artistPay": artistPay,
                    "released": false
                }

                const allSheetUploads = [...currentPortrait.sheetUploads, ...newSheetUploads]
                
                const finalSheetUploads = allSheetUploads.map((sheet, i) => ({
                    ...sheet,
                    index: i
                }))


                if (currentPortrait.status === 'Completed') {
                    const answer = await portraitDocRef.update({
                        additionalPayments: [...currentPortrait.additionalPayments, newPayment],
                        sheetUploads: finalSheetUploads,
                        addOns: [], 
                        status: 'In Progress',
                        portraitCompletionDate: null
                    })

                    // Update artist portrait count to reactivate portrait
                    const artistId = currentPortrait.artist[0].id
                    const artistDocRef = admin.firestore().collection("users").doc(artistId)
                    await artistDocRef.update({
                        "activeCommissions": admin.firestore.FieldValue.increment(1),
                        "totalCompletedCommissions": admin.firestore.FieldValue.increment(-1)
                    })
                } else {
                    const answer = await portraitDocRef.update({
                        additionalPayments: [...currentPortrait.additionalPayments, newPayment],
                        sheetUploads: finalSheetUploads,
                        addOns: []
                    })
                }
                

                // Add to admin model list
                for (const extra of newSheetUploads) {
                    if (extra.type === 'model') {
                        await modelsRef.add({
                            "portraitId": currentPortrait.id,
                            "customerId": currentPortrait.customerId,
                            "customeName": currentPortrait.customer,
                            "price": extra.price,
                            "portraitComplete": false,
                            "ordered": false,
                            "admin": "",
                            "creationDate": Timestamp.now()
                        }) 
                    }
                }

                
            } else if (payment.metadata.type === 'additionalRevision'){

                const newPayment = {
                    "paymentComplete": true, 
                    "purchaseDate": Timestamp.now(),
                    "total": payment.amount / 100,
                    "type": `additionalRevision ${currentPortrait.additionalRevisionInfo.type}`,
                    "invoiceId" : payment.id,
                    "items": [{
                        type: "additionalRevision",
                        price: payment.amount / 100
                    }],
                    "artistPay": payment.amount / 100,
                    "released": false
                }
                const answer = await portraitDocRef.update({
                    additionalPayments: [...currentPortrait.additionalPayments, newPayment],
                    additionalRevisionInfo: {type: "", price: 0},
                    additionalRevisionRequest: true,
                    additionalRevision: true
                })

            } else if (payment.metadata.type === 'addOn'){

                const newSheetUploads = []
                const purchasedItems = []
                let artistPay = 0
                for (const addOn of currentPortrait.addOns) { 
                    newSheetUploads.push({
                        src: "",
                        index: 0,
                        charNum: "AddOn",
                        type: addOn.type,
                        price: addOn.price
                    })

                    if (addOn.type !== "model") {
                        artistPay += addOn.price
                    }

                    purchasedItems.push({
                        type: addOn.type,
                        price: addOn.price 
                    })
                }

                const newPayment = {
                    "paymentComplete": true, 
                    "purchaseDate": Timestamp.now(),
                    "total": payment.amount / 100,
                    "type": "additional",
                    "invoiceId" : payment.id,
                    "items": purchasedItems,
                    "artistPay": artistPay,
                    "released": false
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

                // Add to admin model list
                for (const extra of newSheetUploads) {
                    if (extra.type === 'model') {
                        await modelsRef.add({
                            "portraitId": currentPortrait.id,
                            "customerId": currentPortrait.customerId,
                            "customeName": currentPortrait.customer,
                            "price": extra.price,
                            "portraitComplete": false,
                            "ordered": false,
                            "admin": "",
                            "creationDate": Timestamp.now()
                        }) 
                    }
                }

                // Update Artist
                const artistId = currentPortrait.artist[0].id
                const artistDocRef = admin.firestore().collection("users").doc(artistId)
                await artistDocRef.update({
                    "activeCommissions": admin.firestore.FieldValue.increment(1),
                    "totalCompletedCommissions": admin.firestore.FieldValue.increment(-1)
                })
            } else if (payment.metadata.type === 'tip'){

                const newPayment = {
                    "paymentComplete": true, 
                    "purchaseDate": Timestamp.now(),
                    "total": payment.amount / 100,
                    "type": "tip",
                    "invoiceId" : payment.id,
                    "items": "tip",
                    "artistPay": payment.amount / 100,
                    "released": true
                }


                const answer = await portraitDocRef.update({
                    additionalPayments: [...currentPortrait.additionalPayments, newPayment],
                })

                // Update Artist
                const artistId = currentPortrait.artist[0].id
                const artistDocRef = admin.firestore().collection("users").doc(artistId)
                await artistDocRef.update({
                    "paymentsOwing": admin.firestore.FieldValue.increment(payment.amount / 100),
                })
            }
          }  
    }

    return payment
    })
