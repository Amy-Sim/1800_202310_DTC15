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

                    if (userDoc.data().department == "Computer Systems Technology") {
                        document.getElementById("cstInput").checked = true;
                    } else if (userDoc.data().department == "Computer Information Technology") {
                        document.getElementById("citInput").checked = true;
                    } else {
                        document.getElementById("otherDepartmentInput").checked = true;
                        document.getElementById("departmentSpecify").value = userDepartment
                    }

                    if (userDoc.data().gender == "male") {
                        document.getElementById("maleInput").checked = true;
                    } else if (userDoc.data().gender == "female") {
                        document.getElementById("femaleInput").checked = true;
                    } else {
                        document.getElementById("othergenderInput").checked = true;
                        document.getElementById("genderSpecify").value = userGender
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
    // var userDepartment = document.getElementById("departmentInput").value;
    // get user type
    if (document.getElementById("driverInput").checked == true) {
        var userType = "driver";
    } else if (document.getElementById("passengerInput").checked == true) {
        var userType = "passenger";
    }
    // get user gender
    if (document.getElementById("maleInput").checked == true) {
        var userGender = "male"
    } else if (document.getElementById("femaleInput").checked == true) {
        var userGender = "female"
    } else if (document.getElementById("othergenderInput").checked == true){
        var userGender = document.getElementById("genderSpecify").value;
    }
    // get user department
    if (document.getElementById("cstInput").checked == true) {
        var userDepartment = "Computer Systems Technology"
    } else if (document.getElementById("citInput").checked == true) {
        var userDepartment = "Computer Information Technology"
    } else if (document.getElementById("otherDepartmentInput").checked == true){
        var userDepartment = document.getElementById("departmentSpecify").value;
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
