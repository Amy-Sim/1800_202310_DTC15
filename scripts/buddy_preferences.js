$(document).ready(function () {
    // get the current user buddy preferences and change the switch button to the correct state
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).get().then(function(doc) {
                if (doc.exists) {
                    var buddyPreferences = doc.data().buddyPreferences;
                    if (buddyPreferences.Department == true) {
                        document.getElementById("departmentSwitch").checked = true;
                    }
                    if (buddyPreferences.Gender == true) {
                        document.getElementById("genderSwitch").checked = true;
                    }
                }
            });
        }
    });
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
});
