var currentUser;          //put this right after you start script tag before writing any functions.

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userDepartment = userDoc.data().department;
                    var userGender = userDoc.data().gender;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userDepartment != null) {
                        document.getElementById("departmentInput").value = userDepartment;
                    }
                    if (userGender != null) {
                        document.getElementById("genderInput").value = userGender;
                    }
                    if (userDoc.data().type == "driver") {
                        document.getElementById("driverInput").checked = true;
                    } else if (userDoc.data().type == "passenger") {
                        document.getElementById("passengerInput").checked = true;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    console.log("inside")
    //enter code here
    
    //a) get user entered values
    var userName = document.getElementById("nameInput").value;
    var userDepartment = document.getElementById("departmentInput").value;
    var userGender = document.getElementById("genderInput").value;
    if (document.getElementById("driverInput").checked == true) {
        var userType = "driver";
    } else if (document.getElementById("passengerInput").checked == true) {
        var userType = "passenger";
    }
    console.log(userName, userDepartment, userGender)
    //b) update user's document in Firestore
    currentUser.update({
        name: userName,
        department: userDepartment,
        gender: userGender,
        type: userType
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    //c) disable edit
    document.getElementById('personalInfoFields').disabled = true;
}
