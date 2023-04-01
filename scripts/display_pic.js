var ImageFile;      //global variable to store the File Object reference

function chooseFileListener() {
    const fileInput = document.getElementById("mypic-input");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function (e) {

        //the change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        var user_image = URL.createObjectURL(ImageFile);

        //change the DOM img element source to point to this file
        image.src = user_image;    //assign the "src" property of the "img" tag
    })
}


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        // Do something for the user here. 
        chooseFileListener();
        saveUserInfo();
    } else {
        // No user is signed in.
    }
});

function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");

        //Asynch call to put File Object (global variable ImageFile) onto Cloud
        storageRef.put(ImageFile)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');

                //Asynch call to get URL from Cloud
                storageRef.getDownloadURL()
                    .then(function (url) { // Get "url" of the uploaded file
                        console.log("Got the download URL.");
                        //get values from the from

                        //Asynch call to save the form fields into Firestore.
                        db.collection("users").doc(user.uid).update({
                            // name: userName,
                            // school: userSchool,
                            // city: userCity,
                            profilePic: url // Save the URL into users collection
                        })
                            .then(function () {
                                console.log('Added Profile Pic URL to Firestore.');
                                console.log('Saved use profile info');
                                document.getElementById('personalInfoFields').disabled = true;
                            })
                    })
            })
    })
}
