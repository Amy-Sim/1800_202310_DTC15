function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            db.collection("users").doc(user.uid).get().then(function(doc) {
                var user_name = doc.data().name;
                $("#name-goes-here").text(user_name);
            });

        } else {
            // No user is signed in.
        }
    });
}
insertName(); //run the function