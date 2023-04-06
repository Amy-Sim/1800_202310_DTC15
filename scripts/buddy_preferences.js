$(document).ready(function () {
    // get the current user buddy preferences and change the switch button to the correct state
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).get().then(function(doc) {
                if (doc.exists) {
                    var departmentPreference = doc.data().departmentPreference;
                    var genderPreference = doc.data().genderPreference;
                    if (departmentPreference == true) {
                        document.getElementById("departmentSwitch").checked = true;
                    }
                    if (genderPreference == true) {
                        document.getElementById("genderSwitch").checked = true;
                    }
                }
            });
        }
    });
    // save the buddy preferences to the database
    document.getElementById("saveBuddyPreferences").addEventListener("click", function() {
        var user = firebase.auth().currentUser;
        var departmentPreference = document.getElementById("departmentSwitch").checked
        var genderPreference = document.getElementById("genderSwitch").checked
        db.collection("users").doc(user.uid).update({
            departmentPreference: departmentPreference,
            genderPreference: genderPreference
        }, {merge: true}).then(function() {
            console.log("Buddy preferences saved");
        }).catch(function(error) {
            console.log("Error saving buddy preferences: " + error);
        });
    });
});
