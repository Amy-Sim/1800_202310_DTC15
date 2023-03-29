function createHistoryCard(){
    firebase.auth().onAuthStateChanged(function(user){
        if (user){
            const historyCollection = db.collection('history');
            const historyCardGroup = document.querySelector('#historyCardGroup');
    
            // Clear the existing history cards
            historyCardGroup.innerHTML = '';

            //Query Firestore for the history collection
            historyCollection.get().then((querySnapshot) => {           
            //loop through the documents in the history collection 
            querySnapshot.forEach((doc) => {
                //Get data for the current document
                const data = doc.data();
                console.log("senderId: " + data.senderId);
                console.log("recipientId: " + data.recipientId);
                console.log("currentUser: " + user.uid);

                //Check if the senderID is equal to user.uid
                if (user.uid == data.senderId) {
                    //Get the tenplate for the history card
                    const historyCardTemplate = document.querySelector('#historyCardTemplate');

                    //Clone the history card template
                    const historyCard = historyCardTemplate.content.cloneNode(true);

                    //Populate the fields of the history card with data from FireStore
                    historyCard.querySelector('#buddy-name').textContent = data.recipientName;
                    // historyCard.querySelector('.buddy-department').textContent = data.recipientDepartment;
                    historyCard.querySelector('#buddy-status').textContent = data.status;
                    // historyCard.querySelector('.time-stamp').textContent = data.date;

                    //Add the history card to the history card group
                    historyCardGroup.appendChild(historyCard);
                }
                //Check if the recipientID is equal to user.uid
                else if (user.uid == data.recipientId) {
                    //Get the tenplate for the history card
                    const historyCardTemplate = document.querySelector('#historyCardTemplate');

                    //Clone the history card template
                    const historyCard = historyCardTemplate.content.cloneNode(true);

                    //Populate the fields of the history card with data from FireStore
                    historyCard.querySelector('#buddy-name').textContent = data.senderName;
                    // historyCard.querySelector('.buddy-department').textContent = data.senderDepartment;
                    historyCard.querySelector('#buddy-status').textContent = data.status;
                    // historyCard.querySelector('.time-stamp').textContent = data.date;

                    //Add the history card to the history card group
                    historyCardGroup.appendChild(historyCard);
                }
                });
            });
        }
    });
}

createHistoryCard();








// function displayHistory(buddyID) {
//     db.collection("users").doc(buddyID).get()
//         .then((doc) => {
//             var buddy_name = doc.data().name;
//             var buddy_department = doc.data().department;
//             console.log(buddy_name, buddy_department);

//             //clone the new buddy card
//             let buddycard = doc.getElementById;("buddyCardTemplate").content?.cloneNode(true);

//             //populate with name and department    
//             buddycard.$(".buddy-name").innerHTML = buddy_name;
//             buddycard.$(".buddy-department").innerHTML = buddy_department;
            
//             // add the new buddy card to the page
//             doc.getElementById("buddy-card-goes-here").appendChild(buddycard);
//     });
// }

// $(document).ready(function () {
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             // User is signed in.
//             // Do something for the user here.
//             currentUserUID = user.uid;
//         } else {
//             // No user is signed in.
//         }
//     });
//     db.collection("requests")
//         .get()
//         .then((allEvents) => {
//             const history = [];
//             allEvents.forEach((doc) => {
//                 let recipient = doc.data().recipientId;
//                 let sender = doc.data().senderId;
//                 console.log(recipient, sender);
//                 if (sender == currentUserUID) {
//                     history.push(recipient)                    
//                 };
//                 if (recipient == currentUserUID) {
//                     history.push(sender)
//                 };
//                 console.log(history);
//                 let pastbuddy = history[0];
//                 displayHistory(pastbuddy);
  
//             });
//         });
//     });


    // firebase.auth().onAuthStateChanged(user => {
    //     let currentUser = db.collection("users").doc(user.uid);
    //     //console.log(curerntUser); // test to show if user id pops up
    //     let cardTemplate = document.getElementById("buddyCardTemplate");
    //     let buddyPairing = currentUser.ref("users/" + user.uid + "/buddyPairing");
    //     let newCard = cardTemplate.content.cloneNode(true);

    //     currentUser.get().then(function (document) {
    //             if (document.exist) {
    //                 if (buddyPairing == true) {
    //                     var buddyName = document.data().name;
    //                     var buddyDepartment = document.data().department;
    //                     //console.log(buddyName);
    //                     //console.log(buddyDepartment);
    //                     $("#buddy-name").text(buddyName);
    //                     $("#buddy-department").text(buddyDepartment);
    //                     document.body.appendChild(newCard);
    
    //                 }
    //             }
    //         });
    // });