let page = [];
let userID = localStorage.getItem("user");
console.log(userID);


function displayPairing() {
 
    db.collection(collection).get().then((snapshot) => {
        console.log(snapshot.val());
        var buddyName = snapshot.val().buddyName;
        console.log(buddyName);
        $("#buddy-name").text(buddyName);
        $("#buddy-department").text();
        $("#time-stamp").text();
    })
}


page.append(displayPairing());
