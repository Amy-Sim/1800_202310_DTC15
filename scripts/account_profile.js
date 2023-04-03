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
                    var phoneNumber = userDoc.data().phoneNumber;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (phoneNumber != null) {
                        document.getElementById("phoneInput").value = phoneNumber;
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

    console.log('CHECK IF IMAGE UPLOAD EXISTS', localStorage.getItem('image-upload'))

    //a) get user entered values
    var userName = document.getElementById("nameInput").value;
    var phoneNumber = document.getElementById("phoneInput").value;
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
        type: userType,
        phoneNumber : phoneNumber
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    //c) disable edit
    document.getElementById('personalInfoFields').disabled = true;
}

//
var ImageFile; //global variable to store the File Object reference

function chooseFileListener() {
  const fileInput = document.getElementById("mypic-input"); // pointer #1
  const image = document.getElementById("mypic-goes-here"); // pointer #2

  //attach listener to input file
  //when this file changes, do something
  fileInput.addEventListener("change", function (e) {
    //the change event returns a file "e.target.files[0]"
    // localStorage.setItem('image-upload', e.target.files[0])

    ImageFile = e.target.files[0];
    var blob = URL.createObjectURL(ImageFile);

    //change the DOM img element source to point to this file
    image.src = blob; //assign the "src" property of the "img" tag
  });
}
chooseFileListener();

function saveUserInfo() {
  firebase.auth().onAuthStateChanged(function (user) {
    var storageRef = storage.ref("images/" + user.uid + ".jpg");

    //Asynch call to put File Object (global variable ImageFile) onto Cloud
    storageRef.put(ImageFile).then(function () {
      console.log("Uploaded to Cloud Storage.");

      //Asynch call to get URL from Cloud
      storageRef.getDownloadURL().then(function (url) {
        // Get "url" of the uploaded file
        console.log("Got the download URL.");
        //get values from the from
        userName = document.getElementById("nameInput").value;
        // userSchool = document.getElementById("schoolInput").value;
        // userCity = document.getElementById("cityInput").value;

        //Asynch call to save the form fields into Firestore.
        db.collection("users")
          .doc(user.uid)
          .update({
            name: userName,
            // school: userSchool,
            // city: userCity,
            profilePic: url, // Save the URL into users collection
          })
          .then(function () {
            console.log("Added Profile Pic URL to Firestore.");
            console.log("Saved use profile info");
            document.getElementById("personalInfoFields").disabled = true;
          });
      });
    });
  });
}

function populateInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // go and get the curret user info from firestore
      currentUser = db.collection("users").doc(user.uid);

      currentUser.get().then((userDoc) => {
        let userName = userDoc.data().name;
        let userSchool = userDoc.data().school;
        let userCity = userDoc.data().city;
        let picUrl = userDoc.data().profilePic;

        if (userName != null) {
          document.getElementById("nameInput").value = userName;
        }
        if (userSchool != null) {
          document.getElementById("schoolInput").value = userSchool;
        }
        if (userCity != null) {
          console.log(userCity);
          document.getElementById("cityInput").value = userCity;
        }
        if (picUrl != null) {
          console.log(picUrl);
          // use this line if "mypicdiv" is a "div"
          //$("#mypicdiv").append("<img src='" + picUrl + "'>")
          $("#mypic-goes-here").attr("src", picUrl);
        } else console.log("picURL is null");
      });
    } else {
      console.log("no user is logged in");
    }
  });
}
populateInfo();
