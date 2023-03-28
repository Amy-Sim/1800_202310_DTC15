function displayHistory(buddyID) {
    db.collection("users").doc(buddyID).get()
        .then((doc) => {
            let name = doc.data().name;
            //console.log(name);
            let department = doc.data().department;
            //console.log(department);
            let buddycard = doc.getElementById("buddyCardTemplate").content.cloneNode(true);
            buddycard.$(".buddy-name").innerHTML = name;
            buddycard.$(".buddy-department").innerHTML = department;
            document.getElementById("buddy-card-goes-here").appendChild(buddycard);
    });
}

$(document).ready(function () {
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
            const history = [];
            allEvents.forEach((doc) => {
                let recipient = doc.data().recipientId;
                let sender = doc.data().senderId;
                console.log(recipient, sender);
                if (sender == currentUserUID) {
                    history.push(recipient)                    
                };
                if (recipient == currentUserUID) {
                    history.push(sender)
                };
                console.log(history);
                let pastbuddy = history[0];
                displayHistory(pastbuddy);
  
            });
        });
    });


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