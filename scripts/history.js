
function displayPairing() {
    var userBuddy = firebase.database().ref("buddyPairing");
    userBuddy.on('value', function (snapshot) {
        console.log(snapshot.val());
        var buddyName = snapshot.val().buddyName;
        console.log(buddyName);
        $("#buddy-name").text(buddyName);
    })
}

displayPairing();
