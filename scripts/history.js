// populate historical pairing data
let page = [];
let userID = localStorage.getItem("user");
console.log(userID); // test to show if user id pops up


function displayPairingProfile() {
    //retrieve document id from the url 
    let params = new URL(window.location.href); // get url 
    let ID = params.searchParams.get("docID"); // get id from url

    db.collection("buddyPairing")

    db.collection(collection).get().then((snapshot) => {
        console.log(snapshot.val());
        var buddyName = snapshot.val().buddyName;
        console.log(buddyName);
        $("#buddy-name").text();
        $("#buddy-department").text();
        $("#time-stamp").text();
    })
}





