//------------------------------------------------
// Display the user's name and department 
//------------------------------------------------
function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            db.collection("users").doc(user.uid).get().then(function(doc) {
                let user_name = doc.data().name;
                let user_department = doc.data().department;
                $("#name-goes-here").text(user_name);
                $("#department-goes-here").text(user_department);
            });
        } else {
            // No user is signed in.
        }
    });
}
insertName(); //run the function

//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
        }).catch((error) => {
        // An error happened.
        });
}

$(document).ready(function () {
    document.getElementById("logout").addEventListener("click", function() {
        logout();
    });
});