var currentUser

function createHistoryCard(){
    firebase.auth().onAuthStateChanged(function(user){
        if (user){
            removeHistoryRepeats();
            currentUser = db.collection("users").doc(user.uid)
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
                    historyCard.querySelector('#buddy-department').textContent = data.recipientDepartment;
                    historyCard.querySelector('#buddy-gender').textContent = data.recipientGender;
                    // historyCard.querySelector('#buddy-status').textContent = data.status;
                    //historyCard.querySelector('.time-stamp').textContent = data.date;
                    
                    // NEW LINES for bookmarking
                    //this line sets the id attribute for the <i> tag in the format of "save-recipientID" 
                    //so later we know which user to bookmark based on which user was clicked
                    historyCard.querySelector("i").id = "save-" + data.recipientId
                    // this line will call a function to save the hikes to the user's document             
                    historyCard.querySelector('i').onclick = () => updateBookmark(data.recipientId);

                    currentUser.get().then(userDoc => {
                        //get the user name
                        var bookmarks = userDoc.data().bookmarks;
                        if (bookmarks.includes(data.recipientId)) {
                            document.getElementById('save-' + data.recipientId).innerText = 'star';
                        }
                    })

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
                    historyCard.querySelector('#buddy-department').textContent = data.senderDepartment;
                    historyCard.querySelector('#buddy-gender').textContent = data.senderGender;
                    // historyCard.querySelector('#buddy-status').textContent = data.status;
                    //historyCard.querySelector('.time-stamp').textContent = data.date;

                    // NEW LINES for bookmarking
                    //this line sets the id attribute for the <i> tag in the format of "save-senderID" 
                    //so later we know which user to bookmark based on which user was clicked
                    historyCard.querySelector("i").id = "save-" + data.senderId
                    // this line will call a function to save the hikes to the user's document             
                    historyCard.querySelector('i').onclick = () => updateBookmark(data.senderId);

                    currentUser.get().then(userDoc => {
                        //get the user name
                        var bookmarks = userDoc.data().bookmarks;
                        if (bookmarks.includes(data.senderId)) {
                            document.getElementById('save-' + data.senderId).innerText = 'star';
                        }
                    })    

                    //Add the history card to the history card group
                    historyCardGroup.appendChild(historyCard);
                }
                });
            });
        }
    });
}

// function saveBookmark(userID) {
//     currentUser.set({
//             bookmarks: firebase.firestore.FieldValue.arrayUnion(userID)
//         }, {
//             merge: true
//         })
//         .then(function () {
//             console.log("bookmark has been saved for: " + currentUser);
//             var iconID = 'save-' + userID;
//             //console.log(iconID);
// 						//this is to change the icon of the hike that was saved to "filled"
//             document.getElementById(iconID).innerText = 'bookmark';
//         });
// }

function removeHistoryRepeats() {
    firebase.auth().onAuthStateChanged(function(user){
        if (user){
            db.collection("history")
                .get()
                .then((allEvents) => {
                    const matched = [];
                    const deletePromises = [];
                    allEvents.forEach((doc) => {
                        if (user.uid == doc.data().senderId) {
                            if (matched.includes(doc.data().recipientId) == false) {
                                matched.push(doc.data().recipientId);
                            } else {
                                deletePromises.push(doc.ref.delete());
                            }
                        } 
                        if (user.uid == doc.data().recipientId) {
                            if (matched.includes(doc.data().senderId) == false) {
                                matched.push(doc.data().senderId);
                            } else {
                                deletePromises.push(doc.ref.delete());
                            }
                        }
                    });
                    return Promise.all(deletePromises);
                })
                .catch((error) => {
                    console.error("Error removing repeated history documents: ", error);
                });
        }
    })
}



function updateBookmark(userID) {
    currentUser.get().then((userDoc) => {
    bookmarksNow = userDoc.data().bookmarks;
      // console.log(bookmarksNow)

  //check if this bookmark already existed in firestore:
    if (bookmarksNow.includes(userID)) {
        console.log(userID);
  //if it does exist, then remove it
        currentUser.update({
            bookmarks: firebase.firestore.FieldValue.arrayRemove(userID),
            })
            .then(function () {
            console.log("This bookmark is removed for" + currentUser);
            var iconID = "save-" + userID;
            console.log(iconID);
            document.getElementById(iconID).innerText = "star_border";
            });
        } else {
  //if it does not exist, then add it
        currentUser
            .set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(userID),
            },
            {
            merge: true,
            })
            .then(function () {
            console.log("This bookmark is for" + currentUser);
            var iconID = "save-" + userID;
            console.log(iconID);
            document.getElementById(iconID).innerText = "star";
            });
        }
    });
}
// removeHistoryRepeats();
window.addEventListener('load', createHistoryCard);