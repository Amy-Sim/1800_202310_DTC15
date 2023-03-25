
$(document).ready(function () {

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

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here.
            currentUserUID = user.uid;
        } else {
            // No user is signed in.
        }
    });
    db.collection("requests")
        .get()
        .then((allEvents) => {
            const history = []
            allEvents.forEach((doc) => {
                recipient = doc.data().recipientId;
                sender = doc.data().senderId;
                console.log(recipient, sender);
                if (sender == currentUserUID) {
                    history.push(recipient)
                }
                if (recipient == currentUserUID) {
                    history.push(sender)
                }
                console.log(history);
            });
        });
});
