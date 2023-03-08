document.getElementById("saveBuddyPreferences").addEventListener("click", function() {
    var user = firebase.auth().currentUser;
    var buddyPreferences = {
        Department: document.getElementById("departmentSwitch").checked,
        Gender: document.getElementById("genderSwitch").checked,
    }
    db.collection("users").doc(user.uid).update({
        buddyPreferences: buddyPreferences,
    }, {merge: true}).then(function() {
        console.log("Buddy preferences saved");
    }).catch(function(error) {
        console.log("Error saving buddy preferences: " + error);
    });
});
