
$(document).ready(function () {

    firebase.auth().onAuthStateChanged(user => {
        let currentUser = db.collection("users").doc(user.uid);
        //console.log(curerntUser); // test to show if user id pops up
        let cardTemplate = document.getElementById("buddyCardTemplate");
        let buddyPairing = currentUser.ref("users/" + user.uid + "/buddyPairing");
        let newCard = cardTemplate.content.cloneNode(true);

        currentUser.get().then(function (document) {
                if (document.exist) {
                    if (buddyPairing == true) {
                        var buddyName = document.data().name;
                        var buddyDepartment = document.data().department;
                        //console.log(buddyName);
                        //console.log(buddyDepartment);
                        $("#buddy-name").text(buddyName);
                        $("#buddy-department").text(buddyDepartment);
                        document.body.appendChild(newCard);
    
                    }
                }
            });
    });
});












