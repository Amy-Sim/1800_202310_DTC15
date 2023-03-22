function buddyInfo() {
    var database = firebase.database();
    var userBuddy = database.ref('buddyPairing');

    console.log("buddyInfo() called");
    //get buddy name
    if (userBuddy == null) {
        console.log("buddyPairing is null");
    }
    else {
        userBuddy.on('value', function (snapshot) {
            console.log(snapshot.val());
            var buddyName = snapshot.val().buddyName;
            console.log(buddyName);
            $("#buddy-name").text(buddyName);
        })
    }
}

buddyInfo();